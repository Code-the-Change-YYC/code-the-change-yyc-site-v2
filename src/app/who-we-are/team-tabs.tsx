"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { CATEGORIES, type Category, type TeamMember } from "./team-data";

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

const NAME_TAG =
  "flex items-center justify-between gap-2 rounded-lg bg-green-50 p-2 shadow-md";

function TeamCard({ name, role, linkedinUrl, photoUrl }: TeamMember) {
  return (
    <div className="relative aspect-[205.5/263] overflow-hidden rounded-xl">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="bg-grey-200 absolute inset-0" />
      )}

      <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-green-200 p-2.5">
        <span aria-hidden="true" className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-sm font-medium text-green-900">{role}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3">
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className={NAME_TAG}
          >
            <span className="text-sm font-medium text-green-800">{name}</span>
            <LinkedinIcon className="h-6 w-6 text-green-800" />
          </a>
        ) : (
          <div className={NAME_TAG}>
            <span className="text-sm font-medium text-green-800">{name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TeamTabs({ members }: { members: TeamMember[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Executives");
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const visibleMembers = members.filter((member) =>
    member.categories.includes(activeCategory),
  );
  const activeIndex = CATEGORIES.indexOf(activeCategory);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex: number;
    if (event.key === "ArrowRight") nextIndex = activeIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = activeIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = CATEGORIES.length - 1;
    else return;
    event.preventDefault();
    const next =
      CATEGORIES[(nextIndex + CATEGORIES.length) % CATEGORIES.length];
    setActiveCategory(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Team categories"
        className="flex gap-2 overflow-x-auto"
      >
        {CATEGORIES.map((category) => {
          const selected = category === activeCategory;
          return (
            <button
              key={category}
              ref={(el) => {
                tabRefs.current[category] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveCategory(category)}
              onKeyDown={handleKeyDown}
              className={`font-omnes rounded-t-xl px-4 py-2 text-sm leading-5 font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
                selected
                  ? "bg-green-50 text-green-900"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activeCategory}`}
        tabIndex={0}
        className={`rounded-tr-[20px] rounded-b-[20px] bg-green-50 px-4 py-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 md:px-16 md:py-12 ${
          activeIndex === 0 ? "" : "rounded-tl-[20px]"
        }`}
      >
        {visibleMembers.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {visibleMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        ) : (
          <p className="font-omnes py-8 text-center text-lg text-green-800">
            Team info coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
