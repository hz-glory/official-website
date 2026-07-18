import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return { title: dict.careers.title, description: dict.careers.sub };
}

export default async function CareersPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero title={dict.careers.title} sub={dict.careers.sub} />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="heading text-3xl">{dict.careers.why.title}</h2>
            <ul className="mt-6 space-y-4">
              {dict.careers.why.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <article className="panel h-full p-6 sm:p-8">
              <h2 className="heading text-2xl">{dict.careers.culture.title}</h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
                {dict.careers.culture.body}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color-mix(in_srgb,var(--bg-muted)_45%,transparent)]">
        <div className="container">
          <Reveal>
            <h2 className="heading text-3xl">{dict.careers.roles.title}</h2>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">
              {dict.careers.roles.empty}
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {dict.careers.roles.items.map((role) => (
              <Reveal key={role.title}>
                <article className="panel flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="serif text-lg font-semibold">{role.title}</h3>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">
                      {role.type} · {role.loc}
                    </p>
                  </div>
                  <Link
                    href={localePath(raw, "/contact?intent=career")}
                    className="btn btn-secondary !min-h-9 !px-4 !text-sm"
                  >
                    {raw === "zh" ? "投递 / 沟通" : "Apply / Talk"}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
