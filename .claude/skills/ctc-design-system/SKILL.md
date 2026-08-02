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

Use the Tailwind tokens once they exist; never hardcode hex in components.

```
cream      #FBF4EC   page background
creamDeep  #F5E9DB   alternate panel
pink       #FFD2DC   soft panel
pinkHot    #FF4D6F   primary CTA, wordmark, hover accent
purple     #7055FD   signature colour, solid panels, offset shadow
lilac      #A689FF   secondary purple
orange     #FF6B54   accent panel
mint       #BAFBE4   technical-section panel
green      #00D3A9   accent
ink        #1F1A24   body text, borders, dark buttons
inkSoft    #5A4A54   secondary text
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
3. **Sticker treatment** — `border: 2px solid ink` + `drop-shadow(6px 6px 0 purple)`.
   A hard offset shadow with **zero blur**. Used on the nav pill and cards.
4. **Hand-drawn squiggles** — SVG underlines under headings, rotated dividers
   between sections (~0.7 opacity), and a pink squiggle that appears under nav
   links on hover.
5. **Solid full-bleed colour panels** — flat blocks alternating down the page
   (cream → purple → cream → mint → pink). Rounded corners, never gradients.

Buttons and the nav bar are fully rounded (`border-radius: 999px`). Cards use
16–20px radius.

## Do not

Quoted from the design source itself:

> NO gradient text, NO floating blurry blobs, NO ✦ kicker labels, NO "est. 2018"
> pills, NO fake stat triplets, NO tilt-cards, NO sponsor marquees.
> Restraint > AI-bloat.

Also avoid: soft blurred drop-shadows where the sticker shadow belongs, and
generic Inter/system-font headings.

## Technical constraints

- Tailwind v4, CSS-first. Tokens go in `@theme` in `src/app/globals.css`.
  **Never create a `tailwind.config.js`.**
- The mockup is a fixed 1400px artboard. Mobile is undesigned — fixed pixel
  widths and multi-column grids need a responsive story invented, not copied.
- Omnes is licensed and not yet in the repo. Until it is, do not add a
  `fonts.cdnfonts.com` import — that is an unlicensed mirror.
