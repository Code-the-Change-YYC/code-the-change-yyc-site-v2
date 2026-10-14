// src/app/who-we-are/team-tabs.tsx
"use client";

import { useState } from "react";
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
          alt={`Photo of ${name}`}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="bg-grey-200 absolute inset-0" />
      )}

      <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-green-200 p-2.5">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        <span className="h-2 w-2 rounded-full bg-green-500" />
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

  const visibleMembers = members.filter((member) =>
    member.categories.includes(activeCategory),
  );

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-t-xl px-4 py-2 text-sm font-medium whitespace-nowrap ${
              category === activeCategory
                ? "bg-green-50 text-green-900"
                : "bg-green-100 text-green-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="rounded-tr-xl rounded-b-xl bg-green-50 px-4 py-8 md:px-16 md:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {visibleMembers.map((member) => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}
