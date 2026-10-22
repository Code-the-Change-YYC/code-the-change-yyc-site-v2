import Image from "next/image";

import { PixelDivider } from "@/components/pixel-divider";

/**
 * Homepage About block (Jira WB-21, with the WB-20 grass-to-purple
 * transition). Figma "CTC website Redesign 2026" about 539:4060 (desktop),
 * 437:846 (tablet), 437:930 (mobile).
 *
 * Top band: green/300 squares over purple continue the hero's grass.
 * Bottom band: grey/50 squares (the page background) rise from the bottom
 * edge, so the PixelDivider is flipped.
 */
const PHOTO_FRAME = "absolute aspect-[4/5] w-[34%] overflow-hidden rounded-xl";
const PHOTO_SIZES = "(min-width: 1024px) 160px, 125px";

export function HomeAbout() {
  return (
    <section
      aria-labelledby="home-about-heading"
      className="overflow-x-clip bg-purple-500"
    >
      <PixelDivider color="var(--color-green-300)" className="bg-purple-500" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 py-16 md:py-20 lg:flex-row lg:gap-8">
        <h2 id="home-about-heading" className="sr-only">
          About Code the Change YYC
        </h2>
        <p className="font-omnes max-w-3xl text-2xl leading-8 text-white lg:flex-1">
          Code the Change YYC is a Calgary-based initiative where students with
          a passion for technology volunteer their time to work on projects for
          non-profit causes as a way to grow their skills, gain experience,
          attain mentorship, and give back to the community.
        </p>

        {/* Scattered photos: Figma rotations -8.69deg / 4.3deg / 7.61deg. */}
        <div className="relative aspect-[361/190] w-full max-w-[361px] shrink-0 md:max-w-[460px] lg:max-w-[469px]">
          <div className={`${PHOTO_FRAME} top-0 left-0 -rotate-[8.69deg]`}>
            <Image
              src="/brand/home/about-volunteers.jpg"
              alt="Two Code the Change YYC volunteers smiling and making peace signs"
              fill
              sizes={PHOTO_SIZES}
              className="object-cover"
            />
          </div>
          <div
            className={`${PHOTO_FRAME} top-[27%] left-[30%] rotate-[4.3deg]`}
          >
            <Image
              src="/brand/home/about-team.jpg"
              alt="Group photo of the Code the Change YYC team"
              fill
              sizes={PHOTO_SIZES}
              className="object-cover"
            />
          </div>
          <div className={`${PHOTO_FRAME} top-[4%] right-0 rotate-[7.61deg]`}>
            <Image
              src="/brand/home/about-light.jpg"
              alt=""
              fill
              sizes={PHOTO_SIZES}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <PixelDivider
        flip
        color="var(--color-grey-50)"
        className="bg-purple-500"
      />
    </section>
  );
}
