import "server-only";
import type { Document } from "@contentful/rich-text-types";
import { contentfulFetch } from "./fetch";
import type { ContentTypeId } from "./tags";

// Only fields confirmed on the `upcomingEvents` content type are selected:
// the old site rendered eventName, description (rich text) and image. Add
// date/location/CTA fields here once they exist in the Contentful model.
const QUERY = /* GraphQL */ `
  query UpcomingEvents {
    upcomingEventsCollection(order: customOrderNumber_ASC) {
      items {
        sys {
          id
        }
        eventName
        description {
          json
        }
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

interface UpcomingEventsQueryResult {
  upcomingEventsCollection: {
    items: Array<{
      sys: { id: string };
      eventName: string | null;
      description: { json: Document } | null;
      image: {
        url: string;
        title: string | null;
        description: string | null;
        width: number | null;
        height: number | null;
      } | null;
    }>;
  };
}

export interface UpcomingEvent {
  id: string;
  title: string;
  description: Document | null;
  image: {
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  } | null;
}

/**
 * Distinguishes "Contentful has no events" from "we couldn't reach
 * Contentful", so the page can render each case differently instead of
 * showing an empty list for both.
 */
export type UpcomingEventsResult =
  { ok: true; events: UpcomingEvent[] } | { ok: false; error: string };

// The GraphQL API returns absolute https URLs, unlike the REST/SDK API the
// old site used, which returns protocol-relative `//images.ctfassets.net/...`.
// Normalize defensively so both shapes produce a valid URL.
function toAbsoluteUrl(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

export async function getUpcomingEvents(): Promise<UpcomingEventsResult> {
  try {
    const data = await contentfulFetch<UpcomingEventsQueryResult>({
      query: QUERY,
      tags: ["upcomingEvents" satisfies ContentTypeId],
    });

    const events = data.upcomingEventsCollection.items
      // Drafted-but-incomplete entries can come back with a null title.
      .filter((item) => item.eventName)
      .map((item) => ({
        id: item.sys.id,
        title: item.eventName ?? "",
        description: item.description?.json ?? null,
        image: item.image?.url
          ? {
              url: toAbsoluteUrl(item.image.url),
              alt: item.image.description ?? item.image.title ?? "",
              width: item.image.width,
              height: item.image.height,
            }
          : null,
      }));

    return { ok: true, events };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("Failed to fetch upcoming events from Contentful:", err);
    return { ok: false, error };
  }
}
