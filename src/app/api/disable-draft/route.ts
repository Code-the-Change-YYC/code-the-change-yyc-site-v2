import { draftMode } from "next/headers";

/**
 * Exits draft mode.
 *
 * If you link here with <Link>, pass prefetch={false} — otherwise Next
 * prefetches the route and silently clears the draft cookie while the editor
 * is still browsing.
 */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  return new Response("Draft mode disabled.");
}
