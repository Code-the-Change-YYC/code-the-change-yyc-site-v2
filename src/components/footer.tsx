import Link from "next/link";

import { CONTACT_LINKS, NAV_LINKS, SOCIAL_LINKS } from "@/lib/social";

type FooterLink = { label: string; href: string };

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <p className="font-omnes text-sm font-bold text-white">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-omnes text-sm font-medium text-white transition-colors hover:text-white/80"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-7xl rounded-3xl bg-purple-500 px-6 py-10 md:px-12 md:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/*
              eslint-disable-next-line @next/next/no-img-element -- static brand
              SVG; same rationale as src/components/header.tsx Logo.
            */}
            <img
              src="/brand/FullLogo_FullWhite 1.svg"
              alt="Code the Change YYC"
              className="h-22 w-auto md:h-45"
            />
          </div>

          {/* Three columns */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <FooterColumn title="Navigation" links={NAV_LINKS} />
            <FooterColumn title="Contact us" links={CONTACT_LINKS} />
            <FooterColumn title="Socials" links={SOCIAL_LINKS} />
          </div>
        </div>

        <hr className="my-8 border-0 border-t border-white/20 md:my-10" />

        <p className="font-omnes text-sm font-medium text-white/80">
          © {year} Code the Change YYC
        </p>
      </div>
    </footer>
  );
}
