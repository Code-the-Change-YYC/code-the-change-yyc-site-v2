import type { Metadata } from "next";

import { ImpactStats } from "@/components/impact-stats";

export const metadata: Metadata = {
  title: "Projects",
};

// TODO(contentful): wire up the content types this page needs (project grid, WB-25).
export default function Page() {
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
    </main>
  );
}
