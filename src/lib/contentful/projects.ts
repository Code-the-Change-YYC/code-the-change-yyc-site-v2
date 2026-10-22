import "server-only";
import { draftMode } from "next/headers";

import { contentfulFetchOrNull } from "./fetch";

/**
 * "Code contributions" project grid data, from the Contentful
 * `externalProject` content type (fields: name, descriptions, logo,
 * githubLink, liveProjectLink, appStoreLink, playStoreLink, order).
 */
const QUERY = /* GraphQL */ `
  query ExternalProjects($preview: Boolean!) {
    externalProjectCollection(order: order_ASC, preview: $preview, limit: 50) {
      items {
        sys {
          id
        }
        name
        descriptions
        logo {
          url
          contentType
        }
        githubLink
        liveProjectLink
        appStoreLink
        playStoreLink
      }
    }
  }
`;

interface ExternalProjectsQueryResult {
  externalProjectCollection: {
    items: Array<{
      sys: { id: string };
      name: string | null;
      descriptions: string | null;
      logo: {
        url: string | null;
        contentType: string | null;
      } | null;
      githubLink: string | null;
      liveProjectLink: string | null;
      appStoreLink: string | null;
      playStoreLink: string | null;
    } | null>;
  } | null;
}

export interface ProjectCardData {
  id: string;
  name: string;
  description: string | null;
  logo: { url: string; isSvg: boolean } | null;
  /** Best available link: live site, then GitHub, then app stores. */
  href: string | null;
}

/**
 * Returns `null` when Contentful couldn't be reached (callers show an error
 * message) and `[]` when there are simply no projects.
 */
export async function getProjects(): Promise<ProjectCardData[] | null> {
  const { isEnabled: preview } = await draftMode();
  const data = await contentfulFetchOrNull<ExternalProjectsQueryResult>({
    query: QUERY,
    variables: { preview },
    preview,
    tags: ["externalProject"],
  });
  if (!data) return null;

  const cards: ProjectCardData[] = [];
  for (const item of data.externalProjectCollection?.items ?? []) {
    if (!item?.name) continue;
    const logo = item.logo;
    cards.push({
      id: item.sys.id,
      name: item.name,
      description: item.descriptions,
      logo: logo?.url
        ? { url: logo.url, isSvg: logo.contentType === "image/svg+xml" }
        : null,
      href:
        item.liveProjectLink ??
        item.githubLink ??
        item.appStoreLink ??
        item.playStoreLink ??
        null,
    });
  }
  return cards;
}
