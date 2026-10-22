import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { EventsHeader } from "@/components/events-header";
import { HackTheChange } from "@/components/hack-the-change";
import { PastEvents } from "@/components/past-events";
import UpcomingEvents from "@/components/upcoming-events";
import { getEvents } from "@/lib/contentful/events";
import { getHackathons } from "@/lib/contentful/hackathons";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past Code the Change YYC events, from workshops and socials to our annual Hack the Change hackathon in Calgary.",
};

// "Upcoming" is decided against Date.now() at render time, so re-render at
// least hourly (webhook revalidation of the "event" tag also refreshes it).
export const revalidate = 3600;

export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const [events, hackathons] = await Promise.all([
    getEvents({ preview }),
    getHackathons({ preview }),
  ]);

  return (
    <main>
      <EventsHeader />
      <UpcomingEvents events={events ? events.upcoming : null} />
      <HackTheChange entries={hackathons} />
      <PastEvents events={events ? events.past : null} />
    </main>
  );
}
