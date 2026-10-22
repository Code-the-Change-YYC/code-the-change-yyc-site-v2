import {
  HomeEventsStrip,
  HomeProjectCards,
} from "@/components/home-project-cards";
import { HomeServiceBlock } from "@/components/home-service-block";
import { SectionHeading } from "@/components/ui/section-heading";
import type { EventCardData } from "@/lib/contentful/events";

/**
 * Homepage "What we do" section (WB-31 heading, WB-32 + WB-33 blocks, WB-44
 * cards/strip). Figma what-we-do 539:4128 (desktop), 603:2745 (tablet),
 * 603:3208 (mobile). `overflow-x-clip` hides the panels' edge bleed.
 */

const BLURB =
  "We seek to partner with nonprofit impact causes that have projects on the go that need additional programming and software development support. We work with project managers, product designers, and analysts to turn project visions to quality software.";

export function HomeWhatWeDo({
  upcomingEvents,
}: {
  /** `null` when Contentful is unreachable (hides the events strip). */
  upcomingEvents: EventCardData[] | null;
}) {
  return (
    <section
      aria-labelledby="home-what-we-do-heading"
      className="overflow-x-clip py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <SectionHeading
          id="home-what-we-do-heading"
          className="font-omnes px-4 text-purple-500"
        >
          What we do
        </SectionHeading>

        <HomeServiceBlock
          number="01"
          badge="green"
          title="Coding for good"
          photos={{
            back: {
              src: "/brand/home/what-we-do-coding-1.jpg",
              alt: "A Code the Change YYC volunteer chatting with a Salvation Army staff member in a warehouse",
            },
            front: {
              src: "/brand/home/what-we-do-coding-2.jpg",
              alt: "Two volunteers smiling while sorting donated clothing at a Salvation Army warehouse",
            },
          }}
          below={<HomeProjectCards />}
        >
          {BLURB}
        </HomeServiceBlock>

        <HomeServiceBlock
          number="02"
          badge="orange"
          title="Community & Events"
          mirrored
          photos={{
            back: {
              src: "/brand/home/what-we-do-community-1.jpg",
              alt: "A Code the Change YYC member making a peace sign at a club event",
            },
            front: {
              src: "/brand/home/what-we-do-community-2.jpg",
              alt: "Four Code the Change YYC members in black club shirts posing at a booth",
            },
          }}
        >
          {BLURB}
        </HomeServiceBlock>

        <HomeEventsStrip events={upcomingEvents} />
      </div>
    </section>
  );
}
