import { EventCard } from "@/components/event-card";
import type { EventCardData } from "@/lib/contentful/events";

/**
 * "Past events" (Figma 553:8911): purple heading and a horizontally scrolling
 * row of event cards (newest first). Hidden when events couldn't be loaded or
 * there are none.
 */
export function PastEvents({ events }: { events: EventCardData[] | null }) {
  if (!events || events.length === 0) return null;

  return (
    <section
      aria-labelledby="past-events-heading"
      className="px-4 pt-8 pb-16 md:px-6 md:pb-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="past-events-heading"
          className="font-omnes text-display-small text-center font-semibold text-purple-500"
        >
          Past events
        </h2>

        {/* Padding + negative margin keep the cards' soft shadows from being
            clipped by the scroll container. */}
        <ul
          tabIndex={0}
          aria-label="Past events, scrollable"
          className="-mx-4 mt-8 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pt-2 pb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 md:-mx-6 md:px-6"
        >
          {events.map((event) => (
            <li key={event.id} className="flex shrink-0 snap-start">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
