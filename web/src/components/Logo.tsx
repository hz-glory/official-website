import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/types";

type Props = {
  locale: Locale;
  light?: boolean;
};

export function Logo({ locale, light = false }: Props) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex items-center gap-2.5"
      aria-label="Glorion Intelligence"
    >
      <span
        className="relative grid h-9 w-9 place-items-center rounded-[10px]"
        style={{
          background: light
            ? "linear-gradient(145deg, rgba(255,250,245,0.18), rgba(255,250,245,0.05))"
            : "linear-gradient(145deg, #d9772c, #2f6f6a)",
          border: light ? "1px solid rgba(255,250,245,0.28)" : "none",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M4 14.5V5.5L10 3L16 5.5V14.5L10 17L4 14.5Z"
            stroke={light ? "#fff8f0" : "#fff8f0"}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M10 8.2V13.2"
            stroke={light ? "#fff8f0" : "#fff8f0"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M7.4 10.2H12.6"
            stroke={light ? "#fff8f0" : "#fff8f0"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="serif text-[1.05rem] font-semibold tracking-tight"
          style={{ color: light ? "#fff8f0" : "var(--ink)" }}
        >
          {locale === "zh" ? "光荣智能" : "Glorion"}
        </span>
        <span
          className="mt-1 text-[0.68rem] font-medium tracking-[0.04em]"
          style={{ color: light ? "rgba(255,248,240,0.72)" : "var(--ink-muted)" }}
        >
          {locale === "zh" ? "Glorion Intelligence" : "Intelligence"}
        </span>
      </span>
    </Link>
  );
}
