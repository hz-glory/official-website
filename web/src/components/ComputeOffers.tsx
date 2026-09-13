"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { Reveal } from "./Reveal";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ComputeOffers({ locale, dict }: Props) {
  const offers = dict.compute.offers;
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (offers.items.some((item) => item.id === hash)) {
        setOpenId(hash);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [offers.items]);

  const toggleDetails = (id: string) => {
    setOpenId((current) => {
      const next = current === id ? null : id;
      const url = new URL(window.location.href);
      url.hash = next ?? "offers";
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      return next;
    });
  };

  return (
    <section id="offers" className="section-tight bg-[color-mix(in_srgb,var(--bg-muted)_55%,transparent)]">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{offers.eyebrow}</p>
          <h2 className="heading mt-3 text-3xl sm:text-4xl">{offers.title}</h2>
          <p className="lead mt-4 max-w-3xl">{offers.sub}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {offers.items.map((item) => {
            const open = openId === item.id;
            const starting = item.pricing[0];
            return (
              <Reveal key={item.id}>
                <article
                  id={item.id}
                  className={`panel compute-offer scroll-mt-24 ${open ? "is-open" : ""}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                      {item.badge}
                    </p>
                    <span className="text-xs text-[var(--ink-muted)]">· {item.mode}</span>
                  </div>
                  <h3 className="serif mt-2 text-xl font-semibold sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--ink-muted)]">
                    <span>{item.location}</span>
                    <span>{item.availability}</span>
                  </div>
                  {starting ? (
                    <p className="mt-3 text-sm">
                      <span className="text-[var(--ink-muted)]">{offers.fromPrice}</span>{" "}
                      <span className="font-semibold text-[var(--ink)]">{starting.price}</span>
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary !min-h-10 !px-3.5 !text-sm"
                      aria-expanded={open}
                      onClick={() => toggleDetails(item.id)}
                    >
                      {open ? offers.collapseCta : offers.detailsCta}
                    </button>
                    <Link
                      href={localePath(
                        locale,
                        `/compute/inquiry?resource=${item.id}&from=offer-${item.id}`,
                      )}
                      className="btn btn-primary !min-h-10 !px-3.5 !text-sm"
                    >
                      {offers.inquiryCta}
                    </Link>
                  </div>

                  {open ? (
                    <div className="compute-offer-details">
                      <p className="text-xs text-[var(--ink-muted)]">{item.validity}</p>
                      <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                            {offers.specsLabel}
                          </p>
                          <dl className="mt-3 space-y-2 text-sm">
                            {item.specs.map((spec) => (
                              <div key={spec.label} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                                <dt className="text-[var(--ink-muted)]">{spec.label}</dt>
                                <dd className="text-[var(--ink-soft)]">{spec.value}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-5 text-xs font-semibold tracking-wide text-[var(--teal)]">
                            {offers.termsLabel}
                          </p>
                          <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                            {item.terms.map((term) => (
                              <li key={term}>· {term}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                            {offers.pricingLabel}
                          </p>
                          <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                            {item.pricing.map((row) => (
                              <li
                                key={`${row.tier}-${row.price}`}
                                className="flex items-baseline justify-between gap-4 py-2.5 text-sm"
                              >
                                <span className="text-[var(--ink-muted)]">{row.tier}</span>
                                <span className="text-right font-semibold text-[var(--ink)]">
                                  {row.price}
                                  {row.note ? (
                                    <span className="mt-0.5 block text-xs font-medium text-[var(--ink-muted)]">
                                      {row.note}
                                    </span>
                                  ) : null}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[var(--ink-muted)]">
          {offers.quoteNote}
        </p>
      </div>
    </section>
  );
}
