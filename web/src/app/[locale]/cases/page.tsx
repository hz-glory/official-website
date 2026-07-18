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
  return { title: dict.cases.title, description: dict.cases.sub };
}

export default async function CasesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero title={dict.cases.title} sub={dict.cases.sub} />
      <section className="section">
        <div className="container space-y-8">
          {dict.cases.items.map((item) => (
            <Reveal key={item.id}>
              <article id={item.id} className="panel scroll-mt-28 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                      {item.industry}
                    </p>
                    <h2 className="serif mt-2 text-2xl font-semibold sm:text-3xl">
                      {item.title}
                    </h2>
                  </div>
                  {item.stage ? (
                    <div className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] px-4 py-3">
                      <p className="text-xs font-semibold text-[var(--teal)]">
                        {dict.cases.labels.stage}
                      </p>
                      <div className="stage-dots mt-2">
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={`stage-dot ${item.stage && n <= item.stage.current ? "is-active" : ""}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-[var(--ink-soft)]">
                        {dict.cases.labels.stageNames[item.stage.current - 1]}
                      </p>
                    </div>
                  ) : null}
                </div>

                <p className="mt-4 max-w-3xl text-sm text-[var(--ink-soft)]">
                  {item.summary}
                </p>

                {item.stage ? (
                  <p className="mt-3 text-sm font-medium text-[var(--ink)]">
                    {item.stage.note}
                  </p>
                ) : null}

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--teal)]">
                      {dict.cases.labels.challenge}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--teal)]">
                      {dict.cases.labels.approach}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.approach}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--teal)]">
                      {dict.cases.labels.solution}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--teal)]">
                      {dict.cases.labels.results}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {item.results.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2 text-sm text-[var(--ink-soft)]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
