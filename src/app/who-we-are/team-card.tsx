import Image from "next/image";
import type { TeamMember } from "./team-data";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 10v7M7.5 7.2v.01M11 10v7M11 13c0-1.66 1-3 2.5-3s2.5 1.34 2.5 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** Figma "name plate": green/50, radius 8, 8px padding. */
const NAME_PLATE =
  "shadow-elevation-100 flex w-full items-center justify-center gap-2 rounded-lg bg-green-50 p-2";

/** Single member card: the little "browser window" from the Figma design. */
export function TeamCard({ name, role, linkedinUrl, photoUrl }: TeamMember) {
  const plate = (
    <>
      <span className="text-label-large min-w-0 font-medium text-green-800">
        {name}
      </span>
      {linkedinUrl && (
        <LinkedinIcon className="h-6 w-6 shrink-0 text-green-800" />
      )}
    </>
  );

  return (
    <div className="relative flex h-[263px] flex-col justify-between overflow-hidden rounded-xl pb-3">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="text-headline-large absolute inset-0 flex items-center justify-center bg-green-300 font-semibold text-green-900"
        >
          {initials(name)}
        </div>
      )}

      <div className="relative flex items-center gap-2 bg-green-200 p-2.5">
        <span aria-hidden="true" className="flex shrink-0 gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-label-large min-w-0 font-medium text-green-900">
          {role}
        </span>
      </div>

      <div className="relative px-3">
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${NAME_PLATE} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500`}
          >
            {plate}
            <span className="sr-only">(LinkedIn, opens in a new tab)</span>
          </a>
        ) : (
          <div className={NAME_PLATE}>{plate}</div>
        )}
      </div>
    </div>
  );
}
