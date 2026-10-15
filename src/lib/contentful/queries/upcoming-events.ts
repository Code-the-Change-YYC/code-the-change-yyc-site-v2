/**
 * Upcoming Events — data loader (ticket WB-28)
 * ============================================
 *
 * WHAT THIS FILE DOES
 *   Fetches the "Upcoming Events" entries from Contentful (our CMS) and turns
 *   them into the simple shape the <UpcomingEvents /> component expects.
 *
 * HOW IT FLOWS
 *   1. events/page.tsx calls getUpcomingEvents().
 *   2. We send the GraphQL query below to Contentful via contentfulFetch().
 *   3. Contentful sends back the raw entries.
 *   4. We clean them up (drop empty ones, format the date) and return them.
 *   5. The page passes the result to <UpcomingEvents events={...} />.
 *
 * WHERE TO LOOK IF SOMETHING IS WRONG
 *   - Cards missing a field?  The field ID below probably doesn't match the
 *     one in Contentful. See "FIELD IDS" further down.
 *   - Wrong date text?        See src/lib/format-event-date.ts.
 *   - Cards look wrong?       See src/components/upcoming-events.tsx.
 */

// Makes the build fail if this file is ever imported into browser code.
// It uses our Contentful access token, which must never reach the browser.
import "server-only";

// The one shared helper for talking to Contentful. It adds the token,
// caching, and error handling — never call `fetch` on Contentful directly.
import { contentfulFetch } from "@/lib/contentful/fetch";
// Turns two ISO dates into card text like "SEPT 14-15 · 9AM - 4PM".
import { formatEventDateTime } from "@/lib/format-event-date";
// The shape each card needs. This file's job is to produce a list of these.
import type { EventCardDisplay } from "@/components/upcoming-events";

/* -------------------------------------------------------------------------- */
/* 1. The query — what we ask Contentful for                                   */
/* -------------------------------------------------------------------------- */

/**
 * FIELD IDS — read this before editing the query
 *
 * Each line inside `items { ... }` is written as   ourName: contentfulFieldId
 * The left side is the name the rest of our code uses. The right side must
 * match the "Field ID" in Contentful (Content model → Upcoming Events → click
 * a field).
 *
 * What the Upcoming Events type has in Contentful today (checked Oct 2026):
 *   eventName (text), image (asset), description (rich text),
 *   customOrderNumber (number, used for sorting)
 *
 * TODO(WB-28): the design also needs these fields, which DON'T exist yet.
 * Someone with Contentful admin access must add them to Upcoming Events:
 *   eventType   Short text       tag on the image, e.g. "Workshop"
 *   startDate   Date & time      when it starts
 *   endDate     Date & time      when it ends (optional)
 *   location    Short text       e.g. "University of Calgary · ENA 224"
 *   buttonText  Short text       e.g. "Sign up"
 *   buttonLink  Short text (URL) where the button goes
 * Once they exist, uncomment the matching lines in the query below. The
 * types and the card already handle them — those parts of the card simply
 * stay hidden until the data is there.
 */
const UPCOMING_EVENTS_QUERY = /* GraphQL */ `
  query UpcomingEvents($preview: Boolean!) {
    # "upcomingEventsCollection" = every entry of the Upcoming Events type.
    #   preview: true shows unpublished drafts (only used in draft mode).
    #   order:   sorts by the "customOrderNumber" editors set in Contentful.
    #   limit:   safety cap so a huge list can't slow the page down.
    upcomingEventsCollection(
      preview: $preview
      order: customOrderNumber_ASC
      limit: 12
    ) {
      items {
        sys {
          id # Contentful's unique ID for the entry (used as the React key)
        }
        title: eventName # Card heading, e.g. "Hack and Hire"
        # Not in Contentful yet — uncomment each line once the field is added:
        # type: eventType # Small tag on the image, e.g. "Workshop"
        # startDate: startDate # When it starts (date + time)
        # endDate: endDate # When it ends (optional)
        # location: location # e.g. "University of Calgary · ENA 224"
        # buttonText: buttonText # Button label, e.g. "Sign up"
        # buttonLink: buttonLink # Where the button goes (a URL)
        image {
          url # Full image URL on Contentful's CDN
          description # Used as alt text for screen readers
          title # Fallback alt text if there's no description
        }
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* 2. TypeScript types — what Contentful sends back                           */
/* -------------------------------------------------------------------------- */

// One event exactly as Contentful returns it. Almost everything can be `null`
// because editors can leave fields blank, so we must handle missing values.
// Fields marked `?` aren't in the query yet (see the TODO above), so they're
// `undefined` for now.
type UpcomingEventItem = {
  sys: { id: string };
  title: string | null;
  type?: string | null;
  startDate?: string | null; // ISO date string, e.g. "2026-10-08T17:00:00-06:00"
  endDate?: string | null;
  location?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image: {
    url: string;
    description: string | null;
    title: string | null;
  } | null;
};

// The whole response. Contentful can return `null` entries (e.g. an entry
// linked but not published), which is why items is (Item | null)[].
type UpcomingEventsQueryResult = {
  upcomingEventsCollection: { items: (UpcomingEventItem | null)[] } | null;
};

/* -------------------------------------------------------------------------- */
/* 3. The function the page calls                                             */
/* -------------------------------------------------------------------------- */

/**
 * Returns the upcoming events, ready to render as cards.
 *
 * @param preview  true = include unpublished drafts. The events page passes
 *                 this from Next.js draft mode; normal visitors get false.
 */
export async function getUpcomingEvents({
  preview = false,
}: { preview?: boolean } = {}): Promise<EventCardDisplay[]> {
  const data = await contentfulFetch<UpcomingEventsQueryResult>({
    query: UPCOMING_EVENTS_QUERY,
    // Fills in $preview inside the query above.
    variables: { preview },
    // Tells the helper to use the preview token and skip the cache.
    preview,
    // Cache label. When an editor publishes an Upcoming Event, Contentful
    // pings /api/revalidate, which clears this tag so the page refreshes.
    tags: ["upcomingEvents"],
  });

  // If the collection came back empty/null, fall back to an empty list.
  const items = data.upcomingEventsCollection?.items ?? [];

  return (
    items
      // Skip null entries and any event without a title — a card with no
      // title would look broken.
      .filter((item): item is UpcomingEventItem => Boolean(item?.title))
      // Convert each Contentful entry into the card's shape.
      .map((item) => ({
        id: item.sys.id,
        title: item.title ?? "",
        tag: item.type ?? null,
        // Only show a date line if a start date was entered.
        dateTime: item.startDate
          ? formatEventDateTime(item.startDate, item.endDate)
          : null,
        location: item.location ?? null,
        ctaText: item.buttonText ?? null,
        ctaHref: item.buttonLink ?? null,
        // No image uploaded → null, and the card shows a grey placeholder.
        image: item.image?.url
          ? {
              url: item.image.url,
              alt: item.image.description ?? item.image.title ?? "",
            }
          : null,
      }))
  );
}
