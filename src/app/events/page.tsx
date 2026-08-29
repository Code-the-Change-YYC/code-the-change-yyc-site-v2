import UpcomingEvents from "@/components/upcoming-events";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <h1>Events</h1>
      <UpcomingEvents />
    </main>
  );
}
