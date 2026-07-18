import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { Logo } from "./Logo";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-muted)_65%,transparent)]">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo locale={locale} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-soft)]">
            {dict.footer.blurb}
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            {dict.contact.office} · {dict.contact.officeValue}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--ink)]">
            {locale === "zh" ? "导航" : "Explore"}
          </p>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            {dict.nav.slice(1, 5).map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  className="transition-colors hover:text-[var(--teal)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--ink)]">
            {locale === "zh" ? "开始合作" : "Get started"}
          </p>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li>
              <Link
                href={localePath(locale, "/contact?intent=client")}
                className="transition-colors hover:text-[var(--teal)]"
              >
                {dict.cta.consult}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, "/careers")}
                className="transition-colors hover:text-[var(--teal)]"
              >
                {dict.cta.careers}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, "/contact?intent=invest")}
                className="transition-colors hover:text-[var(--teal)]"
              >
                {dict.cta.invest}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="container flex flex-col gap-2 py-5 text-xs text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{dict.footer.rights}</span>
          <span className="mono">FDE · Outcomes · Partnership</span>
        </div>
      </div>
    </footer>
  );
}
