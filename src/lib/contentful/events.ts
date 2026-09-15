import "server-only";
import { contentfulFetch } from "./fetch";
import type { ContentTypeId } from "./tags";

const QUERY = /* GraphQL */ `
  # Fetch the fields needed to render the upcoming events list.
  query UpcomingEvents {
    upcomingEventsCollection(order: customOrderNumber_ASC) {
      items {
        sys {
          id
        }
        eventName
        image {
          url
          title
        }
      }
    }
  }
`;

interface UpcomingEventsQueryResult {
  upcomingEventsCollection: {
    items: Array<{
      sys: { id: string };
      eventName: string;
      image: { url: string; title: string } | null;
    }>;
  };
}

export interface UpcomingEvent {
  id: string;
  title: string;
  dateTime: string | null;
  location: string | null;
  tag: string | null;
  imageUrl: string | null;
  imageAlt: string;
  buttonLabel: string | null;
  buttonLink: string | null;
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  try {
    // Use the shared server-only transport so Contentful caching and tags
    // remain consistent with the rest of the application.
    const data = await contentfulFetch<UpcomingEventsQueryResult>({
      query: QUERY,
      tags: ["upcomingEvents" satisfies ContentTypeId],
    });

    // Convert Contentful's response into the app-facing event shape.
    return data.upcomingEventsCollection.items.map((item) => ({
      id: item.sys.id,
      title: item.eventName,
      dateTime: null,
      location: null,
      tag: null,
      imageUrl: item.image?.url ? `https:${item.image.url}` : null,
      imageAlt: item.image?.title ?? "",
      buttonLabel: null,
      buttonLink: null,
    }));
  } catch (err) {
    // Keep the caller's contract simple: a failed request behaves like an
    // empty result while the error is still visible in server logs.
    console.error("Failed to fetch upcoming events from Contentful:", err);
    return [];
  }
}
