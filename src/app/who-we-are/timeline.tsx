import { TimelineFolderCard } from "@/components/timeline-folder-card";
import { contentfulFetchOrNull } from "@/lib/contentful/fetch";
import { TimelineDot } from "./timeline-dot";
import {
  TIMELINE_QUERY,
  type TimelineEntry,
  type TimelineResponse,
} from "./timeline-query";

const FALLBACK_START_YEAR = 2019;

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const photo = entry.largeImage ?? entry.smallImage;

  return (
    <TimelineFolderCard
      image={
        photo
          ? {
              url: photo.url,
              alt: entry.description ?? `Code the Change YYC in ${entry.year}`,
            }
          : null
      }
      year={entry.year}
      description={entry.description}
    />
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
        <div className="relative mx-auto md:max-w-xl lg:max-w-5xl">
          <div
            aria-hidden="true"
            className="bg-grey-200 absolute top-0 right-4 hidden h-full w-2 md:block lg:right-auto lg:left-1/2 lg:-translate-x-1/2"
          />

          <ul className="flex flex-col items-center gap-8 md:items-stretch md:gap-10 lg:gap-0">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={entry.sys.id}
                  className="relative w-full md:grid md:grid-cols-[1fr_40px] md:items-center md:gap-x-6 lg:grid-cols-[1fr_40px_1fr] lg:gap-x-[72px] lg:not-first:-mt-44"
                >
                  <div
                    className={`flex justify-center md:col-start-1 md:row-start-1 ${
                      isLeft
                        ? "lg:col-start-1 lg:justify-end"
                        : "lg:col-start-3 lg:justify-start"
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
