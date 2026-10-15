import Image from "next/image";

/**
 * "Upcoming Events" section (WB-28): centred purple title + a grid of event
 * cards (3 across on desktop, 1 column on mobile). Data comes from Contentful
 * via `getUpcomingEvents()` in src/lib/contentful/queries/upcoming-events.ts.
 *
 * Cards are white, rounded, with a soft shadow per the Figma design — not the
 * hard-offset "sticker" treatment.
 */

export type EventCardDisplay = {
  id: string;
  image: { url: string; alt: string } | null;
  tag: string | null;
  dateTime: string | null;
  title: string;
  location: string | null;
  ctaText: string | null;
  ctaHref: string | null;
};

export default function UpcomingEvents({
  events,
}: {
  events: EventCardDisplay[];
}) {
  if (events.length === 0) return null;

  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className="bg-grey-50 px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="upcoming-events-heading"
          className="font-omnes text-center text-3xl font-bold tracking-[-0.02em] text-purple-500 md:text-4xl"
        >
          Upcoming Events
        </h2>

        <ul className="mt-10 grid grid-cols-[minmax(0,20rem)] justify-center gap-6 md:mt-12 md:grid-cols-[repeat(2,minmax(0,20rem))] lg:grid-cols-[repeat(3,minmax(0,20rem))] lg:gap-8">
          {events.map((event) => (
            <li key={event.id} className="flex">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventCardDisplay }) {
  return (
    <article className="shadow-elevation-300 flex w-full flex-col overflow-hidden rounded-2xl bg-white">
      <div className="bg-grey-400/20 relative aspect-[16/10] w-full">
        {event.image ? (
          <Image
            src={event.image.url}
            alt={event.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}

        {event.tag ? (
          <span className="text-grey-800 absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-medium">
            {event.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {event.dateTime ? (
          <p className="text-sm font-medium tracking-wide text-red-500">
            {event.dateTime}
          </p>
        ) : null}

        <h3 className="font-omnes text-grey-800 mt-2 text-xl font-medium">
          {event.title}
        </h3>

        {event.location ? (
          <p className="text-grey-600 mt-2 flex items-center gap-2 text-sm">
            <PinIcon />
            <span>{event.location}</span>
          </p>
        ) : null}

        {event.ctaText && event.ctaHref ? (
          <a
            href={event.ctaHref}
            {...(isExternal(event.ctaHref)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="border-grey-600 text-grey-800 hover:border-grey-800 hover:bg-grey-800 mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            {event.ctaText}
            <ArrowUpRightIcon />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

// Inline icons (lucide "map-pin" / "arrow-up-right" shapes) so we don't take
// on an icon-library dependency for two glyphs.
function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
