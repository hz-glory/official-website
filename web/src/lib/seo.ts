import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getSiteUrl } from "./site";

const STATIC_PATHS = [
  "",
  "/about",
  "/solutions",
  "/industries",
  "/cases",
  "/careers",
  "/contact",
] as const;

export function listSeoPaths() {
  return [...STATIC_PATHS];
}

export function pageMeta(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  index = true,
): Metadata {
  const site = getSiteUrl();
  const normalized = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const zhPath = `/zh${normalized}`;
  const enPath = `/en${normalized}`;
  const canonicalPath = locale === "en" ? enPath : zhPath;

  return {
    title,
    description,
    metadataBase: new URL(site),
    alternates: {
      canonical: canonicalPath,
      languages: {
        zh: zhPath,
        en: enPath,
        "x-default": zhPath,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "zh_CN",
      url: `${site}${canonicalPath}`,
      siteName: "Glorion Intelligence",
      title,
      description,
      images: [{ url: "/logo.svg", alt: "Glorion Intelligence" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.svg"],
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
