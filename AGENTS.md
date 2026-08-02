# Agent instructions

All project conventions live in **[CLAUDE.md](./CLAUDE.md)**. Read it before
making changes — it documents several rules where the obvious/habitual approach
is wrong for this stack (Tailwind v4 has no JS config, `fetch` is uncached by
default, `revalidateTag` needs two arguments, `next lint` no longer exists).

Design language for any UI work: **[docs/design-system.md](./docs/design-system.md)**.

Quick gate before you call work done:

```bash
pnpm lint && pnpm typecheck && pnpm build
```
