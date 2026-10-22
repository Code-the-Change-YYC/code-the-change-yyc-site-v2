export const TEAM_QUERY = `
  query TeamMembers {
    adminTeamMemberCollection(order: order_ASC) {
      items { sys { id } name position linkedin team pfp { url } }
    }
    technicalTeamCollection {
      items { sys { id } name position linkedin pfp { url } }
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
  pfp: Photo;
};

export type TeamResponse = {
  adminTeamMemberCollection: {
    items: (PersonItem & { team: string | null })[];
  };
  technicalTeamCollection: { items: PersonItem[] };
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
  }));

  const alumni = data.alumniCollection.items.map((item): TeamMember => ({
    id: item.sys.id,
    name: item.fullName ?? "",
    role: item.position ?? "",
    linkedinUrl: toLinkedinUrl(item.linkedin),
    photoUrl: item.profile?.url ?? null,
    categories: ["Alumni"],
  }));

  return [...admins, ...techs, ...alumni].filter(
    (member) => member.name !== "",
  );
}
