import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.insights.title, dict.insights.sub, "/insights", false);
}

export default async function InsightsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero title={dict.insights.title} sub={dict.insights.sub} />
      <section className="section">
        <div className="container max-w-2xl">
          <Reveal>
            <article className="panel p-6 sm:p-8">
              <p className="eyebrow">
                {raw === "zh" ? "即将上线" : "Coming soon"}
              </p>
              <h2 className="heading mt-4 text-2xl sm:text-3xl">
                {raw === "zh"
                  ? "洞察栏目正在筹备中"
                  : "Insights is being prepared"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {dict.insights.empty}
              </p>
              <Link
                href={localePath(raw, "/contact?intent=client")}
                className="btn btn-primary mt-8"
              >
                {dict.cta.consult}
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
