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

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.about.title, dict.about.sub, "/about");
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero title={dict.about.title} sub={dict.about.sub} />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="heading text-3xl">{dict.about.story.title}</h2>
            <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
              {dict.about.story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
              <Image
                src="/images/collaboration.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="methodology"
        className="section bg-[color-mix(in_srgb,var(--bg-muted)_50%,transparent)]"
      >
        <div className="container">
          <Reveal>
            <p className="eyebrow">FDE</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {dict.about.method.title}
            </h2>
            <p className="lead mt-4 max-w-3xl">{dict.about.method.intro}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="panel h-full p-6 sm:p-8">
                <h3 className="serif text-xl font-semibold">
                  {dict.about.method.palantir.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {dict.about.method.palantir.body}
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="panel h-full p-6 sm:p-8">
                <h3 className="serif text-xl font-semibold">
                  {dict.about.method.local.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {dict.about.method.local.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm text-[var(--ink-soft)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-10">
              <h3 className="serif text-2xl font-semibold">
                {dict.about.method.lifecycle.title}
              </h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dict.about.method.lifecycle.steps.map((step, i) => (
                  <li
                    key={step}
                    className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-4"
                  >
                    <p className="mono text-xs text-[var(--orange)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm font-medium">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="team" className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{raw === "zh" ? "团队" : "Team"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {dict.about.team.title}
            </h2>
            <p className="lead mt-4">{dict.about.team.sub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.about.team.members.map((member) => (
              <Reveal key={member.name}>
                <article className="panel h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#d9772c33,#2f6f6a33)] text-sm font-semibold text-[var(--ink)]">
                    {member.name.slice(0, 1)}
                  </div>
                  <h3 className="serif text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--orange)]">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <article className="panel mt-8 p-6 sm:p-8">
              <h3 className="serif text-2xl font-semibold">
                {dict.about.committee.title}
              </h3>
              <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
                {dict.about.committee.body}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <SectionCTA
        locale={raw}
        title={dict.sectionCta.title}
        sub={dict.sectionCta.sub}
        primaryLabel={dict.cta.consult}
        primaryHref="/contact?intent=client"
        secondaryLabel={dict.sectionCta.secondaryAbout}
        secondaryHref="/about#methodology"
        eventSource="about"
      />
    </>
  );
}
