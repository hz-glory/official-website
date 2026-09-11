import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionCTA } from "@/components/SectionCTA";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const imageMap: Record<string, string> = {
  primary: "/images/manufacturing.jpg",
  core: "/images/trade.jpg",
  secondary: "/images/hangzhou.jpg",
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.industries.title, dict.industries.sub, "/industries");
}

export default async function IndustriesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const labels =
    raw === "zh"
      ? {
          persona: "典型客户画像",
          scenarios: "常见业务场景",
          problems: "我们能解决的问题类型",
          primary: "重点方向",
          core: "核心场景",
          secondary: "延展场景",
        }
      : {
          persona: "Typical clients",
          scenarios: "Common scenarios",
          problems: "Problem types we address",
          primary: "Focus areas",
          core: "Core scenarios",
          secondary: "Adjacent",
        };

  const primary = dict.industries.items.filter((i) => i.priority === "primary");
  const core = dict.industries.items.filter((i) => i.priority === "core");
  const secondary = dict.industries.items.filter((i) => i.priority === "secondary");

  return (
    <>
      <PageHero title={dict.industries.title} sub={dict.industries.sub} />

      <section className="section">
        <div className="container space-y-16">
          <div>
            <Reveal>
              <p className="eyebrow">{labels.primary}</p>
            </Reveal>
            <div className="mt-6 space-y-6">
              {primary.map((item, idx) => (
                <Reveal key={item.title}>
                  <article className="panel grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[220px]">
                      <Image
                        src={idx === 0 ? "/images/manufacturing.jpg" : "/images/government.jpg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h2 className="serif text-2xl font-semibold sm:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-4 text-sm text-[var(--ink-soft)]">
                        <span className="font-semibold text-[var(--ink)]">
                          {labels.persona}：
                        </span>
                        {item.persona}
                      </p>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                            {labels.scenarios}
                          </p>
                          <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-soft)]">
                            {item.scenarios.map((s) => (
                              <li key={s}>· {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                            {labels.problems}
                          </p>
                          <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-soft)]">
                            {item.problems.map((s) => (
                              <li key={s}>· {s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">{labels.core}</p>
            </Reveal>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {core.map((item) => (
                <Reveal key={item.title}>
                  <article className="panel h-full p-6 sm:p-7">
                    <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[var(--radius-sm)]">
                      <Image
                        src={imageMap.core}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <h2 className="serif text-2xl font-semibold">{item.title}</h2>
                    <p className="mt-3 text-sm text-[var(--ink-soft)]">{item.persona}</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <ul className="space-y-1.5 text-sm text-[var(--ink-soft)]">
                        {item.scenarios.map((s) => (
                          <li key={s}>· {s}</li>
                        ))}
                      </ul>
                      <ul className="space-y-1.5 text-sm text-[var(--ink-soft)]">
                        {item.problems.map((s) => (
                          <li key={s}>· {s}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">{labels.secondary}</p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {secondary.map((item) => (
                <Reveal key={item.title}>
                  <article className="border-t border-[var(--line)] pt-4">
                    <h3 className="serif text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.persona}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
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
        eventSource="industries"
      />
    </>
  );
}
