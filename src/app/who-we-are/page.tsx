import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
import { AboutHeading } from "./page-heading";
import { PixelDivider } from "./pixel-divider";
import { Timeline } from "./timeline";

// src/app/about/page.tsx
export default function Page() {
  return (
    <main>
      <section className="-mt-24 bg-purple-500 px-4 pb-16 pt-32 md:-mt-28 md:px-32 md:pt-40">
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-x-20">
          <AboutHeading className="w-[267px] shrink-0 self-center md:self-start" />
          <p className="flex-1 font-omnes text-lg font-normal text-white md:text-2xl">
            Code the Change YYC is a student-led initiative where students in
            technology-focused programs volunteer their time to work on
            projects for causes as a way to grow their skills, gain
            experience, attain mentorship, and give back to the community.
          </p>
        </div>
      </section>
      <PixelDivider className="hidden h-[120px] w-full md:block" />
      <Timeline />
    </main>
  );
}