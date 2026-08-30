import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionCTA } from "@/components/SectionCTA";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.solutions.title, dict.solutions.sub, "/solutions");
}

export default async function SolutionsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const labels =
    raw === "zh"
      ? { pain: "痛点", method: "我们的方法", deliverables: "交付物", fit: "适用客户" }
      : {
          pain: "Pain point",
          method: "Our approach",
          deliverables: "Deliverables",
          fit: "Best fit",
        };

  return (
    <>
      <PageHero title={dict.solutions.title} sub={dict.solutions.sub} />
      <section className="section">
        <div className="container space-y-6">
          {dict.solutions.items.map((item, i) => (
            <Reveal key={item.title}>
              <article className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.35fr_1fr]">
                <div>
                  <p className="mono text-xs text-[var(--orange)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="serif mt-3 text-2xl font-semibold leading-snug">
                    {item.title}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                      {labels.pain}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.pain}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                      {labels.method}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.method}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                      {labels.deliverables}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">
                      {item.deliverables}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                      {labels.fit}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.fit}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionCTA
        locale={raw}
        title={dict.sectionCta.title}
        sub={dict.sectionCta.sub}
        primaryLabel={dict.cta.consult}
        primaryHref="/contact?intent=client"
        secondaryLabel={dict.cta.viewCase}
        secondaryHref="/cases"
        eventSource="solutions"
      />
    </>
  );
}
