// src/app/about/timeline.tsx
import { TimelineDot } from "./timeline-dot";
import { contentfulFetch } from "@/lib/contentful/fetch";
import { TIMELINE_QUERY, type TimelineResponse } from "./timeline-query";
import Image from "next/image";

export async function Timeline() {
  const data = await contentfulFetch<TimelineResponse>({
    query: TIMELINE_QUERY,
    tags: ["timeline"],
  });
  const timelineEntries = data.timelineCollection.items;

  return (
    <section className="px-4 py-16 md:px-10 md:py-24">
      <h2 className="font-omnes mx-auto mb-16 max-w-xs rounded-xl bg-white p-6 text-center text-[36px] leading-[44px] font-semibold text-purple-500 md:max-w-none md:rounded-none md:bg-transparent md:p-0 md:text-3xl md:font-bold">
        Our story started in {timelineEntries[0]?.year}...
      </h2>

      <div className="relative mx-auto max-w-4xl">
        <div className="bg-grey-400 absolute top-0 left-1/2 hidden h-full w-[8px] -translate-x-1/2 md:block" />

        <ul className="flex flex-col gap-6 md:gap-20">
          {timelineEntries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const photo = entry.largeImage ?? entry.smallImage;

            return (
              <li key={entry.year} className="relative">
                <TimelineDot className="absolute top-1/2 left-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 md:block" />

                <div
                  className={`md:w-1/2 ${isLeft ? "md:pr-16" : "md:ml-auto md:pl-16"}`}
                >
                  <div className="rounded-2xl bg-green-200 p-4">
                    {photo ? (
                      <Image
                        src={photo.url}
                        alt=""
                        width={photo.width}
                        height={photo.height}
                        className="mb-4 aspect-[4/3] w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="mb-4 aspect-[4/3] w-full rounded-xl bg-white/40" />
                    )}
                    <p className="text-grey-800 text-lg font-semibold">
                      {entry.year}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="font-omnes text-grey-800 mx-auto mt-16 max-w-xl text-center text-2xl">
        We&apos;re coding towards a brighter future. Will you be part of our
        next chapter?
      </p>
    </section>
  );
}
