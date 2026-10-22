import Image from "next/image";
import type { ContributePhoto } from "@/lib/contentful/contribute";

/**
 * Photo strip (Figma 541:6929): square photos in a purple frame with white
 * corner handles, staggered vertically and slightly rotated. The row is wider
 * than the viewport and centred, so it bleeds off both edges; the section
 * clips it so the page never scrolls horizontally.
 */

const CORNERS = [
  "top-0 left-0",
  "top-0 right-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
];

const TILT = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-2"];

const MIN_PHOTOS = 5;

export function ContributePhotoStrip({
  photos: source,
  label,
}: {
  photos: ContributePhoto[];
  label: string;
}) {
  // Figma shows five photos so the row bleeds off both edges on desktop;
  // cycle shorter lists up to that so wide screens never show a bare row.
  const photos =
    source.length > 0 && source.length < MIN_PHOTOS
      ? Array.from({ length: MIN_PHOTOS }, (_, i) => source[i % source.length])
      : source;
  return (
    <section aria-label={label} className="overflow-x-clip">
      <div className="flex justify-center">
        <ul className="flex shrink-0 list-none gap-4 py-6 md:h-[351px] md:py-0">
          {photos.map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              className={`flex shrink-0 ${i % 2 === 0 ? "items-end" : "items-start"}`}
            >
              <figure
                className={`relative size-60 md:size-[301px] ${TILT[i % TILT.length]}`}
              >
                <div className="absolute inset-2 border-2 border-purple-500">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 285px, 224px"
                    className="object-cover"
                  />
                </div>
                {CORNERS.map((position) => (
                  <span
                    key={position}
                    aria-hidden="true"
                    className={`absolute size-4 border-2 border-purple-500 bg-white ${position}`}
                  />
                ))}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
