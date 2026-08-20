import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SITE_URL } from "@/lib/site";

// TODO(design): swap the system font stack for self-hosted Omnes via
// next/font/local once licensed .woff2 files are in public/fonts/.
// See CLAUDE.md → "Brand font" for the exact wiring (@theme inline).

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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
