import { en } from "@/content/en";
import { zh } from "@/content/zh";
import type { Dictionary, Locale } from "@/content/types";

export const locales: Locale[] = ["zh", "en"];
export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : zh;
}

export function localePath(locale: Locale, href: string) {
  if (href.startsWith("http")) return href;
  const path = href.startsWith("/") ? href : `/${href}`;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
