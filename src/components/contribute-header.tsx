import { Button } from "@/components/ui/button";

/**
 * Contribute page header (Figma 539:6737): purple title with brush underline
 * on the left; intro copy and two anchor pills on the right.
 */
export function ContributeHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:gap-20 md:px-8">
      <h1 className="font-omnes text-display-large flex shrink-0 flex-col items-center font-semibold text-purple-500">
        <span>Contribute</span>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG from /public (see section-heading.tsx) */}
        <img
          src="/brand/decor/brush-mint.svg"
          alt=""
          aria-hidden="true"
          width={150}
          height={23}
          className="-mt-2 h-auto w-44 max-w-full"
        />
      </h1>
      <div className="flex flex-col gap-4">
        <p className="font-omnes text-headline-small text-grey-800">
          Whether you’re a student or a member of an organization, you can
          contribute to our efforts of bettering society through code!
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="#students" variant="outline" className="rounded-full!">
            Students
          </Button>
          <Button
            href="#organizations"
            variant="outline"
            className="rounded-full!"
          >
            Organizations
          </Button>
        </div>
      </div>
    </header>
  );
}
