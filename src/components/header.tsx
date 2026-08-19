"use client";

import Link from "next/link";
import { useId, useState } from "react";

/**
 * Site header / primary nav.
 *
 * Sourced from Figma file "CTC website Redesign 2026"
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - node 596:1541, "width=Default" (647x64) — full pill w/ inline links.
 *  - node 603:3159, "width=small" (239x64) — collapsed logo + Menu button.
 *
 * The pill uses a soft blurred shadow (Figma's `elevation/300` token: three
 * stacked soft drop-shadows) plus a thin purple-500 border, NOT the hard
 * offset "sticker" shadow used elsewhere in the design system (see
 * docs/design-system.md "Signature moves" for that exception, called out
 * explicitly so it doesn't get "fixed" later to match the sticker cards).
 */

const NAV_LINKS = [
  { label: "About", href: "/who-we-are" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Contribute", href: "/join" },
  { label: "Contact", href: "/contact" },
] as const;

// elevation/300 (Figma variable): three stacked soft drop-shadows.
const ELEVATION_300 =
  "drop-shadow-[0px_0px_0.5px_rgba(0,0,0,0.15)] drop-shadow-[0px_1px_3px_rgba(0,0,0,0.1)] drop-shadow-[0px_5px_12px_rgba(0,0,0,0.13)]";

const PILL_CHROME = `border-2 border-purple-500 bg-white ${ELEVATION_300}`;

const NAV_LINK_CLASS =
  "rounded-full px-4 py-2.5 font-omnes text-base font-medium whitespace-nowrap text-grey-800 transition-colors hover:bg-grey-50";

function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="Code the Change YYC — home"
    >
      {/*
        eslint-disable-next-line @next/next/no-img-element -- static brand
        SVGs served from /public; routing them through next/image's
        optimizer would require `images.dangerouslyAllowSVG` in
        next.config.ts, which is a project-level security decision out of
        scope for this component.
      */}
      <img
        src="/brand/mark.svg"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
      <img
        src="/brand/wordmark.svg"
        alt="code the change YYC"
        width={28}
        height={18}
        className="h-[18px] w-auto"
      />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelId = useId();

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      {/* Default width nav (Figma node 596:1541) — md and up. */}
      <nav
        aria-label="Primary"
        className={`hidden items-center gap-12 rounded-full px-4 py-2 md:flex ${PILL_CHROME}`}
      >
        <Logo />
        <ul className="flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={NAV_LINK_CLASS}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Small width nav (Figma node 603:3159) — below md. */}
      <div className="w-full max-w-sm md:hidden">
        <div
          className={`flex items-center justify-between gap-12 rounded-full px-4 py-2 ${PILL_CHROME}`}
        >
          <Logo />
          {/*
            NOTE(design): Figma only designs the *collapsed* small-width pill
            (node 603:3159, logo + "Menu" label) — there is no expanded/open
            state anywhere in this file (checked the full metadata tree under
            0:1). The disclosure below is our own invention to keep the
            mobile nav usable and accessible; revisit the visual design once
            Figma has an actual open state.
          */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            onClick={() => setMenuOpen((open) => !open)}
            className={NAV_LINK_CLASS}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <ul
            id={menuPanelId}
            className={`mt-2 flex flex-col gap-1 rounded-3xl p-2 ${PILL_CHROME}`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block ${NAV_LINK_CLASS}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
