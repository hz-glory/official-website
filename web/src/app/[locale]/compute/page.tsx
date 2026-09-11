import { notFound } from "next/navigation";
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

      <section className="section bg-[color-mix(in_srgb,var(--bg-muted)_55%,transparent)]">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{raw === "zh" ? "硬件" : "Hardware"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {dict.compute.modelsTitle}
            </h2>
            <p className="lead mt-4">{dict.compute.modelsSub}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {dict.compute.models.map((model) => (
              <Reveal key={model.name}>
                <article className="panel h-full p-6 sm:p-7">
                  <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                    {model.tag}
                  </p>
                  <h3 className="serif mt-3 text-2xl font-semibold">{model.name}</h3>
                  <p className="mt-3 text-sm text-[var(--ink-soft)]">{model.body}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[var(--ink-soft)]">
                    {model.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">{raw === "zh" ? "模式" : "Modes"}</p>
              <h2 className="heading mt-3 text-3xl">{dict.compute.modesTitle}</h2>
            </Reveal>
            <div className="mt-8 grid gap-5">
              {dict.compute.modes.map((mode, i) => (
                <Reveal key={mode.title}>
                  <article className="border-l-2 border-[var(--teal)] pl-4">
                    <p className="mono text-xs text-[var(--orange)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="serif mt-2 text-xl font-semibold">{mode.title}</h3>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{mode.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">{raw === "zh" ? "区域" : "Regions"}</p>
              <h2 className="heading mt-3 text-3xl">{dict.compute.regionsTitle}</h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {dict.compute.regions.map((region) => (
                <Reveal key={region.title}>
                  <article className="panel p-5 sm:p-6">
                    <h3 className="serif text-xl font-semibold">{region.title}</h3>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{region.body}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-[var(--ink-muted)]">
                      {region.points.map((point) => (
                        <li key={point}>· {point}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[color-mix(in_srgb,var(--bg-muted)_50%,transparent)]">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{raw === "zh" ? "协同" : "Coordination"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {dict.compute.processTitle}
            </h2>
            <p className="lead mt-4">{dict.compute.processSub}</p>
          </Reveal>
          <div className="relative mt-12 grid gap-6 md:grid-cols-4">
            <div className="flow-line pointer-events-none absolute top-[1.15rem] right-8 left-8 hidden md:block" />
            {dict.compute.process.map((step, i) => (
              <Reveal key={step.title}>
                <article className="relative">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--teal)]">
                    {i + 1}
                  </div>
                  <h3 className="serif text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow">{raw === "zh" ? "原则" : "Principles"}</p>
            <h2 className="heading mt-3 text-3xl">{dict.compute.principlesTitle}</h2>
            <ul className="mt-8 space-y-4">
              {dict.compute.principles.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <article className="panel h-full p-6 sm:p-8">
              <p className="eyebrow">{dict.cta.guide}</p>
              <h2 className="heading mt-3 text-2xl sm:text-3xl">
                {dict.compute.guideLabel}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {dict.compute.guideNote}
              </p>
              <a
                href={dict.compute.guideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex text-sm font-semibold text-[var(--teal)]"
              >
                {dict.compute.guideUrl.replace("https://", "")} ↗
              </a>
            </article>
          </Reveal>
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
