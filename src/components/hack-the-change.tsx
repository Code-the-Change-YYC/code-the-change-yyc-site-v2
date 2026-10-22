import { HackathonTimeline } from "@/components/hackathon-timeline";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HackathonEntry } from "@/lib/contentful/hackathons";

const DEFAULT_TITLE = "Hack the Change";
const DEFAULT_INTRO =
  "Hack the Change is a 24-hour event, hosted by us, where students from across Canada come together to build innovative software solutions that create positive social impact. It’s our biggest event of the year and draws 450+ participants annually, with over 10k in prizes & donation dollars.";
const DEFAULT_CTA_LABEL = "Get ready for HTC 2026!";
const DEFAULT_CTA_HREF = "https://hackthechangeyyc.ca/";

/**
 * "Hack the Change" panel (Figma 553:8683): title + brush underline beside an
 * intro paragraph, the hackathon timeline, and a CTA. Copy props default to the
 * Figma text until the Contentful content model gains fields for them (WB-36).
 * `entries` empty -> the timeline and its subtitle are simply omitted.
 */
export function HackTheChange({
  title = DEFAULT_TITLE,
  intro = DEFAULT_INTRO,
  subtitle,
  ctaLabel = DEFAULT_CTA_LABEL,
  ctaHref = DEFAULT_CTA_HREF,
  entries,
}: {
  title?: string;
  intro?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  entries: HackathonEntry[];
}) {
  const hasTimeline = entries.length > 0;
  const subtitleText =
    subtitle ?? `${DEFAULT_TITLE} started in ${entries[0]?.year ?? 2019}!`;

  return (
    <section
      aria-labelledby="hack-the-change-heading"
      className="px-4 py-8 md:px-6"
    >
      <div className="mx-auto max-w-[77rem] rounded-[2rem] bg-red-50 px-6 py-12 md:px-16 md:py-[5.5rem]">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <SectionHeading
              id="hack-the-change-heading"
              size="display"
              align="left"
              underline="red"
              className="shrink-0 text-red-800"
            >
              {title}
            </SectionHeading>
            <p className="font-omnes text-grey-800 text-headline-small md:flex-1">
              {intro}
            </p>
          </div>

          {hasTimeline ? (
            <>
              <p className="font-omnes text-title-large text-center font-medium text-red-800">
                {subtitleText}
              </p>
              <HackathonTimeline entries={entries} />
            </>
          ) : null}

          <div className="flex justify-center">
            <Button href={ctaHref} icon="arrow-up-right">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
