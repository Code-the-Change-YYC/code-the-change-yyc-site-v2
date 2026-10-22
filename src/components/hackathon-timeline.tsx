import { TimelineFolderCard } from "@/components/timeline-folder-card";
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
        className="bg-grey-200 absolute top-0 left-3 h-full w-1.5 -translate-x-1/2 rounded-full lg:left-1/2"
      />
      <ol className="relative flex flex-col gap-8 lg:gap-0">
        {entries.map((entry, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={entry.id}
              className="relative pl-12 lg:grid lg:grid-cols-[1fr_40px_1fr] lg:items-center lg:gap-x-[72px] lg:pl-0 lg:not-first:-mt-44"
            >
              <TimelineDot className="absolute top-1/2 left-0 size-6 -translate-y-1/2 lg:static lg:col-start-2 lg:row-start-1 lg:size-10 lg:translate-y-0" />
              <div
                className={`flex ${
                  isLeft
                    ? "lg:col-start-1 lg:row-start-1 lg:justify-end"
                    : "lg:col-start-3 lg:row-start-1 lg:justify-start"
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

function TimelineCard({ entry }: { entry: HackathonEntry }) {
  return (
    <div className="w-full max-w-80 overflow-hidden lg:max-w-[420px] lg:overflow-visible">
      {/* Below lg the 420x418 art box is widened so the visible panel (62% of
          it) fills the column, and its empty margins are pulled back in. */}
      <TimelineFolderCard
        className="-mt-[43.3%] -mb-[6.4%] -ml-[30.6%] w-[161.3%]! max-w-none! lg:m-0 lg:w-full! lg:max-w-[420px]!"
        image={entry.image}
        year={entry.year}
        title={entry.title}
        subtitle={entry.topic}
        description={entry.blurb}
      />
    </div>
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
      <circle cx="20" cy="20" r="16" className="fill-white" />
      <circle cx="20" cy="20" r="12" fill="var(--color-red-500)" />
    </svg>
  );
}
