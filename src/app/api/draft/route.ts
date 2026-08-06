import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * Enables Next draft mode so pages fetch unpublished entries from Contentful's
 * Preview API.
 *
 * Set as the Contentful preview URL (Settings → Content preview):
 *   https://<site>/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&redirect=/projects
 */

function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Only same-origin, non-protocol-relative paths. Without this, `redirect`
 * would happily send visitors to an attacker's host — the classic open
 * redirect on this endpoint.
 */
function safeRedirectPath(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}

export async function GET(request: NextRequest) {
  const expected = process.env.CONTENTFUL_PREVIEW_SECRET;
  if (!expected) {
    console.error("CONTENTFUL_PREVIEW_SECRET is not configured.");
    return new Response("Not configured", { status: 500 });
  }

  const { searchParams } = request.nextUrl;

  if (!secretMatches(searchParams.get("secret"), expected)) {
    return new Response("Invalid token", { status: 401 });
  }

  // TODO(contentful): once real queries exist, look the entry up with the
  // preview client and redirect to its resolved slug, so a preview URL for a
  // deleted or non-existent entry 401s instead of landing on a 404.
  const target = safeRedirectPath(searchParams.get("redirect"));

  const draft = await draftMode(); // async since Next 15
  draft.enable();

  redirect(target);
}
