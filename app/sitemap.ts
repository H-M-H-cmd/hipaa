import type { MetadataRoute } from "next";

const BASE = "https://hipaa-woad.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#features", "#security", "#controls", "#testimonials", "#pricing"];
  return sections.map((s, i) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: i === 0 ? 1 : 0.7,
  }));
}
