import { PixelDivider } from "@/components/pixel-divider";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/** Peach "Organizations" band with pixel edges (Figma 550:7029). */
export function ContributeOrganizations() {
  return (
    <section
      id="organizations"
      aria-labelledby="organizations-heading"
      className="scroll-mt-28"
    >
      <PixelDivider color="var(--color-orange-200)" flip />
      <div className="flex flex-col items-center gap-6 bg-orange-200 px-4 py-12 md:px-12">
        <div className="flex w-full max-w-[1022px] flex-col items-start gap-6 md:flex-row md:items-center md:gap-20">
          <SectionHeading
            id="organizations-heading"
            size="display"
            underline="orange"
            className="shrink-0 text-orange-900"
          >
            Organizations
          </SectionHeading>
          <p className="font-omnes text-headline-small text-grey-800 flex-1">
            We’re always seeking support from businesses and organizations to
            support our operations. Whether it be through corporate
            sponsorships, partnerships, workshops, or volunteers, we’d love to
            collaborate to make the world a better place through technology.
          </p>
        </div>
        <Button href="/contact" icon="envelope">
          Contact us
        </Button>
      </div>
      <PixelDivider color="var(--color-orange-200)" />
    </section>
  );
}
