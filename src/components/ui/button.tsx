import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * The one pill/outline button used everywhere in the design.
 *
 * Figma "CTC website Redesign 2026" (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - `primary`: filled purple pill — newsletter (437:845), "Contact us"
 *    (553:8262). md = 24/32 label, px-6 py-4; sm = title-medium, px-4 py-2.5.
 *  - `outline`: grey-400 border, radius/3 (12px) — "Read more" (493:6937),
 *    "Sign up", "Apply now" (553:8240). md = px-4 py-2.5; sm = px-3 py-1 (32px).
 *  - `text`: borderless label + icon ("Learn more →"); underlines on hover.
 *
 * Usage:
 *   <Button href="/projects" variant="outline" icon="arrow-right">Read more</Button>
 *   <Button href={NEWSLETTER_SIGNUP_URL} icon="envelope">Join our newsletter</Button>
 *   <Button type="submit">Send</Button>            // no href -> <button>
 *
 * http(s) hrefs are treated as external (override with `external`): they get
 * target=_blank, rel=noopener noreferrer and an sr-only "(opens in a new
 * tab)". `mailto:`/`tel:` render a plain <a>; everything else is a next/link.
 */

type Variant = "primary" | "outline" | "text";
type Size = "sm" | "md";
export type ButtonIcon = "arrow-up-right" | "arrow-right" | "envelope";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ButtonIcon;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  /** Open in a new tab. Defaults to true for http(s) URLs. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const BASE =
  "font-omnes inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50";

const STYLES: Record<Variant, Record<Size, string>> = {
  primary: {
    md: "rounded-full bg-purple-500 px-6 py-4 text-headline-small font-normal text-white hover:bg-purple-800 disabled:hover:bg-purple-500",
    sm: "rounded-full bg-purple-500 px-4 py-2.5 text-title-medium font-medium text-white hover:bg-purple-800 disabled:hover:bg-purple-500",
  },
  outline: {
    md: "rounded-xl border border-grey-400 px-4 py-2.5 text-title-medium font-medium text-grey-800 hover:border-grey-800 hover:bg-grey-50 disabled:hover:border-grey-400 disabled:hover:bg-transparent",
    sm: "rounded-xl border border-grey-400 px-3 py-1 text-label-large font-medium text-grey-800 hover:border-grey-800 hover:bg-grey-50 disabled:hover:border-grey-400 disabled:hover:bg-transparent",
  },
  text: {
    md: "text-title-medium font-medium text-purple-800 underline-offset-4 hover:underline disabled:hover:no-underline",
    sm: "text-label-large font-medium text-purple-800 underline-offset-4 hover:underline disabled:hover:no-underline",
  },
};

function Icon({ name, large }: { name: ButtonIcon; large: boolean }) {
  const className = `${large ? "size-6" : "size-5"} shrink-0`;
  if (name === "envelope") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "arrow-right" ? (
        <path d="M4 10h12m-5-5 5 5-5 5" />
      ) : (
        <path d="M6 14 14 6m0 0H7m7 0v7" />
      )}
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    className,
    children,
    ...rest
  } = props;
  const classes = [BASE, STYLES[variant][size], className]
    .filter(Boolean)
    .join(" ");
  // The envelope leads the label (Figma); arrows trail it.
  const leading = icon === "envelope";
  const iconEl = icon ? (
    <Icon name={icon} large={variant === "primary" && size === "md"} />
  ) : null;

  if (props.href === undefined) {
    const { type = "button", ...buttonRest } =
      rest as ComponentPropsWithoutRef<"button">;
    return (
      <button {...buttonRest} type={type} className={classes}>
        {leading && iconEl}
        {children}
        {!leading && iconEl}
      </button>
    );
  }

  const { href, external, ...anchorRest } = rest as Omit<
    LinkButtonProps,
    keyof CommonProps
  >;
  const isExternal = external ?? /^https?:\/\//.test(href);
  const content = (
    <>
      {leading && iconEl}
      {children}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
      {!leading && iconEl}
    </>
  );

  if (isExternal) {
    return (
      <a
        {...anchorRest}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }
  if (/^(mailto|tel):/.test(href)) {
    return (
      <a {...anchorRest} href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link {...anchorRest} href={href} className={classes}>
      {content}
    </Link>
  );
}
