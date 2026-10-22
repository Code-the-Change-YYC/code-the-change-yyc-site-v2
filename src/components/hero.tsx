import Image from "next/image";

import { NEWSLETTER_SIGNUP_URL } from "@/lib/newsletter";

/**
 * Envelope icon from Figma (button 437:845, icon 140:353): 20x16 glyph
 * centred in a 24px box.
 */
function EnvelopeIcon() {
  return (
    <span aria-hidden="true" className="grid size-6 place-items-center">
      <svg
        aria-hidden="true"
        width={20}
        height={16}
        viewBox="0 0 20.1233 16.0957"
        fill="currentColor"
        className="h-4 w-5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.4845 0.0684046C0.992592 0.197167 0.547961 0.541202 0.265288 1.01501C-0.0153726 1.48277 -0.00128928 1.11057 0.000722623 8.07076C0.00273453 13.863 0.0087701 14.36 0.0721451 14.6044C0.253217 15.2975 0.86383 15.884 1.55693 16.0309C1.96635 16.1174 18.1501 16.1174 18.5595 16.0309C18.9327 15.9524 19.2044 15.7975 19.5152 15.4876C19.825 15.1768 19.9799 14.9052 20.0584 14.532C20.1449 14.1246 20.1449 1.9606 20.0584 1.55319C19.9115 0.860089 19.3251 0.249476 18.632 0.0684046C18.3865 0.00402365 17.7829 0 10.0582 0C2.33353 0 1.72995 0.00402365 1.4845 0.0684046ZM18.0445 2.08433C17.8996 2.22416 10.0824 8.72664 10.0582 8.72664C10.0341 8.72664 2.21684 2.22416 2.07198 2.08433C1.99351 2.00788 2.10517 2.00687 10.0582 2.00687C18.0113 2.00687 18.123 2.00788 18.0445 2.08433ZM5.7085 7.7408C8.1761 9.79496 9.2927 10.6993 9.45064 10.7737C9.64479 10.8643 9.72929 10.8794 10.0582 10.8794C10.3872 10.8794 10.4717 10.8643 10.6658 10.7737C10.8238 10.6993 11.9404 9.79496 14.408 7.7408C16.3424 6.13027 17.965 4.77526 18.0153 4.72999L18.1059 4.64851V14.0783H2.01062V4.64851L2.10115 4.72999C2.15044 4.77526 3.77405 6.13027 5.7085 7.7408Z"
        />
      </svg>
    </span>
  );
}

/**
 * Homepage hero (Jira WB-5).
 *
 * Figma "CTC website Redesign 2026" (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 * tablet 603:2711, mobile 603:3157. Desktop 602:2161 has only background
 * art; text uses tablet sizes from md up and, from lg, a smaller 640px column
 * centred in the sky between the blimp and the clouds.
 */
// Arbitrary px font sizes below are Figma-exact values; tokens come later.
export function Hero() {
  return (
    <section className="relative isolate min-h-[780px] overflow-x-clip px-4 pt-28 pb-16 md:min-h-[1040px] md:pt-36 lg:aspect-[1280/832] lg:min-h-0 lg:pt-32 lg:pb-0 2xl:max-h-[960px]">
      {/* Figma 602:2161. Anchored to the bottom so the grass always meets the
          pixel transition below; cropped at the sides on narrow screens. */}
      <Image
        src="/brand/home/hero-illustration.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[52%_100%] md:object-[45%_100%] lg:object-bottom"
      />
      <div className="relative z-10 mx-auto flex max-w-[653px] flex-col items-center gap-8 text-center lg:max-w-[640px]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-omnes text-[57px] leading-16 font-bold tracking-[-0.0025em] text-purple-500 md:text-[88px] md:leading-24 lg:text-[64px] lg:leading-[72px] xl:text-[72px] xl:leading-20">
            Coding a better world together.
          </h1>
          <p className="font-omnes text-grey-600 max-w-[497px] text-2xl leading-8 md:text-[32px] md:leading-10">
            Students supporting our community through technology since 2019.
          </p>
        </div>

        <a
          href={NEWSLETTER_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-omnes inline-flex items-center gap-2 rounded-full bg-purple-500 px-6 py-4 text-2xl leading-8 text-white transition-colors hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 motion-reduce:transition-none"
        >
          Join our newsletter
          <span className="sr-only"> (opens in a new tab)</span>
          <EnvelopeIcon />
        </a>
      </div>
    </section>
  );
}
