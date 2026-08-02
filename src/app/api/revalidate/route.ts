import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { ALL_CONTENT_TAG, isKnownContentType } from "@/lib/contentful/tags";

/**
 * Contentful webhook receiver.
 *
 * Configure in Contentful → Settings → Webhooks:
 *   POST https://<site>/api/revalidate
 *   Triggers: Entry publish / unpublish / delete
 *   Custom header: x-contentful-webhook-secret: <CONTENTFUL_REVALIDATE_SECRET>
 *
 * The old site's equivalent read its secret from the query string, ignored the
 * webhook body entirely, and hardcoded revalidation of only /events and
 * /who-we-are — so /join and /projects stayed stale until someone redeployed.
 * This version reads the secret from a header and derives the tag from the
 * payload's content type.
 */

const SECRET_HEADER = "x-contentful-webhook-secret";

function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so guard first. Length is not
  // itself sensitive here.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

type WebhookPayload = {
  sys?: {
    contentType?: { sys?: { id?: string } };
  };
};

export async function POST(request: NextRequest) {
  const expected = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!expected) {
    console.error("CONTENTFUL_REVALIDATE_SECRET is not configured.");
    return NextResponse.json({ message: "Not configured" }, { status: 500 });
  }

  if (!secretMatches(request.headers.get(SECRET_HEADER), expected)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let contentTypeId: string | undefined;
  try {
    const payload = (await request.json()) as WebhookPayload;
    contentTypeId = payload.sys?.contentType?.sys?.id;
  } catch {
    // A webhook with no/!JSON body still gets a broad purge below.
  }

  const revalidated: string[] = [];

  // The second argument is REQUIRED in Next 16 — revalidateTag(tag) alone does
  // not typecheck. "max" gives stale-while-revalidate, so visitors keep getting
  // cached content instantly while the refresh happens in the background.
  revalidateTag(ALL_CONTENT_TAG, "max");
  revalidated.push(ALL_CONTENT_TAG);

  if (contentTypeId && isKnownContentType(contentTypeId)) {
    revalidateTag(contentTypeId, "max");
    revalidated.push(contentTypeId);
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
