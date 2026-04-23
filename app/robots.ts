import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://hipaa-woad.vercel.app/sitemap.xml",
    host: "https://hipaa-woad.vercel.app",
  };
}
