---
name: ctc-design-system
description: The Code the Change YYC visual language — brand palette, typography, and the signature treatments (white text-stroke headings, sticker shadows, hand-drawn squiggles, solid colour panels) plus the anti-patterns to avoid. Use whenever building or reviewing any UI for this site: a page, section, component, style change, or design review.
---

# Code the Change YYC design system

Full spec: `docs/design-system.md`. This skill is the working summary.

The design direction is **"True to CTC"** — it deliberately honours the real
club's visual DNA rather than defaulting to generic modern-SaaS styling. When in
doubt, choose the flatter, more hand-made option.

## Palette

Use the Tailwind tokens in `src/app/globals.css` (`@theme`); never hardcode
hex in components. Verified against the live Figma file "CTC website Redesign
2026" (fileKey `C7O1lsl8HhZw9q7RxHHcWZ`) — names mirror the Figma variable
names 1:1 so `purple/500` → `--color-purple-500` → `bg-purple-500`.

```
purple/500  #7054FD   signature colour, solid panels, offset shadow
purple/400  #A688FF   secondary purple (was called "lilac")
red/500     #FE4D6E   primary CTA, wordmark, hover accent (was "pinkHot")
red/200     #FFD2DC   soft panel (was "pink")
orange/500  #FE6A55   accent panel
orange/200  #FFD6C2   soft accent panel
orange/900  #841101   dark accent text/detail
green/500   #05D3A8   accent
green/300   #66F4C5   lighter accent
green/200   #B9FBE3   technical-section panel (was "mint")
green/50    #F1FEF8   faint accent tint
grey/800    #292929   body text, borders, dark buttons (was "ink" — was
                       WRONG at #1F1A24, corrected against Figma)
grey/600    #575757   secondary text (was "inkSoft" — was WRONG at
                       #5A4A54, corrected against Figma)
grey/400    #A5A5A5   muted text/disabled
grey/50     #FCFCFC   page background (NOT a warm cream — the old "cream
                       #FBF4EC" / "creamDeep #F5E9DB" tokens don't exist in
                       the current Figma file; dropped)
grey/00     #FFFFFF   pure white (use Tailwind's built-in `white`)
```

## Typography

Headings and wordmark in **Omnes** (`"Omnes", ui-rounded, "Nunito", sans-serif`),
weights 300–800. Headings are heavy (700–800) with tight tracking (`-0.02em`)
and tight leading (~0.98 for hero). Body copy is 16–21px at weight 500.

## The five signature moves

1. **White text-stroke hero headings** — `-webkit-text-stroke: 3px white`
   (2px under 768px). Purple fill. This is the single most recognisable element.
2. **Lowercase italic wordmark** — `code the change yyc`, weight 800, italic,
   lowercase, in `pinkHot`.
3. **Sticker treatment** — `border: 2px solid grey/800` + `drop-shadow(6px 6px
0 purple/500)`. A hard offset shadow with **zero blur**. Used on cards.
   **The nav pill is an intentional exception** — see below.
4. **Hand-drawn squiggles** — SVG underlines under headings, rotated dividers
   between sections (~0.7 opacity), and a pink squiggle that appears under nav
   links on hover.
5. **Solid full-bleed colour panels** — flat blocks alternating down the page
   (grey/50 → purple → grey/50 → mint → pink). Rounded corners, never
   gradients. (Not "cream" — see palette note above.)

Buttons are fully rounded (`border-radius: 999px`). Cards use 16–20px radius.

**Nav pill exception:** `src/components/header.tsx` (from Figma node
`596:1541`) uses a soft blurred shadow — Figma's `elevation/300` token,
three stacked soft drop-shadows (`0 5px 12px rgba(0,0,0,.13), 0 1px 3px
rgba(0,0,0,.1), 0 0 .5px rgba(0,0,0,.15)`) — plus a thin `purple/500` border,
**not** the hard-offset sticker shadow. This was verified directly against
Figma; do not "fix" it to match the sticker cards.

## Do not

Quoted from the design source itself:

> NO gradient text, NO floating blurry blobs, NO ✦ kicker labels, NO "est. 2018"
> pills, NO fake stat triplets, NO tilt-cards, NO sponsor marquees.
> Restraint > AI-bloat.

Also avoid: soft blurred drop-shadows where the sticker shadow belongs (the
nav pill above is the one confirmed exception), and generic Inter/system-font
headings.

## Technical constraints

- Tailwind v4, CSS-first. Tokens go in `@theme` in `src/app/globals.css`.
  **Never create a `tailwind.config.js`.**
- The mockup is a fixed 1400px artboard. Mobile is undesigned — fixed pixel
  widths and multi-column grids need a responsive story invented, not copied.
- Omnes is licensed and not yet in the repo. Until it is, do not add a
  `fonts.cdnfonts.com` import — that is an unlicensed mirror.
