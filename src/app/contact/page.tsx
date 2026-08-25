import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm.jsx";

export const metadata: Metadata = {
  title: "Contact",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <div className="mt-15 flex justify-center gap-20 px-32">
        <ContactForm />
      </div>
    </main>
  );
}
