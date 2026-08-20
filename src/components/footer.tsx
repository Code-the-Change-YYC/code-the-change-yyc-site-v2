import Link from "next/link";

import { SOCIAL_LINKS } from "@/lib/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-green-200">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-12">
        <div className="flex items-start gap-4">
          {/*
            eslint-disable-next-line @next/next/no-img-element -- static brand
            SVG; same rationale as src/components/header.tsx Logo.
          */}
          <img
            src="/brand/mark.svg"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0"
          />
          <div>
            <p className="font-omnes text-2xl font-extrabold text-purple-500 italic lowercase md:text-3xl">
              code the change yyc
            </p>
            <p className="mt-1 max-w-md font-omnes text-sm font-medium text-grey-800 md:text-base">
              A Calgary student initiative coding for non-profit causes.
            </p>
          </div>
        </div>

        <hr className="my-8 border-0 border-t border-purple-400 md:my-10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-omnes text-sm font-medium text-grey-800">
            © {year} Code the Change YYC
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-omnes text-base font-bold text-purple-500 transition-colors hover:text-purple-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
