import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { listSeoPaths } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const now = new Date();

  return locales.flatMap((locale) =>
    listSeoPaths().map((path) => ({
      url: `${site}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/contact" ? 0.8 : 0.7,
    })),
  );
}
