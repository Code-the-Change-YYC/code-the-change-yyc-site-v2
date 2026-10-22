import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { omnes } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Code the Change YYC",
    template: "%s | Code the Change YYC",
  },
  description:
    "Code the Change YYC is a Calgary student-led organization that builds software for non-profits.",
  openGraph: {
    type: "website",
    siteName: "Code the Change YYC",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${omnes.variable} h-full antialiased`}>
      <body className="font-omnes flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-purple-500 focus-visible:px-5 focus-visible:py-3 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
