import { notFound } from "next/navigation";
import { ComputeInquiryForm } from "@/components/ComputeInquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { resolveInquiryPrefill } from "@/lib/contact/compute-inquiry";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ model?: string; mode?: string; from?: string; resource?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.compute.title, dict.compute.sub, "/compute");
}

export default async function ComputePage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const query = await searchParams;
  const prefill = resolveInquiryPrefill(query);

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
              <a href="#inquiry" className="btn btn-primary">
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

      <section id="hardware" className="section-tight scroll-mt-24">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.compute.modesTitle}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">{dict.compute.modelsTitle}</h2>
            <p className="lead mt-4 max-w-3xl">{dict.compute.modelsSub}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {dict.compute.models.map((model) => (
              <article key={model.id} id={model.id} className="panel scroll-mt-24 p-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                  {model.tag}
                </p>
                <h3 className="serif mt-2 text-2xl font-semibold">{model.name}</h3>
                <p className="mt-3 text-sm text-[var(--ink-soft)]">{model.body}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-[var(--ink-muted)]">
                  {model.points.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={localePath(raw, `/compute?model=${model.id}&mode=lease#inquiry`)}
                    className="btn btn-primary !min-h-10 !px-3.5 !text-sm"
                  >
                    {dict.compute.leaseCta}
                  </a>
                  <a
                    href={localePath(raw, `/compute?model=${model.id}&mode=purchase#inquiry`)}
                    className="btn btn-secondary !min-h-10 !px-3.5 !text-sm"
                  >
                    {dict.compute.purchaseCta}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {dict.compute.modes.map((mode) => (
              <p key={mode.title} className="text-sm text-[var(--ink-soft)]">
                <span className="font-semibold text-[var(--ink)]">
                  {mode.title}
                  {raw === "zh" ? "。" : ". "}
                </span>
                {mode.body}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="section-tight scroll-mt-24">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="heading text-3xl sm:text-4xl">{dict.compute.ctaTitle}</h2>
            <p className="lead mt-4">{dict.compute.ctaSub}</p>
          </Reveal>
          <div className="mt-8">
            <ComputeInquiryForm
              dict={dict}
              locale={raw}
              prefill={prefill}
              defaultFrom={query.from || (query.model ? `model-${query.model}` : undefined)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
