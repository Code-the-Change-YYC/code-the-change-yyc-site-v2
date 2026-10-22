import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";

/**
 * WB-45 "Our sponsors". Figma sponsors 539:4241 (desktop), 603:2822 (tablet).
 * White logo cards with a soft shadow, 3 per row from tablet up (the lone fourth card sits
 * left-aligned on row two, as in Figma), a single column on mobile.
 */

const SPONSORS = [
  {
    name: "Benevity",
    src: "/brand/home/sponsor-benevity.png",
    width: 640,
    height: 175,
  },
  {
    name: "Schulich School of Engineering, University of Calgary",
    src: "/brand/home/sponsor-schulich.png",
    width: 640,
    height: 325,
  },
  {
    name: "University of Calgary Faculty of Science",
    src: "/brand/home/sponsor-uofc-science.png",
    width: 640,
    height: 199,
  },
  {
    name: "Clio",
    src: "/brand/home/sponsor-clio.png",
    width: 640,
    height: 202,
  },
] as const;

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

        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {SPONSORS.map((s) => (
            <li
              key={s.name}
              className="shadow-elevation-100 flex h-[186px] items-center justify-center rounded-2xl bg-white px-7"
            >
              <Image
                src={s.src}
                alt={s.name}
                width={s.width}
                height={s.height}
                sizes="(min-width: 1024px) 264px, (min-width: 768px) 180px, 280px"
                className="h-auto max-h-[120px] w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
