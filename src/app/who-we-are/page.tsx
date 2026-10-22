import type { Metadata } from "next";
import { AboutHeading } from "./page-heading";
import { PixelDivider } from "@/components/pixel-divider";
import { Timeline } from "./timeline";
import { Team } from "./team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Code the Change YYC: a student-led Calgary club building software for non-profits, our history, our team, and our hackathons.",
};

export default function Page() {
  return (
    <main>
      <section className="-mt-24 bg-purple-500 px-4 pt-32 pb-16 md:-mt-28 md:px-10 md:pt-40 lg:px-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:gap-8 lg:flex-row lg:gap-x-20">
          <AboutHeading className="w-[267px] shrink-0" />
          <p className="font-omnes max-w-xl flex-1 text-xl font-normal text-white md:text-2xl lg:max-w-none">
            Code the Change YYC is a student-led initiative where students in
            technology-focused programs volunteer their time to work on projects
            for causes as a way to grow their skills, gain experience, attain
            mentorship, and give back to the community.
          </p>
        </div>
      </section>
      <PixelDivider className="w-full" />
      <Timeline />
      <Team />
    </main>
  );
}
