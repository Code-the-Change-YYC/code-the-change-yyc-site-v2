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
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
