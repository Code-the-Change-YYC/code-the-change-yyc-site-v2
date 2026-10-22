import { contentfulFetchOrNull } from "@/lib/contentful/fetch";
import { TeamHeading } from "./team-heading";
import { TeamTabs } from "./team-tabs";
import { TEAM_QUERY, toTeamMembers, type TeamResponse } from "./team-data";

export async function Team() {
  const data = await contentfulFetchOrNull<TeamResponse>({
    query: TEAM_QUERY,
    tags: ["adminTeamMember", "technicalTeam", "alumni", "project"],
  });
  const members = data ? toTeamMembers(data) : [];

  return (
    <section className="px-4 py-16 md:px-10 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-20">
          <h2 className="shrink-0">
            <TeamHeading />
          </h2>
          <p className="font-omnes text-grey-800 max-w-prose text-center text-2xl leading-8 md:flex-1 md:text-left">
            We&apos;re a passionate group of student developers, designers, and
            leaders spreading the magic of tech to charities, non-profits, and
            our community.
          </p>
        </div>
        <TeamTabs members={members} />
      </div>
    </section>
  );
}
