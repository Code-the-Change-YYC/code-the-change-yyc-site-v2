import Image from "next/image";
import type { EventCardData } from "@/lib/contentful/events";

/**
 * Event card (Figma `event card`, 321 wide): 200px image area with an optional
 * type tag, then date/time, title, location and an outline pill CTA. Shared by
 * the Events page and (later) the homepage.
 *
 * Soft elevation shadow per the Figma design, not the hard-offset "sticker".
 */
export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="shadow-elevation-300 flex w-full max-w-[321px] flex-col rounded-2xl bg-white">
      <div className="bg-grey-100 relative h-[200px] w-full overflow-hidden rounded-t-xl">
        {event.image ? (
          <Image
            src={event.image.url}
            alt={event.image.alt}
            fill
            sizes="321px"
            className="object-cover"
          />
        ) : null}

        {event.tag ? (
          <span className="font-omnes text-grey-800 absolute top-4 left-4 rounded-full bg-white px-2.5 py-0.5 text-sm leading-5 font-medium shadow-sm">
            {event.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col items-start gap-6 rounded-b-xl bg-white p-6">
        <div className="flex w-full flex-col gap-4">
          {event.dateTime ? (
            <p className="font-omnes text-sm leading-5 font-medium text-red-800">
              {event.dateTime}
            </p>
          ) : null}

          <div className="flex flex-col gap-2">
            <h3 className="font-omnes text-grey-800 text-title-large font-medium">
              {event.title}
            </h3>
            {event.location ? (
              <p className="font-omnes text-grey-600 flex items-center gap-2 text-sm leading-5 font-medium">
                <PinIcon />
                <span className="min-w-0 flex-1">{event.location}</span>
              </p>
            ) : null}
          </div>
        </div>

        {event.ctaText && event.ctaHref ? (
          <a
            href={event.ctaHref}
            {...(isExternal(event.ctaHref)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="font-omnes border-grey-400 text-grey-800 hover:bg-grey-800 hover:border-grey-800 mt-auto inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-base leading-6 font-medium whitespace-nowrap transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            {event.ctaText}
            <span className="sr-only"> for {event.title}</span>
            <ArrowUpRightIcon />
            {isExternal(event.ctaHref) ? (
              <span className="sr-only"> (opens in a new tab)</span>
            ) : null}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

// Inline 20px icons (map-pin / arrow-up-right) rather than taking on an icon
// library for two glyphs.
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
      className="size-5 shrink-0"
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
      className="size-5 shrink-0"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
