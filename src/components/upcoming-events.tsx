import { EventCard } from "@/components/event-card";
import type { EventCardData } from "@/lib/contentful/events";

/**
 * "Upcoming Events" section: centred purple title + a grid of event cards
 * (3 across on desktop, 1 column on mobile). `events` is `null` when
 * Contentful couldn't be reached, and `[]` when there is simply nothing
 * scheduled; each gets its own message.
 */
export default function UpcomingEvents({
  events,
}: {
  events: EventCardData[] | null;
}) {
  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className="px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="upcoming-events-heading"
          className="font-omnes text-center text-4xl leading-11 font-semibold text-purple-500"
        >
          Upcoming Events
        </h2>

        {events === null ? (
          <Message role="alert">
            We couldn&apos;t load events right now. Please check back soon.
          </Message>
        ) : events.length === 0 ? (
          <Message>No upcoming events right now — check back soon!</Message>
        ) : (
          <ul className="mt-8 grid grid-cols-[minmax(0,321px)] justify-center gap-6 md:grid-cols-[repeat(2,minmax(0,321px))] lg:grid-cols-[repeat(3,minmax(0,321px))] lg:justify-between">
            {events.map((event) => (
              <li key={event.id} className="flex justify-center">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Message({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "alert";
}) {
  return (
    <p
      role={role}
      className="font-omnes border-grey-200 text-grey-600 mx-auto mt-8 max-w-xl rounded-2xl border border-dashed bg-white px-6 py-12 text-center text-lg"
    >
      {children}
    </p>
  );
}
