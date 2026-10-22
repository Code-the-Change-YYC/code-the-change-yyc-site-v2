import Link from "next/link";

import {
  CONTACT_LINKS,
  NAV_LINKS,
  SOCIAL_LINKS,
  type SiteLink,
} from "@/lib/links";

/**
 * Site footer.
 *
 * Sourced from Figma file "CTC website Redesign 2026"
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - node 460:4471 (1280x450) — desktop.
 *  - node 603:3372 (400x808) — small / mobile.
 *  - in context: node 602:2163 inside home 539:4043.
 *
 * The panel is full-bleed (no outer margin) and flush with the bottom edge:
 * only the top corners are rounded (radius/7 = 32px = rounded-4xl).
 * Spacing maps to the default Tailwind scale (Figma spacing/8 = 32px = 8,
 * spacing/6 = 24px = 6, spacing/4 = 16px = 4).
 */

const TITLE_CLASS = "font-omnes text-base/6 font-semibold text-white";
const LINK_CLASS =
  "font-omnes text-base/6 font-normal text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function isExternal(href: string) {
  return href.startsWith("http");
}

function FooterLink({ link }: { link: SiteLink }) {
  if (isExternal(link.href)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {link.label}
      </a>
    );
  }
  // mailto: and internal routes open in the same tab.
  return link.href.startsWith("mailto:") ? (
    <a href={link.href} className={LINK_CLASS}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={LINK_CLASS}>
      {link.label}
    </Link>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: readonly SiteLink[];
}) {
  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className={TITLE_CLASS}>{title}</h2>
      <ul className="flex flex-col items-start gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rounded-t-4xl bg-purple-500 px-6 pt-6 pb-8 md:px-12 md:pt-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
          {/* Logo (Figma frame is 398:228; PNG is cropped to that ratio). */}
          {/*
            eslint-disable-next-line @next/next/no-img-element -- static brand
            asset served from /public; same rationale as src/components/header.tsx.
            Figma stores this logo as a raster fill, so it is a PNG, not an SVG.
          */}
          <img
            src="/brand/logo-full-white.png"
            alt="Code the Change YYC"
            width={903}
            height={517}
            className="h-auto w-full self-start"
          />

          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-6 self-start md:grid-cols-3 md:gap-x-12"
          >
            <FooterGroup title="Navigation" links={NAV_LINKS} />
            <FooterGroup title="Contact us" links={CONTACT_LINKS} />
            <FooterGroup title="Socials" links={SOCIAL_LINKS} />
          </nav>
        </div>

        <hr className="h-0.5 border-0 bg-purple-400" />

        <p className="font-omnes text-base/6 font-normal text-white">
          © {year} Code the Change YYC
        </p>
      </div>
    </footer>
  );
}
