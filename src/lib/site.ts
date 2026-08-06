/**
 * Canonical origin for the site, used by metadataBase, sitemap, and robots.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL (host only, no protocol) on every
 * deployment, so preview builds resolve absolute URLs correctly without extra
 * configuration.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
