import { Hero } from "@/components/hero";
import { HomeAbout } from "@/components/home-about";

export default function Page() {
  return (
    <main className="bg-grey-50">
      <Hero />
      <HomeAbout />
    </main>
  );
}
