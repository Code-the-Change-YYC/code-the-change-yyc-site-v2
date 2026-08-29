import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

export type EventCardDisplay = {
  id: string;
  image: { url: string; alt?: string } | null;
  tag: string | null;
  dateTime: string;
  title: string;
  location: string | null;
  ctaText: string | null;
  ctaHref: string | null;
};

const EVENTS: EventCardDisplay[] = [
  {
    id: "1",
    image: null,
    tag: null,
    dateTime: "TBD",
    title: "Future event",
    location: "TBD",
    ctaText: "Learn more",
    ctaHref: "#",
  },
  {
    id: "2",
    image: null,
    tag: null,
    dateTime: "TBD",
    title: "Future event",
    location: "TBD",
    ctaText: "Learn more",
    ctaHref: "#",
  },
  {
    id: "3",
    image: null,
    tag: null,
    dateTime: "TBD",
    title: "Future event",
    location: "TBD",
    ctaText: "Learn more",
    ctaHref: "#",
  },
];

export default function UpcomingEvents({
  events = EVENTS,
}: {
  events?: EventCardDisplay[];
}) {
  if (events.length === 0) return null;

  return (
    <section className="bg-grey-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-omnes text-center text-4xl font-bold tracking-tight text-purple-500 md:text-5xl">
          Upcoming Events
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventCardDisplay }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative aspect-[4/3] w-full bg-grey-100">
        {event.image ? (
          <Image
            src={event.image.url}
            alt={event.image.alt ?? ""}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : null}

        {event.tag ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-grey-800 shadow-sm">
            {event.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
          {event.dateTime}
        </p>

        <h3 className="font-heading mt-1 text-xl font-semibold text-grey-800">
          {event.title}
        </h3>

        {event.location ? (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-grey-600">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{event.location}</span>
          </div>
        ) : null}

        {event.ctaText && event.ctaHref ? (
          <a
            href={event.ctaHref}
            className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-grey-800 px-4 py-2 text-sm font-semibold text-grey-800 transition-colors hover:bg-grey-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            {event.ctaText}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
