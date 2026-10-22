import type { NextConfig } from "next";
import { NEWSLETTER_SIGNUP_URL } from "./src/lib/newsletter";

const nextConfig: NextConfig = {
  images: {
    // `images.domains` is deprecated in Next 16 — use remotePatterns.
    // Do NOT set `search` here: Contentful serves image transforms via query
    // string (?w=800&fm=webp), and pinning `search` would reject every one.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        // Contentful space ID. Not a secret — it appears in every asset URL.
        pathname: "/963e09izo0py/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/our-team", destination: "/who-we-are", permanent: false },
      {
        source: "/newsletter",
        destination: NEWSLETTER_SIGNUP_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
