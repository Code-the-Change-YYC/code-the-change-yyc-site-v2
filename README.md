# Code the Change YYC — website v2

Rebuild of [codethechangeyyc.ca](https://codethechangeyyc.ca).

**Status: scaffolding.** The project is set up and building, but every page is
an unstyled stub — the redesign has not been implemented yet.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Contentful (GraphQL) · pnpm · deployed on Vercel.

## Getting started

You need **Node 20.9+** and **pnpm**. If you don't have pnpm:

```bash
corepack enable    # or: brew install pnpm
```

Then:

```bash
pnpm install
cp .env.example .env.local   # fill in the Contentful tokens
pnpm dev
```

Open <http://localhost:3000>.

Contentful credentials are in **Contentful → Settings → API keys**. Ask a lead
for access. The site builds without them, but any page that queries Contentful
will throw until they are set.

## Commands

|                  |                  |
| ---------------- | ---------------- |
| `pnpm dev`       | dev server       |
| `pnpm build`     | production build |
| `pnpm lint`      | ESLint           |
| `pnpm typecheck` | `tsc --noEmit`   |
| `pnpm format`    | Prettier         |

CI runs lint, format check, typecheck, and build on every pull request.

## Project layout

```
src/app/                    routes — one directory per page
src/app/api/                draft mode + Contentful revalidation webhook
src/lib/contentful/         GraphQL transport and cache tags
docs/design-system.md       the redesign spec
CLAUDE.md                   conventions and gotchas — read this first
```

## Before you contribute

Read **[CLAUDE.md](./CLAUDE.md)**. It covers a handful of rules where the
habitual approach is wrong for this stack — Tailwind v4 has no JS config,
`fetch` is uncached by default in Next 16, `revalidateTag` needs two arguments,
and `next lint` no longer exists.

For UI work, also read **[docs/design-system.md](./docs/design-system.md)**.
