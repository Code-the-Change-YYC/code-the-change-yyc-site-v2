"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { TeamCard } from "./team-card";
import {
  CATEGORIES,
  membersFor,
  techProjects,
  type Category,
  type TeamMember,
} from "./team-data";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500";

export function TeamTabs({ members }: { members: TeamMember[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("Executives");
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [project, setProject] = useState<string | null>(null);
  const projects = techProjects(members);
  const showFilter = activeCategory === "Tech" && projects.length > 0;
  const visibleMembers = membersFor(
    members,
    activeCategory,
    showFilter ? project : null,
  );

  const activeIndex = CATEGORIES.indexOf(activeCategory);

  function selectCategory(category: Category) {
    setActiveCategory(category);
    setProject(null);
  }

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
    selectCategory(next);
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
              onClick={() => selectCategory(category)}
              onKeyDown={handleKeyDown}
              className={`font-omnes text-label-large rounded-t-xl px-4 py-2 font-medium whitespace-nowrap ${FOCUS} ${
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
        className={`rounded-tr-[20px] rounded-b-[20px] bg-green-50 px-3 py-6 md:px-6 lg:px-16 lg:py-12 ${FOCUS} ${
          activeIndex === 0 ? "" : "rounded-tl-[20px]"
        }`}
      >
        {showFilter && (
          <div
            role="group"
            aria-label="Filter by project"
            className="mb-4 flex flex-wrap gap-x-4 gap-y-2 px-0"
          >
            <FilterChip
              label="All"
              pressed={project === null}
              onClick={() => setProject(null)}
            />
            {projects.map((name) => (
              <FilterChip
                key={name}
                label={name}
                pressed={project === name}
                onClick={() => setProject(name)}
              />
            ))}
          </div>
        )}
        {visibleMembers.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {visibleMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        ) : (
          <p className="font-omnes text-body-large py-8 text-center text-green-800">
            Team info coming soon.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`text-label-large px-3 py-1.5 font-medium ${FOCUS} ${
        pressed
          ? "rounded-lg bg-green-800 text-green-50"
          : "rounded-full bg-green-100 text-green-900"
      }`}
    >
      {label}
    </button>
  );
}
