import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactHero from "@/components/ContactHero";

export const metadata: Metadata = {
  title: "Contact",
};

// TODO(contentful): wire up the content types this page needs.
// Layout from Figma "contact/desktop" (553:9177): two columns 80px apart,
// left 306px wide, right 638px. There is no mobile frame, so below `lg` the
// columns stack (title + characters, then intro, then form).
export default function Page() {
  return (
    <main>
      <div className="mx-auto mt-15 flex max-w-5xl flex-col gap-10 px-6 pb-16 md:px-10 lg:flex-row lg:justify-center lg:gap-20 lg:px-8">
        <ContactHero />
        <ContactForm />
      </div>
    </main>
  );
}
