import Image from "next/image";
import type { ReactNode } from "react";

/**
 * One "What we do" block (WB-32 "Coding for good", WB-33 "Community & Events").
 * Figma "CTC website Redesign 2026" what-we-do 539:4128 (desktop), 603:2745
 * (tablet), 603:3208 (mobile).
 *
 * A white panel with a thin red/200 border that bleeds off one viewport edge
 * (the other end is a full pill curve on desktop), beside a tilted two-photo
 * collage with purple "selection handle" squares. `mirrored` flips the order:
 * collage left, panel bleeding off the right edge.
 *
 * The parent section must clip horizontal overflow (`overflow-x-clip`); the
 * bleed is `(100vw - containerWidth) / 2` of extra width on the outer edge.
 */

type Photo = { src: string; alt: string };

// Handle squares, as left/top percentages of the collage box, for each
// photo's four corners (Figma "Wiggle wooga" 553:7631). `size` is a
// percentage of the collage width.
const BACK_HANDLES = [
  "left-[60.23%] top-0",
  "left-[63.49%] top-[74.21%]",
  "left-[3.26%] top-[78.23%]",
  "left-0 top-[4.02%]",
];
const FRONT_HANDLES = [
  "left-[96.31%] top-[21.47%]",
  "left-[90.59%] top-[95.45%]",
  "left-[30.55%] top-[88.41%]",
  "left-[36.26%] top-[14.43%]",
];

function Handle({ position, tilt }: { position: string; tilt: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute aspect-square w-[3.6%] border-2 border-purple-500 bg-white ${position} ${tilt}`}
    />
  );
}

function Collage({ back, front }: { back: Photo; front: Photo }) {
  return (
    <div className="relative aspect-[472.5/383.5] w-full max-w-[472.5px] shrink-0">
      <div className="absolute top-[41.31%] left-[33.52%] aspect-square w-[63.6%] -translate-x-1/2 -translate-y-1/2 -rotate-[3.1deg] overflow-hidden border-2 border-purple-500">
        <Image
          src={back.src}
          alt={back.alt}
          fill
          sizes="(min-width: 1024px) 300px, 240px"
          className="object-cover"
        />
      </div>
      {BACK_HANDLES.map((p) => (
        <Handle key={p} position={p} tilt="-rotate-[3.1deg]" />
      ))}

      <div className="absolute top-[57.2%] left-[65.27%] aspect-square w-[63.4%] -translate-x-1/2 -translate-y-1/2 rotate-[5.44deg] overflow-hidden border-2 border-purple-500">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 300px, 240px"
          className="object-cover"
        />
      </div>
      {FRONT_HANDLES.map((p) => (
        <Handle key={p} position={p} tilt="rotate-[5.44deg]" />
      ))}
    </div>
  );
}

export function HomeServiceBlock({
  number,
  badge,
  title,
  mirrored = false,
  photos,
  children,
  below,
}: {
  number: string;
  badge: "green" | "orange";
  title: string;
  mirrored?: boolean;
  photos: { back: Photo; front: Photo };
  /** Panel paragraph. */
  children: ReactNode;
  /** Content under the panel/collage row (e.g. project cards). */
  below?: ReactNode;
}) {
  const badgeColor = badge === "green" ? "bg-green-500" : "bg-orange-500";
  // `(100vw - 100%) / 2` is the space between the 1280px container and the
  // viewport edge (0 below that). 100% resolves against the parent's width in
  // margin, padding and width alike.
  const panelSide = mirrored
    ? "rounded-l-4xl border-l-2 lg:rounded-l-full lg:order-last lg:-mr-[max(0px,calc((100vw-100%)/2))] lg:w-[calc(656px+max(0px,(100vw-100%)/2))] lg:pr-[calc(96px+max(0px,(100vw-100%)/2))] lg:pl-24"
    : "rounded-r-4xl border-r-2 lg:rounded-r-full lg:-ml-[max(0px,calc((100vw-100%)/2))] lg:w-[calc(656px+max(0px,(100vw-100%)/2))] lg:pl-[calc(96px+max(0px,(100vw-100%)/2))] lg:pr-24";

  return (
    <div className="flex flex-col items-stretch gap-5">
      <div
        className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-20 ${mirrored ? "lg:justify-end" : "lg:justify-start"}`}
      >
        <div
          className={`font-omnes text-grey-800 flex min-h-[380px] w-full flex-col justify-center gap-4 border-y-2 border-red-200 bg-white px-6 py-10 md:w-[85%] lg:h-[380px] lg:shrink-0 lg:py-0 ${panelSide} ${mirrored ? "self-end" : "self-start"} lg:self-auto`}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={`text-headline-large flex size-16 shrink-0 items-center justify-center rounded-full font-semibold text-white ${badgeColor}`}
            >
              {number}
            </span>
            <h3 className="text-headline-large font-normal">{title}</h3>
          </div>
          <p className="text-body-large">{children}</p>
        </div>

        <div className="w-full max-w-[372px] px-4 md:max-w-[472.5px] lg:w-[472.5px] lg:px-0">
          <Collage back={photos.back} front={photos.front} />
        </div>
      </div>
      {below}
    </div>
  );
}
