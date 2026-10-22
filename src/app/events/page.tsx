import type { Metadata } from "next";
import { EventsHeader } from "@/components/events-header";

export const metadata: Metadata = {
  title: "Events",
};

export default function Page() {
  return (
    <main>
      <EventsHeader />
    </main>
  );
}
