import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "/who-we-are",
  "/projects",
  "/events",
  "/newsletter",
  "/our-team",
  "/join",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
