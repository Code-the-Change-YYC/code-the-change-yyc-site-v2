import { PixelDivider } from "@/components/pixel-divider";

// Figma vectors 553:8586 (sparkle) and 553:8587 (double underline). Both are
// stroked paths with overflow past their layout box, so they are sized/offset
// to match the design's absolute positions around the title.
function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="36"
      height="29"
      viewBox="0 0 36.0007 29.0003"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00048 14.7172C3.88283 9.50963 7.85342 4.30208 9.61812 3.0002M9.61812 18.6228C13.5887 13.8493 19.324 8.6417 33.0005 7.33982M14.0299 26.0002C18.8828 22.0945 26.824 23.3964 31.2358 25.1323"
        stroke="var(--color-red-500)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Underline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="177"
      height="26"
      viewBox="0 0 177.001 26.0006"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00058 12.0531C24.0076 7.82793 87.6175 0.299536 174.001 3.98691M26.2823 23C49.0288 18.1987 107.046 9.28751 157.141 12.0531"
        stroke="var(--color-purple-500)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EventsHeader() {
  return (
    <>
      <section className="-mt-24 bg-purple-200 px-4 pt-32 pb-16 md:-mt-28 md:px-32 md:pt-40">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-x-20">
          <div className="relative shrink-0">
            <h1 className="font-omnes text-display-large font-semibold text-purple-800">
              Events
            </h1>
            <Sparkle className="absolute top-[-3px] left-[175px]" />
            <Underline className="absolute top-[57px] -left-0.5" />
          </div>
          <p className="font-omnes text-grey-800 flex-1 text-lg md:text-2xl md:leading-8">
            Looking to work with an energetic and enthusiastic group of
            postsecondary students on improving awareness around technology for
            social impact? We host a variety of workshops and hackathons every
            year, blending together ideas around software development and social
            good.
          </p>
        </div>
      </section>
      <PixelDivider className="w-full" color="var(--color-purple-200)" />
    </>
  );
}
