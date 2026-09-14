import Link from "next/link";

import { NEWSLETTER_SIGNUP_URL } from "@/lib/newsletter";

/**
 * Homepage hero — headline, subtext, newsletter CTA.
 *
 * Desktop type matches the "CTC website Redesign 2026" homepage frame
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ): purple/500 Omnes extra-bold headline,
 * grey/600 subtext, purple pill with envelope. Background illustration is
 * out of scope for WB-5.
 *
 * The mockup is a fixed 1400px artboard with no mobile frame. Below `md`
 * this component invents the layout: the headline floor drops below the
 * documented 56px spec so the word "together." fits a 320px viewport, the
 * line break after "better" is released so the title can wrap to three
 * lines, and the CTA stays a centered pill (not full-bleed) with a 44px
 * tap target.
 */

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="flex flex-col items-center px-6 pt-10 pb-16 text-center sm:pt-12 md:px-8 md:pt-20 md:pb-24">
      <h1 className="font-omnes max-w-4xl text-[clamp(2.5rem,1.25rem+6.5vw,6.5rem)] leading-[0.98] font-extrabold tracking-[-0.02em] text-pretty text-purple-500">
        Coding a better
        <br className="hidden md:block" /> world together.
      </h1>

      <p className="font-omnes text-grey-600 mt-5 max-w-sm text-base leading-snug font-medium text-pretty md:mt-6 md:max-w-xl md:text-xl">
        Students supporting our community through technology since 2019.
      </p>

      <Link
        href={NEWSLETTER_SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our newsletter (opens in a new tab)"
        className="font-omnes focus-visible:outline-grey-800 mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-purple-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 md:mt-10 md:min-h-0 md:gap-2.5 md:px-6 md:py-3.5 md:text-base"
      >
        Join our newsletter
        <EnvelopeIcon className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
      </Link>
    </section>
  );
}
