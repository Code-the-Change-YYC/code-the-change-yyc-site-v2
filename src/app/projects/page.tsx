import type { Metadata } from "next";
import ProjectsSection from "../../components/projectSection";

export const metadata: Metadata = {
  title: "Projects",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <h1>Projects</h1>
      <h1>Code Contributions</h1>
      <ProjectsSection />
    </main>
  );
}
