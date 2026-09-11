"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { track } from "@/lib/analytics";
import { localePath } from "@/lib/i18n";
import { Logo } from "./Logo";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rest = pathname.replace(/^\/(zh|en)/, "") || "/";
  const otherLocale: Locale = locale === "zh" ? "en" : "zh";
  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container flex h-[4.25rem] items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="desktop-nav flex items-center gap-5">
          {dict.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="lang-switch" aria-label="Language">
            <Link
              href={localePath("zh", rest)}
              className={locale === "zh" ? "is-active" : ""}
            >
              中文
            </Link>
            <Link
              href={localePath("en", rest)}
              className={locale === "en" ? "is-active" : ""}
            >
              EN
            </Link>
          </div>

          <Link
            href={localePath(locale, "/contact?intent=client")}
            className="btn btn-primary hidden !min-h-9 !px-4 !text-sm sm:inline-flex"
            onClick={() => track("cta_click", { source: "header", href: "/contact?intent=client" })}
          >
            {dict.cta.consult}
          </Link>

          <button
            type="button"
            className="mobile-nav rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav border-t border-[var(--line)] bg-[rgba(249,247,244,0.98)]">
          <div className="container flex flex-col gap-1 py-3">
            {dict.nav.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2.5 text-[0.95rem] ${
                  isActive(item.href) ? "bg-[var(--bg-muted)] font-semibold" : "text-[var(--ink-soft)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localePath(otherLocale, rest)}
              onClick={closeMenu}
              className="mt-1 rounded-lg px-3 py-2.5 text-sm text-[var(--teal)]"
            >
              {otherLocale === "zh" ? "切换到中文" : "Switch to English"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
