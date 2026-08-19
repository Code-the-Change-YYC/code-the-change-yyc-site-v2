// src/components/PageHero.tsx
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  children: ReactNode;
}

export default function PageHero({ title, children }: PageHeroProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-32">
      <h1 className="relative flex w-fit shrink-0 items-start font-omnes text-6xl leading-none font-extrabold text-[#2910A7]">
        <span className="relative">
          {title}
          {/* Double underline swoosh. Fixed height + preserveAspectRatio
              so it doesn't scale up (and droop) with text width. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 24"
            preserveAspectRatio="none"
            className="absolute -bottom-5 left-0 h-5 w-full"
          >
            <path
              d="M4 10 C 50 3, 130 3, 176 12"
              stroke="#7054FD"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M8 18 C 55 12, 125 11, 168 18"
              stroke="#7054FD"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
        {/* Spark accent — inline right after the text so it tracks the
            text instead of floating loose when the rendered width changes. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mt-0 -ml-1 h-6 w-6 shrink-0"
        >
          <path
            d="M8 16 13 8"
            stroke="#FE4D6E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12 18 20 12"
            stroke="#FE4D6E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </h1>

      <p className="max-w-xl font-omnes text-base leading-relaxed text-grey-800">
        {children}
      </p>
    </div>
  );
}