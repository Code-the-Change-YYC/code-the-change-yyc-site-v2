"use client";

import Image from "next/image";
import { useId, useRef } from "react";

type TimelineFolderCardProps = {
  image: { url: string; alt: string } | null;
  year: string | number;
  title?: string | null;
  /** Short line under the year, e.g. the hackathon topic. */
  subtitle?: string | null;
  description?: string | null;
  /** Classes for the card's outer box (sizing and margins). */
  className?: string;
};

/**
 * Timeline card from Figma "salvation army" (420x418): a photo peeking above a
 * mint "folder" panel with the year. Hover/focus slides the folder down to
 * reveal more of the photo; click opens a dialog with the full story.
 */
export function TimelineFolderCard({
  image,
  year,
  title,
  subtitle,
  description,
  className = "",
}: TimelineFolderCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const label = [year, subtitle ?? title].filter(Boolean).join(" — ");
  const paragraphs = (description ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${label}, view details`}
        onClick={() => dialogRef.current?.showModal()}
        className={`group relative block aspect-[420/418] w-full max-w-[420px] cursor-pointer rounded-2xl text-left focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-purple-500 ${className}`}
      >
        <span className="group-hover:shadow-elevation-300 group-focus-visible:shadow-elevation-300 absolute top-[27%] left-[19%] block h-[67%] w-[62%] overflow-hidden rounded-2xl bg-green-100 shadow-none transition-[translate,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none">
          {image && (
            <Image
              src={image.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 260px, 320px"
              className="object-cover"
            />
          )}
        </span>
        <span className="absolute top-[52%] left-[19%] block h-[44%] w-[62%] rounded-2xl bg-green-50 transition-transform duration-300 ease-out motion-reduce:transition-none lg:group-hover:translate-y-[35%] lg:group-focus-visible:translate-y-[35%]">
          <span className="absolute right-4 bottom-4 left-6 flex flex-col">
            <span className="font-omnes text-grey-800 text-headline-small">
              {year}
            </span>
            {subtitle ? (
              <span className="font-omnes text-grey-600 text-body-medium">
                {subtitle}
              </span>
            ) : null}
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          // Clicks on the backdrop land on the <dialog> element itself.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[720px] overflow-y-auto overscroll-contain rounded-3xl bg-white p-0 text-left backdrop:bg-purple-800/60"
      >
        <div className="relative flex flex-col gap-6 p-6 md:p-8">
          <button
            type="button"
            aria-label="Close"
            onClick={() => dialogRef.current?.close()}
            className="text-grey-800 shadow-elevation-100 absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-green-50 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-green-100">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 656px, 90vw"
                className="object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h2
              id={titleId}
              className="font-omnes text-display-small text-purple-500"
            >
              {year}
            </h2>
            {title ? (
              <p className="font-omnes text-grey-800 text-headline-small">
                {title}
              </p>
            ) : null}
            {subtitle ? (
              <p className="font-omnes text-grey-600 text-title-medium">
                {subtitle}
              </p>
            ) : null}
          </div>

          {paragraphs.length > 0 && (
            <div className="font-omnes text-grey-800 text-body-large flex flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
