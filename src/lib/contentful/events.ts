import "server-only";
import { formatEventDateTime } from "@/lib/format-event-date";
import { contentfulFetchOrNull } from "./fetch";
import type { ContentTypeId } from "./tags";

/**
 * Events data for the site, from the Contentful `event` content type
 * (fields: name, date, location, signupLink, eventPoster).
 */
const QUERY = /* GraphQL */ `
  query Events($preview: Boolean!) {
    eventCollection(order: date_ASC, preview: $preview, limit: 50) {
      items {
        sys {
          id
        }
        name
        date
        location
        signupLink
        eventPoster {
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

interface EventsQueryResult {
  eventCollection: {
    items: Array<{
      sys: { id: string };
      name: string | null;
      date: string | null;
      location: string | null;
      signupLink: string | null;
      eventPoster: {
        url: string | null;
        title: string | null;
        description: string | null;
        width: number | null;
        height: number | null;
      } | null;
    } | null>;
  };
}

/** Everything an event card needs; shared by the Events page and the homepage. */
export interface EventCardData {
  id: string;
  title: string;
  /** Preformatted label, e.g. "OCT 8 · 5PM" (Calgary time). */
  dateTime: string | null;
  location: string | null;
  ctaText: string | null;
  ctaHref: string | null;
  /** Event type chip (e.g. "Hackathon"). No Contentful field yet, so always null. */
  tag: string | null;
  image: {
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  } | null;
}

// The GraphQL API returns absolute https URLs; normalize protocol-relative
// ones defensively.
function toAbsoluteUrl(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

type Item = NonNullable<EventsQueryResult["eventCollection"]["items"][number]>;

function toCardData(item: Item): EventCardData {
  const href = item.signupLink?.trim() || null;
  return {
    id: item.sys.id,
    title: item.name ?? "",
    dateTime: item.date ? formatEventDateTime(item.date) : null,
    location: item.location?.trim() || null,
    ctaText: href ? "Sign up" : null,
    ctaHref: href,
    tag: null,
    image: item.eventPoster?.url
      ? {
          url: toAbsoluteUrl(item.eventPoster.url),
          alt: item.eventPoster.description ?? item.eventPoster.title ?? "",
          width: item.eventPoster.width,
          height: item.eventPoster.height,
        }
      : null,
  };
}

/**
 * Fetches events and splits them around "now". Upcoming is soonest-first,
 * past is newest-first. Returns `null` when Contentful is unreachable so the
 * caller can render an error state (distinct from an empty list).
 *
 * The split happens at render time, so pages using this should set a
 * `revalidate` interval or "upcoming" goes stale.
 */
export async function getEvents({
  preview = false,
}: { preview?: boolean } = {}): Promise<{
  upcoming: EventCardData[];
  past: EventCardData[];
} | null> {
  const data = await contentfulFetchOrNull<EventsQueryResult>({
    query: QUERY,
    variables: { preview },
    preview,
    tags: ["event" satisfies ContentTypeId],
  });
  if (!data) return null;

  const now = Date.now();
  const upcoming: Array<{ at: number; card: EventCardData }> = [];
  const past: Array<{ at: number; card: EventCardData }> = [];

  for (const item of data.eventCollection.items) {
    // Drafted-but-incomplete entries can come back without a name or date.
    if (!item?.name || !item.date) continue;
    const at = new Date(item.date).getTime();
    if (Number.isNaN(at)) continue;
    (at >= now ? upcoming : past).push({ at, card: toCardData(item) });
  }

  upcoming.sort((a, b) => a.at - b.at);
  past.sort((a, b) => b.at - a.at);

  return {
    upcoming: upcoming.map((e) => e.card),
    past: past.map((e) => e.card),
  };
}
