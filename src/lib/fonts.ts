import localFont from "next/font/local";

/**
 * Omnes — the brand typeface (Darden Studio, licensed by Code the Change YYC).
 *
 * Self-hosted via next/font/local so it's preloaded, hashed, and served from
 * our own origin (never fonts.cdnfonts.com like the old site). The .woff2
 * files are Latin subsets generated with fontTools `pyftsubset` from the
 * licensed .ttf files.
 *
 * Figma uses four weights (Regular 400, Medium 500, SemiBold 600, Bold 700),
 * but only Medium and Bold are sourced so far. The browser falls back to the
 * nearest available weight — 400 renders as Medium, 600 as Bold — so
 * `font-normal` / `font-semibold` call sites keep working and will pick up
 * the real faces as soon as these files are added to `src` below:
 *   src/assets/fonts/omnes-regular.woff2  (weight "400")
 *   src/assets/fonts/omnes-semibold.woff2 (weight "600")
 *
 * `variable` exposes the generated family as a CSS variable on <html>;
 * globals.css consumes it from `@theme inline` (see CLAUDE.md for why it must
 * be `inline`).
 */
export const omnes = localFont({
  src: [
    {
      path: "../assets/fonts/omnes-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/omnes-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-omnes-face",
  display: "swap",
});
