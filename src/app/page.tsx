import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { Hero } from "@/components/hero";
import { HomeAbout } from "@/components/home-about";
import { HomeJoin } from "@/components/home-join";
import { HomeSponsors } from "@/components/home-sponsors";
import { HomeWhatWeDo } from "@/components/home-what-we-do";
import { getEvents } from "@/lib/contentful/events";

export const metadata: Metadata = {
  description:
    "Code the Change YYC is a Calgary student-led club that builds free software for non-profits and runs events and the Hack the Change hackathon.",
};

export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const events = await getEvents({ preview });

  return (
    <main className="bg-grey-50">
      <Hero />
      <HomeAbout />
      <HomeWhatWeDo
        upcomingEvents={events ? events.upcoming.slice(0, 3) : null}
      />
      <HomeJoin />
      <HomeSponsors />
    </main>
  );
}
