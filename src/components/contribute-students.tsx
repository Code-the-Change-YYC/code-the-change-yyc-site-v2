import { ContributeRoleTabs } from "@/components/contribute-role-tabs";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ContributeRole } from "@/lib/contentful/contribute";

/** Students heading + intro (Figma 541:6776) and the role tabs. */
export function ContributeStudents({
  roles,
}: {
  roles: ContributeRole[] | null;
}) {
  return (
    <section
      id="students"
      aria-labelledby="students-heading"
      className="mx-auto flex w-full max-w-5xl scroll-mt-28 flex-col gap-8 px-4 md:px-8"
    >
      <div className="flex flex-col items-start gap-6 p-0 md:flex-row md:items-center md:gap-20 md:p-12">
        <SectionHeading
          id="students-heading"
          size="display"
          underline="green"
          className="text-grey-800 shrink-0"
        >
          Students
        </SectionHeading>
        <p className="font-omnes text-headline-small text-grey-800 flex-1">
          We are a welcoming and diverse team of students united by the mission
          of bettering our society through code. Regardless of what background
          you come from, if you are interested in making the world a better
          place, then please consider to applying to our team!
        </p>
      </div>
      {roles ? (
        <ContributeRoleTabs roles={roles} />
      ) : (
        <p className="font-omnes text-body-large text-grey-600 rounded-[20px] bg-orange-50 px-6 py-8 text-center">
          Role details are unavailable right now. Please check back soon, or{" "}
          <Button href="/contact" variant="text" size="sm">
            get in touch
          </Button>{" "}
          to ask about joining.
        </p>
      )}
    </section>
  );
}
