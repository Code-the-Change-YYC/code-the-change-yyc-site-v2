"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { NAV_LINKS } from "@/lib/links";

/**
 * Site header / primary nav.
 *
 * Sourced from Figma file "CTC website Redesign 2026"
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - node 596:1541, "width=Default" (647x64) — full pill w/ inline links.
 *  - node 603:3159, "width=small" (239x64) — collapsed logo + Menu button.
 *
 * The pill uses a soft blurred shadow (Figma's `elevation/300` token, i.e.
 * `shadow-elevation-300`) plus a thin purple-500 border, NOT the hard
 * offset "sticker" shadow used elsewhere in the design system (see
 * docs/design-system.md "Signature moves" for that exception, called out
 * explicitly so it doesn't get "fixed" later to match the sticker cards).
 */

// elevation/300 is the `shadow-elevation-300` token in globals.css.
const PILL_CHROME = "border-2 border-purple-500 bg-white shadow-elevation-300";

// Figma "button - text" (362:182): px-4 py-2.5, title-medium. The current
// page gets a subtle purple tint + purple-800 text (AA on the tint).
const NAV_LINK_BASE =
  "rounded-full px-4 py-2.5 font-omnes text-title-medium font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 motion-reduce:transition-none";
const NAV_LINK_IDLE = `${NAV_LINK_BASE} text-grey-800 hover:bg-grey-50`;
const NAV_LINK_ACTIVE = `${NAV_LINK_BASE} bg-purple-500/10 text-purple-800`;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      {/* Default width nav (Figma node 596:1541) — md and up. */}
      <nav
        aria-label="Primary"
        className={`hidden items-center gap-12 rounded-full px-4 py-2 md:flex ${PILL_CHROME}`}
      >
        <Logo />
        <ul className="flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
                className={
                  isActive(pathname, link.href)
                    ? NAV_LINK_ACTIVE
                    : NAV_LINK_IDLE
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Small width nav (Figma node 603:3159) — below md. */}
      <nav
        aria-label="Primary"
        className="w-full max-w-sm md:hidden"
        onKeyDown={(e) => {
          if (e.key === "Escape") setMenuOpen(false);
        }}
      >
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
            className={NAV_LINK_IDLE}
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
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                  className={`block ${isActive(pathname, link.href) ? NAV_LINK_ACTIVE : NAV_LINK_IDLE}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
