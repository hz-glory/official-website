import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import type { CaseStudy, Dictionary } from "@/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return { title: dict.cases.title, description: dict.cases.sub };
}

function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((r) => (
        <li key={r} className="flex gap-2 text-sm text-[var(--ink-soft)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}

function ApplicableChips({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((a) => (
        <li
          key={a}
          className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 text-xs text-[var(--ink-soft)]"
        >
          {a}
        </li>
      ))}
    </ul>
  );
}

function FullCase({
  item,
  dict,
}: {
  item: CaseStudy;
  dict: Dictionary;
}) {
  return (
    <article id={item.id} className="panel scroll-mt-28 p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
        {item.industry}
      </p>
      <h3 className="serif mt-2 text-2xl font-semibold sm:text-3xl">
        {item.title}
      </h3>
      <p className="mt-4 max-w-3xl text-sm text-[var(--ink-soft)]">
        {item.summary}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.challenge}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            {item.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.approach}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            {item.approach}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.solution}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            {item.solution}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.results}
          </h4>
          <HighlightList items={item.results} />
        </div>
      </div>

      {item.modules && item.modules.length > 0 ? (
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.modules}
          </h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {item.modules.map((mod) => (
              <div
                key={mod.title}
                className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] p-4"
              >
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {mod.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {mod.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {item.highlights && item.highlights.length > 0 ? (
        <div className="mt-8 border-t border-[var(--line)] pt-6">
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.highlights}
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-sm text-[var(--ink-soft)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {item.applicable && item.applicable.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.applicable}
          </h4>
          <ApplicableChips items={item.applicable} />
        </div>
      ) : null}
    </article>
  );
}

function BriefCase({ item, dict }: { item: CaseStudy; dict: Dictionary }) {
  return (
    <article id={item.id} className="panel scroll-mt-28 flex h-full flex-col p-6">
      <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
        {item.industry}
      </p>
      <h3 className="serif mt-2 text-xl font-semibold">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
        {item.summary}
      </p>
      {item.highlights && item.highlights.length > 0 ? (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-[var(--teal)]">
            {dict.cases.labels.highlights}
          </h4>
          <HighlightList items={item.highlights} />
        </div>
      ) : null}
      {item.applicable && item.applicable.length > 0 ? (
        <div className="mt-4">
          <ApplicableChips items={item.applicable} />
        </div>
      ) : null}
    </article>
  );
}

export default async function CasesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const enterprise = dict.cases.items.filter(
    (item) => item.group !== "public",
  );
  const publicItems = dict.cases.items.filter(
    (item) => item.group === "public",
  );
  const fullEnterprise = enterprise.filter((item) => item.format !== "brief");
  const briefEnterprise = enterprise.filter((item) => item.format === "brief");

  return (
    <>
      <PageHero title={dict.cases.title} sub={dict.cases.sub} />
      <section className="section">
        <div className="container space-y-16">
          <div>
            <Reveal>
              <p className="eyebrow">{dict.cases.labels.enterpriseTitle}</p>
              <p className="lead mt-3 max-w-3xl">
                {dict.cases.labels.enterpriseLead}
              </p>
            </Reveal>
            <div className="mt-8 space-y-8">
              {fullEnterprise.map((item) => (
                <Reveal key={item.id}>
                  <FullCase item={item} dict={dict} />
                </Reveal>
              ))}
            </div>
            {briefEnterprise.length > 0 ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {briefEnterprise.map((item) => (
                  <Reveal key={item.id}>
                    <BriefCase item={item} dict={dict} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">{dict.cases.labels.publicTitle}</p>
              <p className="lead mt-3 max-w-3xl">
                {dict.cases.labels.publicLead}
              </p>
            </Reveal>
            <div className="mt-8 space-y-8">
              {publicItems.map((item) => (
                <Reveal key={item.id}>
                  <FullCase item={item} dict={dict} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
