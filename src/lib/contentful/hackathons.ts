import "server-only";
import { contentfulFetchOrNull } from "./fetch";
import type { ContentTypeId } from "./tags";

/**
 * Hack the Change history from the Contentful `hackathon` content type
 * (fields: year, title, blurb, image, topic). `year` is a String field, so
 * ordering happens here, numerically, rather than in the query.
 */
const QUERY = /* GraphQL */ `
  query Hackathons($preview: Boolean!) {
    hackathonCollection(preview: $preview, limit: 50) {
      items {
        sys {
          id
        }
        year
        title
        blurb
        topic
        image {
          url
          title
          description
          width
          height
        }
      }
    }
  }
`;

interface HackathonsQueryResult {
  hackathonCollection: {
    items: Array<{
      sys: { id: string };
      year: string | null;
      title: string | null;
      blurb: string | null;
      topic: string | null;
      image: {
        url: string | null;
        title: string | null;
        description: string | null;
        width: number | null;
        height: number | null;
      } | null;
    } | null>;
  };
}

export interface HackathonEntry {
  id: string;
  year: string;
  title: string | null;
  blurb: string | null;
  topic: string | null;
  image: { url: string; alt: string } | null;
}

/**
 * Hackathons oldest-first. Returns `[]` when Contentful is unreachable or has
 * none, so callers can simply hide the timeline.
 */
export async function getHackathons({
  preview = false,
}: { preview?: boolean } = {}): Promise<HackathonEntry[]> {
  const data = await contentfulFetchOrNull<HackathonsQueryResult>({
    query: QUERY,
    variables: { preview },
    preview,
    tags: ["hackathon" satisfies ContentTypeId],
  });
  if (!data) return [];

  const entries: Array<{ n: number; entry: HackathonEntry }> = [];
  for (const item of data.hackathonCollection.items) {
    const year = item?.year?.trim();
    if (!item || !year) continue;
    const n = Number.parseInt(year, 10);
    if (Number.isNaN(n)) continue;
    entries.push({
      n,
      entry: {
        id: item.sys.id,
        year,
        title: item.title?.trim() || null,
        blurb: item.blurb?.trim() || null,
        topic: item.topic?.trim() || null,
        image: item.image?.url
          ? {
              url: item.image.url.startsWith("//")
                ? `https:${item.image.url}`
                : item.image.url,
              alt:
                item.image.description ||
                item.image.title ||
                `Hack the Change ${year}`,
            }
          : null,
      },
    });
  }
  return entries.sort((a, b) => a.n - b.n).map((e) => e.entry);
}
