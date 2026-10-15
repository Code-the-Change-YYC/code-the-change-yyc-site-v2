import type { Metadata } from "next";
import { draftMode } from "next/headers";

import UpcomingEvents from "@/components/upcoming-events";
import { getUpcomingEvents } from "@/lib/contentful/queries/upcoming-events";

export const metadata: Metadata = {
  title: "Events",
};

// TODO(design): build the rest of this page from the Direction 05 mockup.
export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const upcomingEvents = await getUpcomingEvents({ preview });

  return (
    <main>
      <h1 className="sr-only">Events</h1>
      <UpcomingEvents events={upcomingEvents} />
    </main>
  );
}
