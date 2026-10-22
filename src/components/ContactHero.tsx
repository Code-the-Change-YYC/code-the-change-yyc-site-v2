/**
 * Left column of the Contact page. Geometry from Figma "contact/desktop"
 * (fileKey C7O1lsl8HhZw9q7RxHHcWZ), node 553:9538: title group 553:9219
 * (text + sparkle 553:9221 + underline 553:9222), then the cube characters
 * 553:9765, 64px apart, centred.
 *
 * The decorations are positioned relative to the title's own box (not the
 * column), so they follow the text at any width / fallback font.
 *
 * The <img> usages below follow header.tsx: static brand SVGs served from
 * /public; next/image would need images.dangerouslyAllowSVG, which is a
 * project-level decision.
 */
export default function ContactHero() {
  return (
    <div className="flex flex-col items-center gap-10 lg:w-76.5 lg:shrink-0 lg:gap-16">
      <div className="relative inline-block">
        <h1 className="font-omnes text-display-large font-semibold whitespace-nowrap text-purple-500">
          Contact us
        </h1>
        {/* Sparkle: starts at the title's right edge, top-aligned with it. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
        <img
          className="absolute top-0 left-full -mt-0.75 -ml-px"
          src="/contact/sparkle.svg"
          alt=""
          width={36}
          height={29}
        />
        {/* Underline: ~80% of the title width, inset ~10% from the left. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
        <img
          className="absolute top-14 left-[10%] h-auto w-4/5"
          src="/contact/underline.svg"
          alt=""
          width={219}
          height={24}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
      <img
        className="h-auto w-55.75 max-w-full"
        src="/contact/heart.svg"
        alt=""
        width={223}
        height={152}
      />
    </div>
  );
}
