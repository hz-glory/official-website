import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return { title: dict.insights.title, description: dict.insights.sub };
}

export default async function InsightsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero title={dict.insights.title} sub={dict.insights.sub} />
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {dict.insights.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {dict.insights.placeholders.map((item) => (
              <Reveal key={item.title}>
                <article className="panel h-full p-6">
                  <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                    {item.category}
                  </p>
                  <h2 className="serif mt-3 text-xl font-semibold leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm text-[var(--ink-soft)]">{item.excerpt}</p>
                  <p className="mt-5 text-xs text-[var(--ink-muted)]">
                    {raw === "zh" ? "即将发布" : "Coming soon"}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm text-[var(--ink-muted)]">{dict.insights.empty}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
