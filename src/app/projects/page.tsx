import type { Metadata } from "next";
const HEADER_CONTAINER = "text-black font-semibold text-4xl px-20 py-20 hidden md:flex";

const IMPACT_CONTAINER = "bg-white w-full my-10 hidden md:flex";
const IMPACT_MOBILE_CONTAINER = "bg-white w-full my-5 md:hidden";

const IMPACT_SVG = "/brand/svgs/projects/impact.svg";
const IMPACT_MOBILE_SVG = "/brand/svgs/projects/impact_mobile.svg";

export const metadata: Metadata = {
  title: "Projects",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main className="py-20">
      <h1 className="text-5xl font-bold text-[#7055FD] text-center">
        Projects
      </h1>
      <img
      src="/brand/svgs/projects/short_heading_underline.svg"
      alt=""
      className="mx-auto w-32 pt-4"
      />


      <section>
        <div className={HEADER_CONTAINER}>
            Over the course of our efforts, we have...
        </div>
      <img src={IMPACT_SVG} alt="" className={IMPACT_CONTAINER} />
      <img src={IMPACT_MOBILE_SVG} alt="" className={IMPACT_MOBILE_CONTAINER} />
      </section>
    </main>
  );
}
