import { notFound } from "next/navigation";
import { ComputeOffers } from "@/components/ComputeOffers";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionCTA } from "@/components/SectionCTA";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.compute.title, dict.compute.sub, "/compute");
}

export default async function ComputePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero
        eyebrow={dict.compute.eyebrow}
        title={dict.compute.title}
        sub={dict.compute.sub}
      />

      <section className="section-tight">
        <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
              {dict.compute.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={localePath(raw, "/compute/inquiry")}
                className="btn btn-primary"
              >
                {dict.cta.inquiry}
              </a>
              <a href="#offers" className="btn btn-secondary">
                {dict.compute.offers.title}
              </a>
              <a
                href={dict.compute.guideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {dict.compute.guideLabel} ↗
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--ink-muted)]">
              {dict.compute.guideNote}
            </p>
          </Reveal>
          <Reveal>
            <div className="panel p-6 sm:p-7">
              <p className="eyebrow">{dict.compute.scopesTitle}</p>
              <div className="mt-5 space-y-5">
                {dict.compute.scopes.map((scope) => (
                  <article key={scope.title}>
                    <h2 className="serif text-xl font-semibold">{scope.title}</h2>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{scope.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ComputeOffers locale={raw} dict={dict} />

      <section className="section-tight">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div>
            <Reveal>
              <p className="eyebrow">{raw === "zh" ? "模式" : "Modes"}</p>
              <h2 className="heading mt-3 text-2xl">{dict.compute.modesTitle}</h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {dict.compute.modes.map((mode, i) => (
                <article key={mode.title} className="border-l-2 border-[var(--teal)] pl-4">
                  <p className="mono text-xs text-[var(--orange)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="serif mt-1 text-lg font-semibold">{mode.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{mode.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">{raw === "zh" ? "区域" : "Regions"}</p>
              <h2 className="heading mt-3 text-2xl">{dict.compute.regionsTitle}</h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {dict.compute.regions.map((region) => (
                <article key={region.title}>
                  <h3 className="serif text-lg font-semibold">{region.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--ink-soft)]">{region.body}</p>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--ink-muted)]">
                    {region.points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">{raw === "zh" ? "原则" : "Principles"}</p>
              <h2 className="heading mt-3 text-2xl">{dict.compute.principlesTitle}</h2>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {dict.compute.principles.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container mt-12">
          <Reveal>
            <p className="eyebrow">{raw === "zh" ? "协同" : "Coordination"}</p>
            <h2 className="heading mt-3 text-2xl sm:text-3xl">
              {dict.compute.processTitle}
            </h2>
            <p className="lead mt-3">{dict.compute.processSub}</p>
          </Reveal>
          <div className="relative mt-8 grid gap-5 md:grid-cols-4">
            <div className="flow-line pointer-events-none absolute top-[1.15rem] right-8 left-8 hidden md:block" />
            {dict.compute.process.map((step, i) => (
              <article key={step.title} className="relative">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--teal)]">
                  {i + 1}
                </div>
                <h3 className="serif text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        locale={raw}
        title={dict.compute.ctaTitle}
        sub={dict.compute.ctaSub}
        primaryLabel={dict.cta.inquiry}
        primaryHref="/compute/inquiry"
        secondaryLabel={dict.cta.compute}
        secondaryHref="/contact?intent=compute"
        eventSource="compute"
      />
    </>
  );
}
