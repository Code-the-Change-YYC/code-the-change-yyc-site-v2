# Code the Change YYC — site v2

Rebuild of [codethechangeyyc.ca](https://codethechangeyyc.ca). The old site ([`code-the-change-yyc-site`](https://github.com/Code-the-Change-YYC/code-the-change-yyc-site)) is Pages Router / JavaScript / Tailwind 3 / `contentful` SDK and stays live — nothing here should be copied from it without checking against the rules below. **Current state: scaffolding only** — every route is an unstyled stub and the visual design has not been implemented yet.

## Stack

|                 |                                                |
| --------------- | ---------------------------------------------- |
| Next.js         | 16.2.12, App Router, Turbopack, `src/` dir     |
| React           | 19.2.4                                         |
| TypeScript      | 5.9.3 (`^5`) — see the pin note below          |
| Tailwind CSS    | 4.3.3, CSS-first config                        |
| CMS             | Contentful, GraphQL Content API over `fetch`   |
| Package manager | **pnpm 10.19.0** — pinned via `packageManager` |
| Deploy target   | Vercel                                         |

## Rules that are easy to get wrong

These are the ones where a plausible-looking change silently breaks something, or where habits from Next 13/14 and Tailwind v3 produce wrong code. Most were verified against the installed packages, not from memory.

### `fetch` is NOT cached by default

The Next 13/14 default flipped in Next 15. An un-annotated `fetch` hits the network on every request. Every Contentful call must go through `contentfulFetch` in `src/lib/contentful/fetch.ts`, which sets `cache: "force-cache"` explicitly. Do not add bare `fetch` calls to Contentful.

### `revalidateTag` takes two arguments

```ts
revalidateTag("faq", "max"); // correct
revalidateTag("faq"); // does not typecheck in Next 16
```

The signature is `revalidateTag(tag: string, profile: string | CacheLifeConfig)` and the profile is **required**. Use `"max"` — it gives stale-while-revalidate, so visitors keep getting cached content while the refresh happens in the background.

### Never create `tailwind.config.js`

Tailwind v4 is CSS-first. Theme tokens go in `@theme` blocks in `src/app/globals.css`. There is no `content: []` array (v4 auto-detects sources) and no `autoprefixer` (Lightning CSS handles prefixing). If you find yourself reaching for a JS config, you are following a v3 tutorial.

Use plain `@theme` for literal values (colors, breakpoints) and `@theme inline` for anything referencing another CSS variable — notably `next/font` variables, which are defined on `<html>` while non-inline `@theme` emits at `:root`, causing fallback-resolution bugs.

### Lint is `eslint .`, not `next lint`

`next lint` was removed in Next 16. Use `pnpm lint`.

### Request APIs are async

`draftMode()`, `cookies()`, `headers()`, and route `params` / `searchParams` are all Promises now. `const { slug } = await params;`

### Contentful tokens are server-only

No `NEXT_PUBLIC_` prefix on any Contentful variable. The old site shipped its delivery token to every browser as `NEXT_PUBLIC_ACCESS_TOKEN` and fetched team data client-side; do not reproduce that. Anything touching a token belongs in a Server Component or route handler, and `src/lib/contentful/fetch.ts` starts with `import "server-only"` to enforce it.

### Do not enable `cacheComponents` / `use cache`

It is out of `experimental.*` in Next 16 but still opt-in, and it switches the whole app to dynamic-by-default + PPR. We are deliberately on the documented `revalidate` + tagged-`fetch` model. Changing this is a project-level decision, not an implementation detail.

### `images.remotePatterns`, not `images.domains`

`domains` is deprecated. Do not set `search` on the Contentful pattern — Contentful serves transforms via query string and pinning `search` rejects every resized image.

### TypeScript stays on `^5`

`typescript@latest` is currently **7.0.2**, but `typescript-eslint` peers `>=4.8.4 <6.1.0` and `eslint-config-next` depends on it. TS 7 is the Go port and ships no stable programmatic API; typescript-eslint closed TS 7 support as _not planned_ (targeted for 7.1). Do not run `pnpm up typescript --latest`.

### pnpm build scripts

`sharp` and `unrs-resolver` need to run install scripts, which pnpm blocks by default. They are allow-listed in `pnpm.onlyBuiltDependencies` in `package.json`. If you see "Ignored build scripts", run `pnpm rebuild`.

## Layout

```
src/app/                    routes (one dir per page, all unstyled stubs)
src/app/api/draft/          enable Contentful draft mode
src/app/api/disable-draft/  exit draft mode
src/app/api/revalidate/     Contentful webhook → revalidateTag
src/lib/contentful/fetch.ts GraphQL transport — the only way to talk to Contentful
src/lib/contentful/tags.ts  cache tags + content type IDs
src/lib/site.ts             canonical origin for metadata/sitemap/robots
docs/design-system.md       the redesign spec (not yet implemented)
```

## Commands

```bash
pnpm dev           # dev server
pnpm build         # production build
pnpm lint          # eslint .
pnpm typecheck     # tsc --noEmit
pnpm format        # prettier --write .
```

## Not done yet

- **Brand font.** Omnes is licensed but not sourced yet — don't pull it from `fonts.cdnfonts.com` like the old site. Once `.woff2` files exist, load via `next/font/local` in `src/lib/fonts.ts`.
- **Design tokens and components.** Not implemented — see `docs/design-system.md`.
- **Contentful queries.** Only the transport exists; no content types are bound to pages yet.
- **Brand assets.** Old repo's SVGs are unoptimized and need renaming + SVGO before reuse.

## Deployment
Hosted on **Vercel** via the GitHub integration; no deploy workflow lives in this repo. A Vercel project exists, but its first build failed for project-config reasons (not this code), so auto-deploy is off via `vercel.json` (`{ "git": { "deploymentEnabled": false } }`). To re-enable: confirm the dashboard build settings (Framework: Next.js, Node 22.x, Root Directory: repo root), then delete `vercel.json` or set `deploymentEnabled: true`.
