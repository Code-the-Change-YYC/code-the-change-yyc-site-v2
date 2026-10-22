export const TEAM_QUERY = `
  query TeamMembers {
    adminTeamMemberCollection(order: order_ASC) {
      items { sys { id } name position linkedin team isTeamLead pfp { url } }
    }
    technicalTeamCollection {
      items {
        sys { id }
        name
        position
        linkedin
        isTeamLead
        project { ... on Project { name } }
        pfp { url }
      }
    }
    alumniCollection(order: orderNumber_ASC) {
      items { sys { id } fullName position linkedin profile { url } }
    }
  }
`;

type Photo = { url: string } | null;

type PersonItem = {
  sys: { id: string };
  name: string | null;
  position: string | null;
  linkedin: string | null;
  isTeamLead: boolean | null;
  pfp: Photo;
};

export type TeamResponse = {
  adminTeamMemberCollection: {
    items: (PersonItem & { team: string | null })[];
  };
  technicalTeamCollection: {
    items: (PersonItem & { project: { name?: string | null } | null })[];
  };
  alumniCollection: {
    items: {
      sys: { id: string };
      fullName: string | null;
      position: string | null;
      linkedin: string | null;
      profile: Photo;
    }[];
  };
};

export const CATEGORIES = [
  "Executives",
  "Events",
  "Marketing",
  "Tech",
  "Alumni",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  linkedinUrl: string | null;
  photoUrl: string | null;
  categories: Category[];
  /** Tech project name (technicalTeam only), used by the Tech sub-filter. */
  project: string | null;
  isTeamLead: boolean;
};

const TEAM_TO_CATEGORY: Partial<Record<string, Category>> = {
  Events: "Events",
  "Marketing and Design": "Marketing",
  Tech: "Tech",
};

function toLinkedinUrl(value: string | null): string | null {
  if (!value) return null;
  return value.startsWith("http")
    ? value
    : `https://www.linkedin.com/in/${value}`;
}

export function toTeamMembers(data: TeamResponse): TeamMember[] {
  const admins = data.adminTeamMemberCollection.items.map(
    (item): TeamMember => {
      const role = item.position ?? "";
      const categories: Category[] = [];
      if (item.team === "Presidents" || role.startsWith("VP"))
        categories.push("Executives");
      const teamTab = item.team ? TEAM_TO_CATEGORY[item.team] : undefined;
      if (teamTab) categories.push(teamTab);
      return {
        id: item.sys.id,
        name: item.name ?? "",
        role,
        linkedinUrl: toLinkedinUrl(item.linkedin),
        photoUrl: item.pfp?.url ?? null,
        categories,
        project: null,
        isTeamLead: item.isTeamLead === true,
      };
    },
  );

  const techs = data.technicalTeamCollection.items.map((item): TeamMember => ({
    id: item.sys.id,
    name: item.name ?? "",
    role: item.position ?? "",
    linkedinUrl: toLinkedinUrl(item.linkedin),
    photoUrl: item.pfp?.url ?? null,
    categories: ["Tech"],
    project: item.project?.name?.trim() || null,
    isTeamLead: item.isTeamLead === true,
  }));

  const alumni = data.alumniCollection.items.map((item): TeamMember => ({
    id: item.sys.id,
    name: item.fullName ?? "",
    role: item.position ?? "",
    linkedinUrl: toLinkedinUrl(item.linkedin),
    photoUrl: item.profile?.url ?? null,
    categories: ["Alumni"],
    project: null,
    isTeamLead: false,
  }));

  // Stable sorts keep Contentful's order (admins by `order`, alumni by
  // `orderNumber`); team leads float to the front of each group.
  const leadsFirst = (a: TeamMember, b: TeamMember) =>
    Number(b.isTeamLead) - Number(a.isTeamLead);

  return [...admins, ...techs.toSorted(leadsFirst), ...alumni].filter(
    (member) => member.name !== "",
  );
}

/** Project names for the Tech sub-filter, in first-seen order. */
export function techProjects(members: TeamMember[]): string[] {
  const names = new Set<string>();
  for (const member of members) {
    if (member.project) names.add(member.project);
  }
  return [...names];
}

/** Members shown for a tab (and, for Tech, an optional project filter). */
export function membersFor(
  members: TeamMember[],
  category: Category,
  project: string | null,
): TeamMember[] {
  let result = members.filter((m) => m.categories.includes(category));
  if (category === "Tech") {
    if (project) {
      result = result.filter((m) => m.project === project);
    } else {
      // Someone can be both an admin and a developer; show them once.
      const seen = new Set<string>();
      result = result.filter(
        (m) =>
          !seen.has(m.linkedinUrl ?? m.name) &&
          seen.add(m.linkedinUrl ?? m.name),
      );
    }
  }
  return result.toSorted((a, b) => Number(b.isTeamLead) - Number(a.isTeamLead));
}
