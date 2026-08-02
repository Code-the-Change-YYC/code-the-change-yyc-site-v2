/**
 * Cache tags for on-demand revalidation.
 *
 * Pass these to `contentfulFetch({ tags })`, and /api/revalidate purges them
 * when Contentful fires a webhook. The tag name matches the Contentful
 * content type ID so the webhook can map a payload to a tag with no lookup
 * table to keep in sync.
 *
 * Content type IDs carried over from the existing space (963e09izo0py).
 */
export const CONTENT_TYPES = [
  "upcomingEvents",
  "pastEvents",
  "role",
  "joinPageExhibitOne",
  "joinPageExhibitTwo",
  "alumni",
  "timeline",
  "faq",
  "eventImage",
  "externalProject",
  "hackathon",
  "adminTeamMember",
  "technicalTeam",
  "project",
] as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[number];

/** Purged on every webhook, for queries that span multiple content types. */
export const ALL_CONTENT_TAG = "contentful";

export function isKnownContentType(id: string): id is ContentTypeId {
  return (CONTENT_TYPES as readonly string[]).includes(id);
}
