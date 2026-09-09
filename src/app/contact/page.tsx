import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm.jsx";
import ContactHero from "@/components/ContactHero.jsx";

export const metadata: Metadata = {
  title: "Contact",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <div className="mt-15 px-10 md:flex md:justify-center md:gap-20 md:px-32">
        <ContactHero />
        <ContactForm />
      </div>
    </main>
  );
}
