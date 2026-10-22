# Deployment (Vercel)

Checklist for whoever owns the team's Vercel project. Git-triggered deploys
are currently off via `vercel.json` (`git.deploymentEnabled: false`) because
the project's first build failed for dashboard-config reasons. Work through
the steps below, then turn git deploys back on (step 5).

## 1. Build settings (Project → Settings → Build & Deployment)

| Setting          | Value                                           |
| ---------------- | ----------------------------------------------- |
| Framework preset | Next.js                                         |
| Root directory   | repo root (leave blank)                         |
| Install command  | default — Vercel reads `packageManager` (pnpm)  |
| Build command    | default (`next build`)                          |
| Node.js version  | 22.x (CI runs 22; `engines.node` is `>=20.9.0`) |

## 2. Environment variables (Project → Settings → Environment Variables)

Set these for **Production** and **Preview**. None of them may have a
`NEXT_PUBLIC_` prefix except the site URL — Contentful tokens are server-only
(see CLAUDE.md).

| Variable                          | Value / where to get it                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`             | `963e09izo0py`                                                                                                                   |
| `CONTENTFUL_ENVIRONMENT`          | `master`                                                                                                                         |
| `CONTENTFUL_ACCESS_TOKEN`         | Contentful → Settings → API keys → Content Delivery API token                                                                    |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Same API key → Content Preview API token                                                                                         |
| `CONTENTFUL_PREVIEW_SECRET`       | Generate: `openssl rand -hex 32`                                                                                                 |
| `CONTENTFUL_REVALIDATE_SECRET`    | Generate: `openssl rand -hex 32` (different value)                                                                               |
| `NEXT_PUBLIC_SITE_URL`            | Production: `https://codethechangeyyc.ca`. Optional on Preview — it falls back to `VERCEL_PROJECT_PRODUCTION_URL` automatically. |

The build prerenders pages from Contentful, but every section fails soft
(`contentfulFetchOrNull`), so a missing token produces empty sections rather
than a failed build — check the env vars first if a deploy looks empty.

## 3. Contentful webhook (on-demand revalidation)

Contentful → Settings → Webhooks → Add webhook:

- **URL:** `POST https://<production-domain>/api/revalidate`
- **Triggers:** Entry → Publish, Unpublish, Delete (Assets too, if images
  should refresh immediately)
- **Headers:** custom header `x-contentful-webhook-secret: <CONTENTFUL_REVALIDATE_SECRET>`
- Payload: default.

The route purges the `contentful` tag plus the tag matching the entry's
content type ID (`src/lib/contentful/tags.ts`). Pages also revalidate on
their own (the events page hourly), so a missed webhook only delays updates.

## 4. Contentful preview (draft mode)

Contentful → Settings → Content preview → add a preview platform for each
content type that has a page, URL:

```
https://<domain>/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&redirect=/events
```

(`redirect` must be a same-origin path, e.g. `/projects`, `/who-we-are`,
`/join`.) Visit `/api/disable-draft` to exit draft mode.

## 5. Turn git deploys back on

After steps 1–4, delete `vercel.json` (it only contains
`git.deploymentEnabled: false`) in a PR and merge it. Every PR then gets a
preview URL and `main` deploys to production.

Before pointing `codethechangeyyc.ca` at this project, make sure the old site
(`code-the-change-yyc-site`) is no longer needed — both can run side by side
on different domains until the switch.

## Personal previews (no team access)

Anyone can deploy a throwaway preview from their own Vercel account with the
CLI — CLI deploys ignore `git.deploymentEnabled`:

```bash
vercel link            # create/link a project under your personal scope
vercel env add CONTENTFUL_SPACE_ID preview
vercel env add CONTENTFUL_ENVIRONMENT preview
vercel env add CONTENTFUL_ACCESS_TOKEN preview   # Delivery token only
vercel deploy          # prints the preview URL
```

Only add the read-only Delivery token to personal projects. `.vercel/` is
gitignored — don't commit it.
