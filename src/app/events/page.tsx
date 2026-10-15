import type { Metadata } from "next";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getUpcomingEvents } from "@/lib/contentful/events";

export const metadata: Metadata = {
  title: "Events",
};

// TODO(design): build this page from the Direction 05 mockup. The markup below
// is intentionally unstyled — it only proves the Contentful data is bound.
export default async function Page() {
  const result = await getUpcomingEvents();

  return (
    <main>
      <h1>Events</h1>

      <section aria-labelledby="upcoming-events">
        <h2 id="upcoming-events">Upcoming events</h2>

        {!result.ok ? (
          <p role="alert">
            We couldn&apos;t load upcoming events right now. Please check back
            soon.
          </p>
        ) : result.events.length === 0 ? (
          <p>No upcoming events are scheduled yet. Check back soon.</p>
        ) : (
          <ul>
            {result.events.map((event) => (
              <li key={event.id}>
                <h3>{event.title}</h3>
                {event.image ? (
                  <Image
                    src={event.image.url}
                    alt={event.image.alt}
                    width={event.image.width ?? 800}
                    height={event.image.height ?? 450}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                ) : null}
                {event.description
                  ? documentToReactComponents(event.description)
                  : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
