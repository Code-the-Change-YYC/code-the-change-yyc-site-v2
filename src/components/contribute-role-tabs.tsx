"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ContributeRole } from "@/lib/contentful/contribute";

/**
 * Role tabs (Figma 553:8225). Accessible tablist: roving tabIndex, Left/Right
 * wrap, Home/End. Mirrors the pattern in who-we-are/team-tabs.tsx.
 *
 * "Apply now" goes to /contact: Contentful `role` has no apply link or
 * deadline field yet.
 */
export function ContributeRoleTabs({ roles }: { roles: ContributeRole[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = roles[activeIndex];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number;
    if (event.key === "ArrowRight") next = activeIndex + 1;
    else if (event.key === "ArrowLeft") next = activeIndex - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = roles.length - 1;
    else return;
    event.preventDefault();
    next = (next + roles.length) % roles.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Student roles"
        className="flex gap-2 overflow-x-auto px-1 pt-1"
      >
        {roles.map((role, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={role.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              onKeyDown={handleKeyDown}
              className={`font-omnes text-title-medium rounded-t-xl px-4 py-2 font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
                selected
                  ? "bg-orange-50 text-orange-900"
                  : "bg-orange-100 text-orange-900 hover:bg-orange-50"
              }`}
            >
              {role.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
        tabIndex={0}
        className={`flex flex-col items-center gap-6 rounded-tr-[20px] rounded-b-[20px] bg-orange-50 px-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 md:flex-row md:px-16 ${
          activeIndex === 0 ? "" : "rounded-tl-[20px]"
        }`}
      >
        <div className="flex size-[200px] shrink-0 items-center justify-center p-2">
          {active.image && (
            <Image
              src={active.image.src}
              alt=""
              width={active.image.width}
              height={active.image.height}
              sizes="200px"
              className="h-auto max-h-full w-full object-contain"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
          <h3 className="font-omnes text-headline-small font-semibold text-orange-900">
            {active.label}
          </h3>
          <p className="font-omnes text-body-large text-grey-800">
            {active.description}
          </p>
          <Button
            href="/contact"
            variant="outline"
            size="sm"
            icon="arrow-up-right"
          >
            Apply now
          </Button>
        </div>
      </div>
    </div>
  );
}
