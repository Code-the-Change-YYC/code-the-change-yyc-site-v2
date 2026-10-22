import Link from "next/link";

/**
 * WB-45 "Ready to join the change?" panel. Figma join us 539:4217 (desktop),
 * 603:2810 (tablet). Peach (orange/200) rounded panel, four white role cards
 * with hand-drawn illustrations, and a "Learn more" text link to /join.
 */

const ROLES = [
  { label: "Development", src: "/brand/home/join-development.svg" },
  { label: "Events", src: "/brand/home/join-events.svg" },
  { label: "Marketing", src: "/brand/home/join-marketing.svg" },
  { label: "Design", src: "/brand/home/join-design.svg" },
] as const;

export function HomeJoin() {
  return (
    <section
      aria-labelledby="home-join-heading"
      className="mx-auto w-full max-w-[1280px] px-8 py-8 lg:px-6"
    >
      <div className="font-omnes flex flex-col items-center gap-8 rounded-4xl bg-orange-200 p-6 text-center text-orange-900 lg:px-16 lg:py-16">
        <div className="flex flex-col gap-2">
          <h2
            id="home-join-heading"
            className="text-headline-large font-semibold"
          >
            Ready to join the change?
          </h2>
          <p className="text-body-large font-medium">
            Explore our roles here and follow us on our socials to know when
            we’re recruiting! :)
          </p>
        </div>

        <ul className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-6 lg:justify-between lg:gap-x-2.5">
          {ROLES.map(({ label, src }) => (
            <li
              key={label}
              className="flex w-[248px] max-w-full flex-col items-center rounded-xl bg-white p-6"
            >
              <div className="flex size-[200px] items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG from /public (see section-heading.tsx) */}
                <img
                  src={src}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-headline-small font-semibold text-purple-500">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/join"
          className="text-headline-small inline-flex items-center gap-2 rounded-full px-6 py-4 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-900"
        >
          Learn more
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 shrink-0"
          >
            <path d="M4 10h12m-5-5 5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
