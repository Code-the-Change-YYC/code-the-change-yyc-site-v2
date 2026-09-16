import type { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.css";

const MISSION =
  "Code the Change YYC is a Calgary-based initiative where students with a passion for technology volunteer their time to work on projects for non-profit causes as a way to grow their skills, gain experience, attain mentorship, and give back to the community.";

export const metadata: Metadata = {
  title: "About",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <h1>Who We Are</h1>
    </main>
  );
}
