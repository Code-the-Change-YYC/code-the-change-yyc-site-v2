import Image from "next/image";
import Link from "next/link";

import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import type { EventCardData } from "@/lib/contentful/events";

/**
 * WB-44: project folder cards + upcoming events strip for the homepage.
 * Figma components `450:269` (Salvation Army) and `442:212` (Scuba SEAsons),
 * enabled + hover states.
 *
 * Each card is a 420x418 artboard laid out in percentages of its own width.
 * The hover pose (screenshots fan out, folder tilts, blurb appears) is a set
 * of translate/rotate offsets measured from the hover variant, expressed in
 * `cqw` (1% of the card's width) so they scale with the card.
 */

type Layer = {
  src: string;
  /** Position/size of the enabled state, % of the 420x418 artboard. */
  place: string;
  /** Hover pose: translate (cqw) + rotate. */
  hover: string;
  fit: "cover" | "contain";
  sizes: string;
};

const SHADOW =
  "group-hover:shadow-elevation-300 group-focus-visible:shadow-elevation-300";

const SALVATION_LAYERS: Layer[] = [
  {
    src: "/brand/home/project-salvation-schedule.webp",
    place: "left-[19.05%] top-[41.15%] w-[55.24%] h-[36.12%]",
    hover:
      "group-hover:-translate-x-[15.24cqw] group-hover:-translate-y-[5cqw] group-hover:-rotate-[15deg]",
    fit: "contain",
    sizes: "232px",
  },
  {
    src: "/brand/home/project-salvation-login.webp",
    place: "left-[32.98%] top-[27.03%] w-[30.71%] h-[66.99%]",
    hover:
      "group-hover:-translate-x-[4.52cqw] group-hover:-translate-y-[19.29cqw] group-hover:-rotate-[9.7deg]",
    fit: "cover",
    sizes: "130px",
  },
  {
    src: "/brand/home/project-salvation-survey.webp",
    place: "left-[50.12%] top-[27.03%] w-[30.66%] h-[66.99%]",
    hover:
      "group-hover:translate-x-[8.43cqw] group-hover:-translate-y-[15.24cqw] group-hover:-rotate-[4.14deg]",
    fit: "cover",
    sizes: "130px",
  },
  {
    src: "/brand/home/project-salvation-logo.webp",
    place: "left-[48.45%] top-[34.69%] w-[25.8%] h-[25.93%]",
    hover:
      "group-hover:-translate-x-[13.81cqw] group-hover:-translate-y-[11.79cqw] group-hover:-rotate-[24.65deg]",
    fit: "contain",
    sizes: "110px",
  },
];

const SCUBA_LAYERS: Layer[] = [
  {
    src: "/brand/home/project-scuba-1.webp",
    place: "left-[19.64%] top-[27.03%] w-[30.76%] h-[66.99%]",
    hover:
      "group-hover:-translate-x-[15.24cqw] group-hover:-translate-y-[5cqw] group-hover:-rotate-[15deg]",
    fit: "cover",
    sizes: "130px",
  },
  {
    src: "/brand/home/project-scuba-2.webp",
    place: "left-[32.98%] top-[27.03%] w-[30.71%] h-[66.99%]",
    hover:
      "group-hover:-translate-x-[4.52cqw] group-hover:-translate-y-[19.29cqw] group-hover:-rotate-[9.7deg]",
    fit: "cover",
    sizes: "130px",
  },
  {
    src: "/brand/home/project-scuba-3.webp",
    place: "left-[50.12%] top-[27.03%] w-[30.66%] h-[66.99%]",
    hover:
      "group-hover:translate-x-[8.43cqw] group-hover:-translate-y-[15.24cqw] group-hover:-rotate-[4.14deg]",
    fit: "cover",
    sizes: "130px",
  },
  {
    src: "/brand/home/project-scuba-icon.webp",
    place: "left-[48.45%] top-[34.69%] w-[25.8%] h-[25.93%]",
    hover:
      "group-hover:-translate-x-[13.81cqw] group-hover:-translate-y-[11.79cqw] group-hover:-rotate-[24.65deg]",
    fit: "cover",
    sizes: "110px",
  },
];

function ProjectFolderCard({
  name,
  blurb,
  layers,
}: {
  name: string;
  blurb: string;
  layers: Layer[];
}) {
  return (
    <Link
      href="/projects"
      className="group font-omnes text-grey-800 flex w-full max-w-[420px] flex-col items-center gap-6 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
    >
      <div className="[container-type:inline-size] relative aspect-[420/418] w-full">
        {layers.map((layer) => (
          <div
            key={layer.src}
            className={`absolute rounded-2xl transition-[translate,rotate,box-shadow] duration-300 ease-out motion-reduce:transition-none ${layer.place} ${layer.hover} ${SHADOW}`}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              sizes={layer.sizes}
              className={`rounded-2xl ${layer.fit === "cover" ? "object-cover" : "object-contain"}`}
            />
          </div>
        ))}
        {/* Folder body + label; the Figma hover pose tilts these as one. */}
        <div className="absolute top-[52.23%] left-[18.93%] h-[44%] w-[62.14%] transition-[translate,rotate] duration-300 ease-out group-hover:translate-x-[6.05cqw] group-hover:-translate-y-[3.48cqw] group-hover:-rotate-[9.7deg] group-focus-visible:translate-x-[6.05cqw] group-focus-visible:-translate-y-[3.48cqw] group-focus-visible:-rotate-[9.7deg] motion-reduce:transition-none">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG from /public (see section-heading.tsx) */}
          <img
            src="/brand/home/project-folder.svg"
            alt=""
            width={261}
            height={184}
            className={`size-full rounded-2xl ${SHADOW}`}
          />
        </div>
        <span className="text-headline-small absolute top-[84.55%] left-[24.74%] transition-[translate,rotate] duration-300 ease-out group-hover:translate-x-[8.48cqw] group-hover:-translate-y-[2.62cqw] group-hover:-rotate-[9.7deg] motion-reduce:transition-none">
          {name}
        </span>
      </div>
      {/* Blurb is invisible until hover/focus; always shown on touch devices. */}
      <p className="text-body-large w-[261px] max-w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
        {blurb}
      </p>
    </Link>
  );
}

export function HomeProjectCards() {
  return (
    <ul
      aria-label="Featured projects"
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:items-start"
    >
      <li className="flex w-full justify-center">
        <ProjectFolderCard
          name="Salvation Army"
          blurb="We partnered with the Salvation Army Calgary branch to develop a web app to streamline the booking processes at the Navigation Centre."
          layers={SALVATION_LAYERS}
        />
      </li>
      <li className="flex w-full justify-center">
        <ProjectFolderCard
          name="Scuba SEAsons"
          blurb="Scuba SEAsons is an open source mobile app that helps divers map out the ocean. Our team assisted in Mobile App Development."
          layers={SCUBA_LAYERS}
        />
      </li>
    </ul>
  );
}

/**
 * "Upcoming Events" strip: up to three EventCards. `events` is `null` when
 * Contentful couldn't be reached (the strip is hidden) and `[]` when nothing
 * is scheduled (a friendly empty state with a link to the Events page).
 */
export function HomeEventsStrip({
  events,
}: {
  events: EventCardData[] | null;
}) {
  if (events === null) return null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4">
      <h3 className="font-omnes text-title-large font-semibold text-purple-500">
        Upcoming Events
      </h3>
      {events.length === 0 ? (
        <div className="font-omnes border-grey-200 flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl border border-dashed bg-white px-6 py-10 text-center">
          <p className="text-title-medium text-grey-600">
            Nothing on the calendar right now, but we&apos;re always planning
            the next one. Check back soon!
          </p>
          <Button href="/events" variant="outline" icon="arrow-right">
            Browse all events
          </Button>
        </div>
      ) : (
        <ul className="grid w-full grid-cols-[minmax(0,321px)] justify-center gap-6 md:grid-cols-[repeat(2,minmax(0,321px))] lg:grid-cols-[repeat(3,minmax(0,321px))] lg:justify-between">
          {events.slice(0, 3).map((event) => (
            <li key={event.id} className="flex justify-center">
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
