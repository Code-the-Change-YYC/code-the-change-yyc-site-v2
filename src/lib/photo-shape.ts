import "server-only";

import sharp from "sharp";

/**
 * Some team photos in Contentful were uploaded pre-cropped to a circle: a
 * square PNG whose corners are transparent. In the rectangular member card
 * those render as a floating circle next to full-bleed photos. This checks a
 * tiny rendition's corner pixels so the card can zoom past the transparent
 * corners instead (see TeamCard).
 *
 * The rendition is fetched with `force-cache`: Contentful asset URLs change
 * whenever the file is replaced, so a cached answer never goes stale. Any
 * failure counts as "not a circle", which just renders the photo as uploaded.
 */
export async function isCircleCropped(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${url}?w=24&h=24&fit=fill&fm=png`, {
      cache: "force-cache",
    });
    if (!response.ok) return false;

    const { data, info } = await sharp(
      Buffer.from(await response.arrayBuffer()),
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const alphaAt = (x: number, y: number) =>
      data[(y * info.width + x) * info.channels + 3];
    const right = info.width - 1;
    const bottom = info.height - 1;
    const corners = [
      alphaAt(0, 0),
      alphaAt(right, 0),
      alphaAt(0, bottom),
      alphaAt(right, bottom),
    ];
    return corners.filter((alpha) => alpha < 32).length >= 3;
  } catch {
    return false;
  }
}
