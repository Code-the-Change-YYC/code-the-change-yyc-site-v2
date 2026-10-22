import Image from "next/image";
import { contentfulFetchOrNull } from "@/lib/contentful/fetch";
import { TimelineDot } from "./timeline-dot";
import {
  TIMELINE_QUERY,
  type TimelineEntry,
  type TimelineResponse,
} from "./timeline-query";

const FALLBACK_START_YEAR = 2019;

/**
 * One "salvation army" card from Figma (746:3261): a photo peeking out above
 * a mint panel that carries the year. Panel and photo share the middle 62% of
 * the 420x418 artboard.
 */
function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const photo = entry.largeImage ?? entry.smallImage;

  return (
    <div className="relative aspect-[420/418] w-full max-w-[420px]">
      <div className="absolute top-[27%] left-[19%] h-[67%] w-[62%] overflow-hidden rounded-2xl bg-green-100">
        {photo && (
          <Image
            src={photo.url}
            alt={entry.description ?? `Code the Change YYC in ${entry.year}`}
            fill
            sizes="(min-width: 1024px) 260px, 62vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="absolute top-[52%] left-[19%] h-[44%] w-[62%] rounded-2xl bg-green-50">
        <p className="font-omnes text-grey-800 absolute bottom-6 left-6 text-2xl leading-8">
          {entry.year}
        </p>
      </div>
    </div>
  );
}

export async function Timeline() {
  const data = await contentfulFetchOrNull<TimelineResponse>({
    query: TIMELINE_QUERY,
    tags: ["timeline"],
  });
  const entries = data?.timelineCollection.items ?? [];
  const startYear = entries[0]?.year ?? FALLBACK_START_YEAR;

  return (
    <section className="px-4 py-16 md:px-10 md:py-24">
      <h2 className="font-omnes mx-auto mb-16 w-fit max-w-xs rounded-xl bg-white p-6 text-center text-4xl leading-11 font-semibold text-purple-500 md:max-w-none">
        Our story started in {startYear}...
      </h2>

      {entries.length > 0 && (
        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden="true"
            className="bg-grey-200 absolute top-0 left-1/2 hidden h-full w-2 -translate-x-1/2 md:block"
          />

          <ul className="flex flex-col items-center gap-8 md:items-stretch md:gap-0">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={entry.sys.id}
                  className="relative w-full md:grid md:grid-cols-[1fr_40px_1fr] md:items-center md:gap-x-[72px] md:not-first:-mt-44"
                >
                  <div
                    className={`flex ${
                      isLeft
                        ? "md:col-start-1 md:row-start-1 md:justify-end"
                        : "md:col-start-3 md:row-start-1 md:justify-start"
                    }`}
                  >
                    <TimelineCard entry={entry} />
                  </div>
                  <TimelineDot className="hidden h-10 w-10 md:col-start-2 md:row-start-1 md:block" />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="font-omnes text-grey-800 mx-auto mt-16 max-w-sm bg-white p-2 text-center text-2xl leading-8">
        We&apos;re coding towards a brighter future. Will you be part of our
        next chapter?
      </p>
    </section>
  );
}
