import { NEWSLETTER_SIGNUP_URL } from "@/lib/newsletter";

/**
 * Homepage hero (Jira WB-5).
 *
 * Figma "CTC website Redesign 2026" (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - tablet 603:2711 (834) and mobile 603:3157 (393) carry the text specs.
 *  - desktop 602:2161 (1280) contains only the background art, so the
 *    tablet text scale is reused from md up.
 *
 * Type scale: headline Omnes Bold 57/64 -> 88/96 (md), tracking -0.0025em;
 * subtext Omnes Regular 24/32 -> 32/40 (md); button label Omnes Regular
 * 24/32. Content gaps: 16 (headline -> subtext), 32 (-> button).
 */
export function Hero() {
  return (
    // TODO(WB-20): the hero illustration is a separate ticket. Add it as an
    // absolutely-positioned layer behind/below this text block (the section
    // is already `relative`); keep the text in the z-10 wrapper.
    <section className="relative isolate px-4 pt-14 pb-16 md:pt-24 md:pb-32">
      <div className="relative z-10 mx-auto flex max-w-[653px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-omnes text-[57px] leading-16 font-bold tracking-[-0.0025em] text-purple-500 md:text-[88px] md:leading-24">
            Coding a better world together.
          </h1>
          <p className="font-omnes text-grey-600 max-w-[497px] text-2xl leading-8 font-normal md:text-[32px] md:leading-10">
            Students supporting our community through technology since 2019.
          </p>
        </div>

        <a
          href={NEWSLETTER_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-omnes inline-flex items-center gap-2 rounded-full bg-purple-500 px-6 py-4 text-2xl leading-8 font-normal text-white transition-colors hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
        >
          Join our newsletter
          <span className="sr-only"> (opens in a new tab)</span>
          <span aria-hidden className="grid size-6 place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG from /public, see header.tsx */}
            <img
              src="/brand/envelope.svg"
              alt=""
              width={20}
              height={16}
              className="h-4 w-5"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
