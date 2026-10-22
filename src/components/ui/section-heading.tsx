import type { ReactNode } from "react";

/**
 * Section heading with the hand-drawn brush underline used across pages
 * (Students, Organizations, Projects, Hack the Change, ...).
 *
 * Every Figma underline (e.g. 541:6780, 550:7113, 553:8689) is the same
 * two-stroke brush at 150x23; only the colour differs. Files live in
 * `public/brand/decor/`. The underline is decorative (alt="").
 *
 * Usage:
 *   <SectionHeading underline="green">Students</SectionHeading>
 *   <SectionHeading as="h1" size="display" align="left" underline="red">
 *     Hack the Change
 *   </SectionHeading>
 *
 * Server component. Text colour is inherited — set it via `className`.
 */

export type Underline = "green" | "mint" | "orange" | "red";

const SRC: Record<Underline, string> = {
  green: "/brand/decor/brush-green.svg", // green/500 — Students, Projects
  mint: "/brand/decor/brush-mint.svg", // green/200 — Contribute title
  orange: "/brand/decor/brush-orange.svg", // orange/500 — Organizations
  red: "/brand/decor/brush-red.svg", // red/500 — Hack the Change
};

const SIZE = {
  display: "text-display-small font-semibold",
  headline: "text-headline-large font-semibold",
} as const;

export function SectionHeading({
  as: Tag = "h2",
  underline,
  align = "center",
  size = "headline",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  underline?: Underline;
  align?: "center" | "left";
  size?: keyof typeof SIZE;
  className?: string;
  children: ReactNode;
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Tag
      className={`font-omnes flex flex-col ${alignment} ${SIZE[size]} ${className ?? ""}`}
    >
      <span>{children}</span>
      {underline && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative static SVG from /public (see header.tsx)
        <img
          src={SRC[underline]}
          alt=""
          aria-hidden="true"
          width={150}
          height={23}
          className="-mt-2 h-auto w-32 max-w-full"
        />
      )}
    </Tag>
  );
}
