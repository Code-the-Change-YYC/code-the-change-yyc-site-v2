import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { ContributeHeader } from "@/components/contribute-header";
import { ContributeOrganizations } from "@/components/contribute-organizations";
import { ContributePhotoStrip } from "@/components/contribute-photo-strip";
import { ContributeStudents } from "@/components/contribute-students";
import {
  getExhibitOne,
  getExhibitTwo,
  getRoles,
  type ContributePhoto,
} from "@/lib/contentful/contribute";

export const metadata: Metadata = {
  title: "Contribute",
};

// Figma exports used when a strip is empty or Contentful is unreachable.
const fallback = (ids: number[]): ContributePhoto[] =>
  ids.map((n) => ({ src: `/brand/contribute/photo-${n}.jpg`, alt: "" }));
const FALLBACK_ONE = fallback([1, 2, 3, 4, 5]);
const FALLBACK_TWO = fallback([6, 7, 1, 2, 3]);

export default async function Page() {
  const { isEnabled: preview } = await draftMode();
  const [one, two, roles] = await Promise.all([
    getExhibitOne(preview),
    getExhibitTwo(preview),
    getRoles(preview),
  ]);

  return (
    <main className="bg-grey-50 flex flex-col gap-16 pt-32">
      <ContributeHeader />
      <ContributePhotoStrip
        label="Photos of our events and volunteering"
        photos={one?.length ? one : FALLBACK_ONE}
      />
      <ContributeStudents roles={roles} />
      <ContributePhotoStrip
        label="Photos of our team and hackathons"
        photos={two?.length ? two : FALLBACK_TWO}
      />
      <ContributeOrganizations />
    </main>
  );
}
