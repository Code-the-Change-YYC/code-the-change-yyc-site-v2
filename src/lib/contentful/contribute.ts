import "server-only";
import { contentfulFetchOrNull } from "./fetch";
import type { ContentTypeId } from "./tags";

/**
 * Data for the Contribute page (/join): the two photo strips
 * (`joinPageExhibitOne` / `joinPageExhibitTwo`) and the student `role` tabs.
 */

export interface ContributePhoto {
  src: string;
  alt: string;
}

export interface ContributeRole {
  /** Tab label, in Figma's wording (e.g. "Admin" for Contentful's "Finance"). */
  label: string;
  description: string;
  image: { src: string; width: number; height: number } | null;
}

type Asset = {
  url: string | null;
  width?: number | null;
  height?: number | null;
  description?: string | null;
} | null;

const EXHIBIT_QUERY = (type: "One" | "Two") => /* GraphQL */ `
  query JoinPageExhibit${type}($preview: Boolean!) {
    joinPageExhibit${type}Collection(order: order_ASC, preview: $preview, limit: 10) {
      items {
        order
        photo {
          url
          description
        }
      }
    }
  }
`;

const ROLE_QUERY = /* GraphQL */ `
  query Roles($preview: Boolean!) {
    roleCollection(order: order_ASC, preview: $preview, limit: 20) {
      items {
        name
        description
        order
        image {
          url
          width
          height
        }
      }
    }
  }
`;

function absolute(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

async function getExhibit(
  type: "One" | "Two",
  preview: boolean,
): Promise<ContributePhoto[] | null> {
  const key = `joinPageExhibit${type}Collection`;
  const data = await contentfulFetchOrNull<
    Record<string, { items: Array<{ photo: Asset } | null> }>
  >({
    query: EXHIBIT_QUERY(type),
    variables: { preview },
    preview,
    tags: [`joinPageExhibit${type}` satisfies ContentTypeId],
  });
  if (!data) return null;
  const photos: ContributePhoto[] = [];
  for (const item of data[key]?.items ?? []) {
    if (!item?.photo?.url) continue;
    photos.push({
      src: absolute(item.photo.url),
      alt: item.photo.description?.trim() ?? "",
    });
  }
  return photos;
}

export const getExhibitOne = (preview = false) => getExhibit("One", preview);
export const getExhibitTwo = (preview = false) => getExhibit("Two", preview);

/**
 * Figma tab -> Contentful role names that can fill it (first match wins).
 * Contentful has no "Admin" role yet, so "Finance" stands in; "Contact Us" is
 * the contact card, not a student role, and is skipped.
 */
const TABS: ReadonlyArray<{ label: string; names: readonly string[] }> = [
  { label: "Development", names: ["Development"] },
  { label: "Design", names: ["Design"] },
  { label: "Events", names: ["Events"] },
  { label: "Marketing", names: ["Marketing"] },
  { label: "Admin", names: ["Admin", "Finance"] },
];

/** Returns `null` when Contentful is unavailable or no role could be mapped. */
export async function getRoles(
  preview = false,
): Promise<ContributeRole[] | null> {
  const data = await contentfulFetchOrNull<{
    roleCollection: {
      items: Array<{
        name: string | null;
        description: string | null;
        image: Asset;
      } | null>;
    };
  }>({
    query: ROLE_QUERY,
    variables: { preview },
    preview,
    tags: ["role" satisfies ContentTypeId],
  });
  if (!data) return null;

  const items = data.roleCollection.items;
  const roles: ContributeRole[] = [];
  for (const tab of TABS) {
    const match = tab.names
      .map((name) => items.find((item) => item?.name === name))
      .find((item) => item?.description);
    if (!match?.description) continue;
    const image = match.image;
    roles.push({
      label: tab.label,
      description: match.description,
      image:
        image?.url && image.width && image.height
          ? {
              src: absolute(image.url),
              width: image.width,
              height: image.height,
            }
          : null,
    });
  }
  return roles.length > 0 ? roles : null;
}
