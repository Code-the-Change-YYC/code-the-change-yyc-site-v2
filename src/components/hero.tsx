import Link from "next/link";

import { NEWSLETTER_SIGNUP_URL } from "@/lib/newsletter";

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
    <section className="flex flex-col items-center px-4 pt-12 pb-16 text-center md:pt-20 md:pb-24">
      <h1 className="max-w-4xl font-omnes text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-purple-500 [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:3px_white]">
        Coding a better world together.
      </h1>

      <p className="mt-5 max-w-xl font-omnes text-base font-medium leading-snug text-grey-600 md:mt-6 md:text-xl">
        Students supporting our community through technology since 2019.
      </p>

      <Link
        href={NEWSLETTER_SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-purple-500 px-6 py-3.5 font-omnes text-base font-bold text-white transition-colors hover:bg-purple-400 md:mt-10 md:px-8 md:py-4"
      >
        Join our newsletter
        <EnvelopeIcon className="h-5 w-5 shrink-0" />
      </Link>
    </section>
  );
}
