import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { EventsHeader } from "@/components/events-header";
import UpcomingEvents from "@/components/upcoming-events";
import { getEvents } from "@/lib/contentful/events";

export const metadata: Metadata = {
  title: "Events",
};

// "Upcoming" is decided against Date.now() at render time, so re-render at
// least hourly (webhook revalidation of the "event" tag also refreshes it).
export const revalidate = 3600;

export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const events = await getEvents({ preview });

  return (
    <main>
      <EventsHeader />
      <UpcomingEvents events={events ? events.upcoming : null} />
    </main>
  );
}
