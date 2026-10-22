/**
 * Single source of truth for site links, shared by the header and footer.
 * Social URLs verified against the live site (SocialMediaIcons.jsx).
 */

export type SiteLink = { readonly label: string; readonly href: string };

export const NAV_LINKS = [
  { label: "About", href: "/who-we-are" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Contribute", href: "/join" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly SiteLink[];

export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:codethechangeyyc@gmail.com" },
] as const satisfies readonly SiteLink[];

// Figma footer (node 460:4471) lists Instagram and LinkedIn only.
export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/codethechangeyyc/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/code-the-change-yyc/",
  },
] as const satisfies readonly SiteLink[];
