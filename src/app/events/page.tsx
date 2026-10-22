import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import { EventsHeader } from "@/components/events-header";
import { getEvents } from "@/lib/contentful/events";

export const metadata: Metadata = {
  title: "Events",
};

// "Upcoming" is decided against Date.now() at render time, so re-render at
// least hourly (webhook revalidation of the "event" tag also refreshes it).
export const revalidate = 3600;

// TODO(design): replaced by the real Upcoming Events section (WB-28).
export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const events = await getEvents({ preview });

  return (
    <main>
      <EventsHeader />

      <section
        aria-labelledby="upcoming-events"
        className="mx-auto max-w-5xl px-4 py-16 md:px-32"
      >
        <h2
          id="upcoming-events"
          className="font-omnes text-3xl font-semibold text-purple-800"
        >
          Upcoming Events
        </h2>

        {!events ? (
          <p role="alert" className="font-omnes text-grey-800 mt-6">
            We couldn&apos;t load events right now. Please check back soon.
          </p>
        ) : events.upcoming.length === 0 ? (
          <p className="font-omnes text-grey-800 mt-6">
            No upcoming events right now — check back soon!
          </p>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {events.upcoming.map((event) => (
              <li key={event.id} className="font-omnes text-grey-800">
                {event.image ? (
                  <Image
                    src={event.image.url}
                    alt={event.image.alt}
                    width={event.image.width ?? 800}
                    height={event.image.height ?? 450}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                ) : null}
                {event.dateTime ? <p>{event.dateTime}</p> : null}
                <h3 className="text-xl font-semibold">{event.title}</h3>
                {event.location ? <p>{event.location}</p> : null}
                {event.ctaHref ? (
                  <a
                    href={event.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 underline"
                  >
                    {event.ctaText}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
