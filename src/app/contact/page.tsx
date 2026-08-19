import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm.jsx";

export const metadata: Metadata = {
  title: "Contact",
};

// TODO(design): build this page from the Direction 05 mockup.
// TODO(contentful): wire up the content types this page needs.
export default function Page() {
  return (
    <main>
      <h1>Contact</h1>
      <ContactForm />
    </main>
  );
}
