import Image from "next/image";
import type { HackathonEntry } from "@/lib/contentful/hackathons";

/**
 * Vertical timeline (Figma 553:8804): a grey centre line with red ring dots,
 * and cards alternating left/right, overlapping vertically so the zig-zag is
 * tight. On mobile it collapses to a single column with the line on the left.
 */
export function HackathonTimeline({ entries }: { entries: HackathonEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="bg-grey-200 absolute top-0 left-3 h-full w-1.5 -translate-x-1/2 rounded-full md:left-1/2"
      />
      <ol className="relative flex flex-col gap-8 md:gap-0">
        {entries.map((entry, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={entry.id}
              className="relative pl-12 md:grid md:grid-cols-[1fr_40px_1fr] md:items-center md:gap-x-[72px] md:pl-0 md:not-first:-mt-44"
            >
              <TimelineDot className="absolute top-1/2 left-0 size-6 -translate-y-1/2 md:static md:col-start-2 md:row-start-1 md:size-10 md:translate-y-0" />
              <div
                className={`flex ${
                  isLeft
                    ? "md:col-start-1 md:row-start-1 md:justify-end"
                    : "md:col-start-3 md:row-start-1 md:justify-start"
                }`}
              >
                <TimelineCard entry={entry} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Card from Figma "salvation army" (420x418): a photo peeking above a mint
 * panel that carries the year. The blurb is hidden in the design, so it is
 * kept for screen readers only.
 */
function TimelineCard({ entry }: { entry: HackathonEntry }) {
  return (
    <article className="relative aspect-[420/418] w-full max-w-[420px]">
      <div className="absolute top-[27%] left-[19%] h-[67%] w-[62%] overflow-hidden rounded-2xl bg-green-100">
        {entry.image ? (
          <Image
            src={entry.image.url}
            alt={entry.image.alt}
            fill
            sizes="(min-width: 1024px) 260px, 62vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="absolute top-[52%] left-[19%] h-[44%] w-[62%] rounded-2xl bg-green-50">
        <div className="absolute right-4 bottom-4 left-6 flex flex-col">
          <h3 className="font-omnes text-grey-800 text-headline-small">
            {entry.year}
          </h3>
          {entry.topic ? (
            <p className="font-omnes text-grey-600 text-body-medium">
              {entry.topic}
            </p>
          ) : null}
          {entry.blurb ? <p className="sr-only">{entry.blurb}</p> : null}
        </div>
      </div>
    </article>
  );
}

// Figma ellipse 553:8808: red ring, white gap, red core.
function TimelineDot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="var(--color-red-500)" />
      <circle cx="20" cy="20" r="16" fill="white" />
      <circle cx="20" cy="20" r="12" fill="var(--color-red-500)" />
    </svg>
  );
}
