import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProjectCardData } from "@/lib/contentful/projects";

/**
 * "Code contributions" section for /projects (Figma 460:4527, grid 493:6987):
 * 2 columns from md up (tablet 700:5717 is also 2-up), 1 column on mobile.
 * `projects` is `null` when Contentful couldn't be reached and `[]` when
 * there is nothing to show; each gets its own message.
 */
export function ProjectsGrid({
  projects,
}: {
  projects: ProjectCardData[] | null;
}) {
  return (
    <section
      aria-labelledby="code-contributions-heading"
      className="mx-auto w-full max-w-[1040px] px-4 py-16 md:px-6"
    >
      <SectionHeading
        id="code-contributions-heading"
        underline="green"
        className="text-purple-500"
      >
        Code contributions
      </SectionHeading>

      {projects === null ? (
        <Message role="alert">
          We couldn&apos;t load our projects right now. Please check back soon.
        </Message>
      ) : projects.length === 0 ? (
        <Message>No projects to show yet — check back soon!</Message>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Message({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "alert";
}) {
  return (
    <p
      role={role}
      className="font-omnes border-grey-200 text-body-large text-grey-600 mx-auto mt-8 max-w-xl rounded-2xl border border-dashed bg-white px-6 py-12 text-center"
    >
      {children}
    </p>
  );
}
