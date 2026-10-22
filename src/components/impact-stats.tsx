import Image from "next/image";

/**
 * "Over the course of our efforts, we have..." impact block for /projects.
 *
 * Sourced from Figma file "CTC website Redesign 2026"
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ):
 *  - node 493:6664, "desktop" (1440x949) — also used for the tablet page
 *    (700:5704), where it simply scales down to 834px wide.
 *  - node 493:6690, "mobile" (428x1530) — used for the mobile page (700:6054).
 *
 * The numbers, labels and heading are real text (so they are selectable and
 * readable by screen readers); only the wavy lines, underlines and the two
 * photos are images. Each variant is a fixed-aspect canvas whose children are
 * placed by percentage, and type is sized in `cqw` (container-width units) so
 * the whole composition scales together exactly like the Figma frame.
 *
 * Omnes is not sourced yet (see CLAUDE.md), so `font-omnes` falls back to a
 * system stack; labels are anchored by their left/top edge and numbers by
 * their centre so the composition degrades gracefully until the font lands.
 */

const DOODLE_BASE = "/brand/projects/impact";
const DOODLE_BASE_MOBILE = "/brand/projects/impact-mobile";

// Figma exports each stroke with `overflow: visible` and an inner inset
// wrapper that accounts for the stroke width, so both boxes are kept.
type Doodle = { src: string; outer: string; inner?: string };

const UNDERLINE_A_INNER = "inset-[-59.06%_-2.27%_-59.07%_-2.27%]";
const UNDERLINE_B_INNER = "inset-[-113.19%_-4.68%_-113.22%_-4.68%]";

// Inset percentages are derived from Figma frame 493:6664 (1440x949).
const DESKTOP_DOODLES: Doodle[] = [
  {
    src: `${DOODLE_BASE}/underline-14-a.svg`,
    outer: "inset-[32.03%_72.99%_67.43%_17.85%]",
    inner: UNDERLINE_A_INNER,
  },
  {
    src: `${DOODLE_BASE}/underline-14-b.svg`,
    outer: "inset-[32.92%_75.09%_66.8%_20.45%]",
    inner: UNDERLINE_B_INNER,
  },
  {
    src: `${DOODLE_BASE}/underline-hrs-a.svg`,
    outer: "inset-[92.94%_22.92%_6.52%_67.92%]",
    inner: UNDERLINE_A_INNER,
  },
  {
    src: `${DOODLE_BASE}/underline-hrs-b.svg`,
    outer: "inset-[93.83%_25.52%_5.89%_70.02%]",
    inner: UNDERLINE_B_INNER,
  },
  {
    src: `${DOODLE_BASE}/wave-1.svg`,
    outer: "inset-[16.54%_56.88%_74.5%_28.19%]",
    inner: "inset-[-3.53%_-1.4%]",
  },
  {
    src: `${DOODLE_BASE}/wave-2.svg`,
    outer: "inset-[59.84%_55.31%_33.3%_-0.91%]",
    inner: "inset-[-4.61%_-0.46%]",
  },
  {
    src: `${DOODLE_BASE}/wave-3.svg`,
    outer: "inset-[42.6%_-1.11%_46.72%_57.33%]",
    inner: "inset-[-2.96%_-0.48%]",
  },
  {
    src: `${DOODLE_BASE}/wave-4.svg`,
    outer: "inset-[18.76%_-2.78%_47.84%_32.64%]",
    inner: "inset-[-0.94%_-0.3%_-0.95%_-0.3%]",
  },
  {
    src: `${DOODLE_BASE}/wave-5.svg`,
    outer: "inset-[26.55%_83.75%_58.38%_-0.76%]",
    inner: "inset-[-2.1%_-1.22%]",
  },
  {
    src: `${DOODLE_BASE}/wave-6.svg`,
    outer: "inset-[61.64%_35.76%_8.64%_4.86%]",
    inner: "inset-[-1.06%_-0.35%]",
  },
];

// Inset percentages are derived from Figma frame 493:6690 (428x1530).
const MOBILE_DOODLES: Doodle[] = [
  {
    src: `${DOODLE_BASE_MOBILE}/underline-14-a.svg`,
    outer: "inset-[17.78%_34.58%_81.89%_34.58%]",
    inner: UNDERLINE_A_INNER,
  },
  {
    src: `${DOODLE_BASE_MOBILE}/underline-14-b.svg`,
    outer: "inset-[18.33%_41.67%_81.5%_43.35%]",
    inner: UNDERLINE_B_INNER,
  },
  {
    src: `${DOODLE_BASE_MOBILE}/underline-30k.svg`,
    outer: "inset-[51.24%_34.58%_47.91%_35.05%]",
    inner: "inset-[-23%_-2.31%_-23.01%_-2.31%]",
  },
  {
    src: `${DOODLE_BASE_MOBILE}/underline-hrs-a.svg`,
    outer: "inset-[89.61%_34.81%_10.06%_34.35%]",
    inner: "inset-[-59.07%_-2.27%_-59.08%_-2.27%]",
  },
  {
    src: `${DOODLE_BASE_MOBILE}/underline-hrs-b.svg`,
    outer: "inset-[90.16%_43.58%_9.67%_41.44%]",
    inner: UNDERLINE_B_INNER,
  },
  {
    src: `${DOODLE_BASE_MOBILE}/wave-1.svg`,
    outer: "inset-[3.1%_-4.56%_86.27%_70.21%]",
    inner: "inset-[-1.85%_-2.04%]",
  },
  {
    src: `${DOODLE_BASE_MOBILE}/wave-2.svg`,
    outer: "inset-[14.38%_70.09%_76.27%_-8.18%]",
    inner: "inset-[-2.1%_-1.84%]",
  },
  {
    src: `${DOODLE_BASE_MOBILE}/wave-3.svg`,
    outer: "inset-[28.63%_-34.35%_63.62%_-9.11%]",
    inner: "inset-[-2.53%_-0.49%]",
  },
  {
    src: `${DOODLE_BASE_MOBILE}/wave-4.svg`,
    outer: "inset-[61.66%_-45.44%_27%_-15.07%]",
    inner: "inset-[-1.73%_-0.44%]",
  },
];

function DoodleLayer({ doodles }: { doodles: Doodle[] }) {
  return (
    <div aria-hidden="true">
      {doodles.map(({ src, outer, inner }) => (
        <div key={src} className={`absolute ${outer}`}>
          <div className={inner ? `absolute ${inner}` : "absolute inset-0"}>
            {/*
              eslint-disable-next-line @next/next/no-img-element -- static
              decorative SVG strokes served from /public; next/image would
              need `images.dangerouslyAllowSVG` (project-level security
              decision, see header.tsx).
            */}
            <img
              src={src}
              alt=""
              className="block size-full max-w-none"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Shared type treatments (Figma: Omnes Bold stat numbers, SemiBold labels).
const STAT =
  "absolute font-omnes font-bold whitespace-nowrap text-purple-500 text-center -translate-x-1/2";
const LABEL =
  "absolute font-omnes font-semibold leading-[1.25] whitespace-nowrap text-black";

const PHOTO_SIZES = "(min-width: 1440px) 250px, 20vw";

// Each stat reads as one sentence to assistive tech; the scattered visual
// pieces are hidden from it.
function Stat({ sr, children }: { sr: string; children: React.ReactNode }) {
  return (
    <li>
      <span className="sr-only">{sr}</span>
      <div aria-hidden="true">{children}</div>
    </li>
  );
}

function DesktopImpact() {
  return (
    <section
      aria-labelledby="impact-heading-desktop"
      className="@container relative mx-auto hidden aspect-[1440/949] w-full max-w-[1440px] overflow-hidden md:block"
    >
      <DoodleLayer doodles={DESKTOP_DOODLES} />

      <div className="absolute inset-[15.81%_17.19%_58.06%_66.04%]">
        <div className="absolute inset-[-0.4%_-0.41%]">
          <Image
            src="/brand/projects/impact/photo-team.png"
            alt="Code the Change YYC members posing together for a group photo"
            width={488}
            height={500}
            sizes={PHOTO_SIZES}
            className="block size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute inset-[71.23%_70.14%_2.63%_12.64%]">
        <div className="absolute inset-[-0.4%]">
          <Image
            src="/brand/projects/impact/photo-pair.png"
            alt="Two Code the Change YYC members smiling and making peace signs"
            width={500}
            height={500}
            sizes={PHOTO_SIZES}
            className="block size-full max-w-none"
          />
        </div>
      </div>

      <h2
        id="impact-heading-desktop"
        className={`${LABEL} top-[4.32%] left-[5%] m-0 text-[2.5cqw]`}
      >
        Over the course of our efforts, we have...
      </h2>

      <ul className="m-0 list-none p-0">
        <Stat sr="Worked on 14 non-profit projects">
          <p className={`${LABEL} top-[18.1%] left-[4.97%] text-[2.5cqw]`}>
            worked on
          </p>
          <p
            className={`${STAT} top-[16.44%] left-[22.43%] text-[9.722cqw] leading-[1.25]`}
          >
            14
          </p>
          <p className={`${LABEL} top-[33.6%] left-[20.22%] text-[2.5cqw]`}>
            non-profit projects
          </p>
        </Stat>
        <Stat sr="Donated $30k+ to charities">
          <p className={`${LABEL} top-[49.1%] left-[25.69%] text-[2.5cqw]`}>
            donated
          </p>
          <p
            className={`${STAT} top-[48.47%] left-[50.14%] text-[9.722cqw] leading-[1.25]`}
          >
            $30k+
          </p>
          <p className={`${LABEL} top-[63.9%] left-[54.37%] text-[2.5cqw]`}>
            to charities
          </p>
        </Stat>
        <Stat sr="Contributed 3k+ hours in volunteering">
          <p className={`${LABEL} top-[78.4%] left-[48.13%] text-[2.5cqw]`}>
            &amp; contributed
          </p>
          <p
            className={`${STAT} top-[77.45%] left-[81.88%] text-[9.722cqw] leading-[1.25]`}
          >
            3k+ hrs
          </p>
          <p className={`${LABEL} top-[93.1%] left-[78.45%] text-[2.5cqw]`}>
            in volunteering
          </p>
        </Stat>
      </ul>
    </section>
  );
}

function MobileImpact() {
  return (
    <section
      aria-labelledby="impact-heading-mobile"
      className="@container relative mx-auto aspect-[428/1530] w-full max-w-[428px] overflow-hidden md:hidden"
    >
      <DoodleLayer doodles={MOBILE_DOODLES} />

      <h2
        id="impact-heading-mobile"
        className="font-omnes absolute top-[0.1%] left-1/2 m-0 w-[60%] -translate-x-1/2 text-center text-[4.67cqw] leading-[1.25] font-semibold text-purple-500"
      >
        Over the course of our efforts, we have...
      </h2>

      <ul className="m-0 list-none p-0">
        <Stat sr="Worked on 14 non-profit projects">
          <p className={`${LABEL} top-[5.2%] left-[30.34%] text-[8.41cqw]`}>
            worked on
          </p>
          <p
            className={`${STAT} top-[7.32%] left-1/2 text-[35.05cqw] leading-[1.25]`}
          >
            14
          </p>
          <p className={`${LABEL} top-[20.8%] left-[20.51%] text-[8.41cqw]`}>
            non-profit
            <br />
            projects
          </p>
        </Stat>
        <Stat sr="Donated $30k+ to charities">
          <p className={`${LABEL} top-[38.1%] left-[33.73%] text-[8.41cqw]`}>
            donated
          </p>
          <p
            className={`${STAT} top-[40.33%] left-1/2 text-[32.71cqw] leading-[1.25]`}
          >
            $30k+
          </p>
          <p className={`${LABEL} top-[54.3%] left-[17.01%] text-[8.41cqw]`}>
            to charities
          </p>
        </Stat>
        <Stat sr="Contributed 3k+ hours in volunteering">
          <p className={`${LABEL} top-[69.5%] left-[23.36%] text-[8.41cqw]`}>
            &amp; contributed
          </p>
          {/* Two tight lines (Figma: 101px pitch at 140px type). */}
          <p
            className={`${STAT} top-[74.97%] left-1/2 text-[32.71cqw] leading-[0.72]`}
          >
            3k+
            <br />
            hrs
          </p>
          <p className={`${LABEL} top-[92.8%] left-[12.48%] text-[8.41cqw]`}>
            in volunteering
          </p>
        </Stat>
      </ul>
    </section>
  );
}

export function ImpactStats() {
  return (
    <>
      <DesktopImpact />
      <MobileImpact />
    </>
  );
}
