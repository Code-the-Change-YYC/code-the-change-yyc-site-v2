import type { Metadata } from "next";

import { ImpactStats } from "@/components/impact-stats";
import { ProjectsGrid } from "@/components/projects-grid";
import { getProjects } from "@/lib/contentful/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software we have built for Calgary non-profits and community organizations, designed and developed by Code the Change YYC student teams.",
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <main className="flex flex-col items-center gap-8 pt-16 pb-16">
      <div className="flex flex-col items-center">
        <h1 className="font-omnes text-center text-[57px] leading-16 font-semibold tracking-[-0.0025em] text-purple-500">
          Projects
        </h1>
        {/*
          eslint-disable-next-line @next/next/no-img-element -- static brand
          SVG served from /public; see header.tsx for why next/image is not
          used for SVGs.
        */}
        <img
          src="/brand/projects/heading-underline.svg"
          alt=""
          width={152}
          height={27}
          className="h-auto w-38"
        />
      </div>

      <div className="w-full">
        <ImpactStats />
      </div>

      <ProjectsGrid projects={projects} />
    </main>
  );
}
