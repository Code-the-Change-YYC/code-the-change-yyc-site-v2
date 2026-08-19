# Design system — "Direction 05 · True to CTC"

Reference spec for the redesign. **Palette and header are implemented** (see
`src/app/globals.css` and `src/components/header.tsx`); most other components
are still scaffolding. This document exists so the design does not have to be
re-derived every time someone builds a component.

Source: Claude artifact `70844804-b824-44e6-8e64-aaf8ea1ca644`, "Code the
Change YYC — Full Site Redesign", cross-checked against the live Figma file
"CTC website Redesign 2026" (fileKey `C7O1lsl8HhZw9q7RxHHcWZ`). Mockup
artboards are a fixed 1400px wide; mobile behaviour is undesigned and will
need to be invented.

## Palette

Verified against Figma's `get_variable_defs` on frame `539:4043` (the full
homepage) — this superseded the mockup's token object, which itself came from
the old site's `tailwind.config.js` and had drifted from the current Figma
file in a few places (noted below). Token names mirror the Figma variable
names 1:1 (`purple/500` → `--color-purple-500`) so future syncs are a
find-replace; the table below adds the old mockup's friendly alias where one
existed.

| Token        | Alias     | Hex       | Role                                                  |
| ------------ | --------- | --------- | ----------------------------------------------------- |
| `purple/500` | `purple`  | `#7054FD` | signature brand colour, solid panels, offset shadow   |
| `purple/400` | `lilac`   | `#A688FF` | secondary purple                                      |
| `red/500`    | `pinkHot` | `#FE4D6E` | primary CTA, wordmark, hover accent                   |
| `red/200`    | `pink`    | `#FFD2DC` | soft panel                                            |
| `orange/500` | `orange`  | `#FE6A55` | accent panel                                          |
| `orange/200` | —         | `#FFD6C2` | soft accent panel                                     |
| `orange/900` | —         | `#841101` | dark accent text/detail                               |
| `green/500`  | `green`   | `#05D3A8` | accent                                                |
| `green/300`  | —         | `#66F4C5` | lighter accent                                        |
| `green/200`  | `mint`    | `#B9FBE3` | technical-section panel                               |
| `green/50`   | —         | `#F1FEF8` | faint accent tint                                     |
| `grey/800`   | `ink`     | `#292929` | body text, borders, dark buttons                      |
| `grey/600`   | `inkSoft` | `#575757` | secondary text                                        |
| `grey/400`   | —         | `#A5A5A5` | muted text/disabled                                   |
| `grey/50`    | —         | `#FCFCFC` | page background                                       |
| `grey/00`    | —         | `#FFFFFF` | pure white surfaces (use Tailwind's built-in `white`) |

Corrections from the previous version of this doc, found by comparing against
the live Figma file rather than the (older, drifted) mockup artifact:

- **`purple/500` was `#7055FD`, is actually `#7054FD`** — a one-digit typo.
- **`ink` / `inkSoft` were `#1F1A24` / `#5A4A54`, are actually `#292929` /
  `#575757`** (Figma `grey/800` / `grey/600`) — these had drifted noticeably,
  not just a rounding difference.
- **There is no cream/creamDeep background in the current Figma file.** The
  previous `cream #FBF4EC` / `creamDeep #F5E9DB` tokens do not appear as
  Figma variables, and pixel-sampling an actual homepage screenshot shows the
  real page background is near-white (`grey/50 #FCFCFC`), not a warm cream.
  They've been dropped rather than kept as unused aliases — reintroduce them
  only if a specific frame is found that actually uses a cream fill.

Only the tokens actually in use are defined in `src/app/globals.css` today
(everything above except `grey/00`, which just uses Tailwind's built-in
`white`) — extend the `@theme` block there as components need more of the
scale. Tokens go in a plain `@theme` block (literal values, not `inline`);
the `--font-omnes` variable is the one exception that lives in `@theme
inline` (see Typography below).

## Typography

- **Omnes** — the brand face, used for the wordmark and all headings. Licensed;
  see CLAUDE.md. Weights in use: 300, 400, 500, 600, 700, 800.
- **Nunito** — the mockup's declared fallback in the same stack.
- **Caveat** — handwriting accent.
- `ui-monospace` — small utility labels (e.g. video timestamp).

Heading stack: `"Omnes", ui-rounded, "Nunito", sans-serif`.

Observed scale: hero `clamp(56px, 7vw, 104px)` / weight 800 / line-height 0.98 /
letter-spacing `-0.02em`. Inner-page H1 `clamp(48px, 6vw, 76px)` / 800.
Card H3 23px / 700 / 1.15. Body 16–21px / 500 / ~1.55. Nav links 15px / 700.
Buttons 14–16px / 700.

## Signature moves

These are what make it read as Code the Change rather than generic. Preserve
them.

**White text-stroke on hero headings** — the old site's signature.

```css
-webkit-text-stroke: 3px white; /* 2px below 768px */
```

**Lowercase italic wordmark** — `code the change yyc`, weight 800, italic,
`text-transform: lowercase`, in `pinkHot`.

**Sticker treatment** — thick ink border plus a hard, offset, coloured shadow.
No blur.

```css
border: 2px solid #292929; /* grey/800 */
filter: drop-shadow(6px 6px 0 #7054fd); /* purple/500 */
```

**Hand-drawn squiggles** — SVG underlines beneath headings and as section
dividers, often rotated and at ~0.7 opacity. Also the nav hover state: a pink
squiggle appears under the hovered link.

**Solid full-bleed colour panels** — sections are flat blocks of colour that
alternate down the page (light → purple → light → mint → pink → …), where
"light" is `grey/50` (near-white), not the cream tone the mockup used — see
the palette correction above. Not gradients.

**Nav** — white pill, `border-radius: 999px`, sticky at `top: 16px`, thin
`purple/500` border, dark pill CTA on the right.

> **Exception to the sticker treatment above:** the actual header/nav
> component (`src/components/header.tsx`, from Figma node `596:1541`) does
> **not** use the hard offset sticker shadow. It uses a soft blurred shadow
> instead — Figma's `elevation/300` token, three stacked soft drop-shadows,
> roughly `0 5px 12px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.1), 0 0 0.5px
rgba(0,0,0,0.15)` — plus the thin purple-500 border. This is deliberate,
> confirmed directly against the Figma file, not a bug to "fix" to match the
> sticker cards.

## Explicitly avoid

Quoted from the mockup source, which lists these as anti-patterns:

> NO gradient text, NO floating blurry blobs, NO ✦ kicker labels, NO "est. 2018"
> pills, NO fake stat triplets, NO tilt-cards, NO sponsor marquees.
> Restraint > AI-bloat.

## Pages

Homepage section stack: Intro animation → Nav → Hero (video reel) → Mission
(solid purple panel) → Pillars → Projects strip → Events → Roles → Sponsors →
Footer.

Inner pages, all sharing nav + footer: About (Who We Are), Projects, Events,
Our Team, Join, News, Contact.

## Content the design assumes

The mockup hardcodes data that must come from Contentful. Shapes:

- **Projects** (8 items) — `{ name, desc, tags[] }`. Note `tags` has no
  equivalent field on the existing `externalProject` content type; the model
  needs extending.
- **Roles** (5 items) — `{ name, desc }`. Development, Design, Marketing,
  Events, Finance. The old site's homepage hardcoded only four (no Finance).
- **FAQs** (5 items) — `{ q, a }` → maps to the existing `faq` type
  (`prompt` / `content`).
- **Hackathons** (3 items) — `{ year, topic, blurb }` → maps to `hackathon`.

Existing content types in space `963e09izo0py` are listed in
`src/lib/contentful/tags.ts`. Known gap: sponsors are currently hardcoded in
the old repo's `data/sponsors.js` (with hand-measured aspect-ratio multipliers)
and are the strongest candidate to move into Contentful.
