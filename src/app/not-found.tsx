import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pt-16 pb-20 text-center md:px-10 lg:pt-24 lg:pb-32">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG from /public (see header.tsx) */}
      <img
        src="/contact/heart.svg"
        alt=""
        aria-hidden="true"
        width={223}
        height={152}
        className="h-auto w-44 lg:w-56"
      />
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-omnes text-display-small lg:text-display-large font-semibold text-purple-500">
          404 · Page not found
        </h1>
        <p className="font-omnes text-grey-800 max-w-xl text-xl/7 sm:text-2xl/8">
          Oops, we couldn’t find that page. It may have moved, or the link may
          be mistyped.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/events" variant="outline" icon="arrow-right">
          See our events
        </Button>
      </div>
    </main>
  );
}
