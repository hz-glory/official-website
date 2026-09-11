"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/types";

type Props = {
  locale: Locale;
  title: string;
  sub: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eventSource: string;
};

export function SectionCTA({
  locale,
  title,
  sub,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  eventSource,
}: Props) {
  return (
    <section className="section-tight pb-20">
      <div className="container">
        <div className="panel relative overflow-hidden px-6 py-10 sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(500px 200px at 10% 0%, rgba(217,119,44,0.12), transparent), radial-gradient(400px 180px at 90% 100%, rgba(47,111,106,0.1), transparent)",
            }}
          />
          <div className="relative max-w-3xl">
            <h2 className="heading text-3xl sm:text-4xl">{title}</h2>
            <p className="lead mt-4">{sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, primaryHref)}
                className="btn btn-primary"
                onClick={() =>
                  track("cta_click", { source: eventSource, href: primaryHref, kind: "primary" })
                }
              >
                {primaryLabel}
              </Link>
              {secondaryLabel && secondaryHref ? (
                <Link
                  href={localePath(locale, secondaryHref)}
                  className="btn btn-secondary"
                  onClick={() =>
                    track("cta_click", {
                      source: eventSource,
                      href: secondaryHref,
                      kind: "secondary",
                    })
                  }
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
