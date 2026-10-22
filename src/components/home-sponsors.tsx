import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";

/**
 * WB-45 "Our sponsors". Figma sponsors 539:4241 (desktop), 603:2822 (tablet):
 * white logo cards with a soft shadow.
 *
 * The sponsor list itself comes from the current lineup (old site PR #165,
 * "Fix sponsor labels"), not the Figma mock, which only shows four logos.
 * Gold sponsors get the full-size Figma card in a row of three; silver ones a
 * slightly smaller card in a row of three. Every card links to the sponsor.
 * Still hardcoded, like the old site's data/sponsors.js — move to Contentful
 * if the lineup starts changing more than once a year.
 */

type Sponsor = {
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
};

const GOLD: readonly Sponsor[] = [
  {
    name: "Benevity",
    href: "https://benevity.com",
    src: "/brand/home/sponsor-benevity.png",
    width: 640,
    height: 175,
  },
  {
    name: "Clio",
    href: "https://www.clio.com",
    src: "/brand/home/sponsor-clio.png",
    width: 640,
    height: 202,
  },
  {
    name: "AWS",
    href: "https://aws.amazon.com",
    src: "/brand/home/sponsor-aws.png",
    width: 195,
    height: 195,
  },
];

const SILVER: readonly Sponsor[] = [
  {
    name: "Schulich School of Engineering, University of Calgary",
    href: "https://schulich.ucalgary.ca",
    src: "/brand/home/sponsor-schulich.png",
    width: 640,
    height: 325,
  },
  {
    name: "University of Calgary Faculty of Science",
    href: "https://science.ucalgary.ca",
    src: "/brand/home/sponsor-uofc-science.png",
    width: 640,
    height: 199,
  },
  {
    name: "Pason",
    href: "https://www.pason.com",
    src: "/brand/home/sponsor-pason.png",
    width: 738,
    height: 387,
  },
];

const CARD =
  "shadow-elevation-100 hover:shadow-elevation-300 flex items-center justify-center rounded-2xl bg-white transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 motion-reduce:transition-none";

function SponsorCard({
  sponsor,
  tier,
}: {
  sponsor: Sponsor;
  tier: "gold" | "silver";
}) {
  const gold = tier === "gold";
  return (
    <li>
      <a
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${CARD} ${gold ? "h-[186px] px-7" : "h-[140px] px-5"}`}
      >
        <Image
          src={sponsor.src}
          alt={sponsor.name}
          width={sponsor.width}
          height={sponsor.height}
          sizes={
            gold
              ? "(min-width: 1024px) 264px, (min-width: 768px) 180px, 280px"
              : "(min-width: 1024px) 190px, 150px"
          }
          className={`h-auto w-full object-contain ${gold ? "max-h-[120px]" : "max-h-[88px]"}`}
        />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </li>
  );
}

export function HomeSponsors() {
  return (
    <section
      aria-labelledby="home-sponsors-heading"
      className="px-8 pt-8 pb-16 md:pb-24"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-16">
        <SectionHeading
          id="home-sponsors-heading"
          size="display"
          underline="green"
          className="text-purple-500"
        >
          Our sponsors
        </SectionHeading>

        <div className="flex w-full flex-col gap-8">
          <ul
            aria-label="Gold sponsors"
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {GOLD.map((s) => (
              <SponsorCard key={s.name} sponsor={s} tier="gold" />
            ))}
          </ul>
          <ul
            aria-label="Silver sponsors"
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8"
          >
            {SILVER.map((s) => (
              <SponsorCard key={s.name} sponsor={s} tier="silver" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
