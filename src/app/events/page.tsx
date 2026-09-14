import type { Metadata } from "next";
import HeaderBackground from "@/components/HeaderBackground";
import EventHero from "@/components/EventHero";

export const metadata: Metadata = {
  title: "Events",
};

// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <HeaderBackground>
      <EventHero title="Events">
        Looking to work with an energetic and enthusiastic group of
        postsecondary students on improving awareness around technology for
        social impact? We host a variety of workshops and hackathons every year,
        blending together ideas around software development and social good.
      </EventHero>
    </HeaderBackground>
  );
}
