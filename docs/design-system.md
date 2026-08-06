# Design system — "Direction 05 · True to CTC"

Reference spec for the redesign. **Nothing here is implemented yet** — the repo
is scaffolding only. This document exists so the design does not have to be
re-derived from the mockup every time someone builds a component.

Source: Claude artifact `70844804-b824-44e6-8e64-aaf8ea1ca644`, "Code the
Change YYC — Full Site Redesign". Mockup artboards are a fixed 1400px wide;
mobile behaviour is undesigned and will need to be invented.

## Palette

Taken verbatim from the mockup's token object, which itself came from the old
site's `tailwind.config.js`.

| Token       | Hex       | Role                                                |
| ----------- | --------- | --------------------------------------------------- |
| `cream`     | `#FBF4EC` | page background                                     |
| `creamDeep` | `#F5E9DB` | alternate panel                                     |
| `pink`      | `#FFD2DC` | soft panel                                          |
| `pinkHot`   | `#FF4D6F` | primary CTA, wordmark, hover accent                 |
| `purple`    | `#7055FD` | signature brand colour, solid panels, offset shadow |
| `lilac`     | `#A689FF` | secondary purple                                    |
| `orange`    | `#FF6B54` | accent panel                                        |
| `mint`      | `#BAFBE4` | technical-section panel                             |
| `green`     | `#00D3A9` | accent                                              |
| `ink`       | `#1F1A24` | body text, borders, dark buttons                    |
| `inkSoft`   | `#5A4A54` | secondary text                                      |

When these become Tailwind tokens they go in a plain `@theme` block (literal
values, not `inline`) in `src/app/globals.css`.

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
border: 2px solid #1f1a24;
filter: drop-shadow(6px 6px 0 #7055fd);
```

**Hand-drawn squiggles** — SVG underlines beneath headings and as section
dividers, often rotated and at ~0.7 opacity. Also the nav hover state: a pink
squiggle appears under the hovered link.

**Solid full-bleed colour panels** — sections are flat blocks of colour that
alternate down the page (cream → purple → cream → mint → pink → …). Not
gradients.

**Nav** — white pill, `border-radius: 999px`, sticky at `top: 16px`, 2px ink
border, `drop-shadow(6px 6px 0 purple)`, dark pill CTA on the right.

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
