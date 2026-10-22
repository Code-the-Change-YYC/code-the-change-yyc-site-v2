import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { ProjectCardData } from "@/lib/contentful/projects";

/**
 * One "Code contributions" card. Figma 493:6636: 24px padding, 12px radius,
 * 177px-tall logo box, 24/32 title, 16/24 description, outline "Read more"
 * button pinned to the bottom so cards in a row line up.
 */
export function ProjectCard({ project }: { project: ProjectCardData }) {
  const { name, description, logo, href } = project;
  return (
    <article className="border-grey-200 shadow-elevation-100 flex h-full flex-col gap-6 rounded-xl border bg-white p-6">
      <div className="relative h-[177px] w-full">
        {logo && (
          <Image
            src={logo.url}
            alt={`${name} logo`}
            fill
            sizes="(min-width: 768px) 440px, 90vw"
            unoptimized={logo.isSvg}
            className="object-contain"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-omnes text-headline-small text-grey-800 font-normal">
            {name}
          </h3>
          {description && (
            <p className="font-omnes text-body-large text-grey-800">
              {description}
            </p>
          )}
        </div>
        {href && (
          <div className="mt-auto">
            <Button href={href} variant="outline" icon="arrow-right">
              Read more<span className="sr-only"> about {name}</span>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
