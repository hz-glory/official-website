import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);
  const featured = dict.cases.items.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-content">
          <p className="hero-animate serif text-3xl font-semibold tracking-tight text-[#fff8f0] sm:text-5xl md:text-6xl">
            {dict.home.hero.brand}
          </p>
          <h1 className="hero-animate-delay mt-5 max-w-3xl text-xl font-medium leading-snug text-[#f3ebe1] sm:text-2xl md:text-[1.75rem]">
            {dict.home.hero.headline}
          </h1>
          <p className="hero-animate-delay-2 mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-[rgba(248,242,234,0.84)] sm:text-base">
            {dict.home.hero.sub}
          </p>
          <div className="hero-animate-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href={localePath(locale, "/contact?intent=client")}
              className="btn btn-primary"
            >
              {dict.home.hero.primaryCta}
            </Link>
            <Link
              href={localePath(locale, "/about#methodology")}
              className="btn btn-secondary !border-[rgba(255,248,240,0.35)] !text-[#fff8f0] hover:!border-[#fff8f0]"
            >
              {dict.home.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{locale === "zh" ? "痛点共鸣" : "Resonance"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">{dict.home.pain.title}</h2>
            <p className="lead mt-4">{dict.home.pain.sub}</p>
          </Reveal>
          <div className="stagger mt-10 grid gap-5 md:grid-cols-3">
            {dict.home.pain.items.map((item, i) => (
              <Reveal key={item.title}>
                <article className="h-full border-t border-[var(--line)] pt-5">
                  <p className="step-index">0{i + 1}</p>
                  <h3 className="serif mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-[var(--ink-soft)]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[color-mix(in_srgb,var(--bg-muted)_55%,transparent)]">
        <div className="container">
          <Reveal>
            <p className="eyebrow">FDE</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">{dict.home.method.title}</h2>
            <p className="lead mt-4">{dict.home.method.sub}</p>
          </Reveal>
          <div className="relative mt-12 grid gap-6 md:grid-cols-4">
            <div className="flow-line pointer-events-none absolute top-[1.15rem] right-8 left-8 hidden md:block" />
            {dict.home.method.steps.map((step, i) => (
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
        <div className="container">
          <Reveal>
            <p className="eyebrow">{locale === "zh" ? "能力" : "Capabilities"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">
              {dict.home.capabilities.title}
            </h2>
            <p className="lead mt-4">{dict.home.capabilities.sub}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {dict.home.capabilities.items.map((item, i) => (
              <Reveal key={item.title}>
                <article className="panel flex h-full flex-col gap-3 p-6">
                  <p className="mono text-xs text-[var(--orange)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="serif text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--line)]">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow">{locale === "zh" ? "行业" : "Industries"}</p>
              <h2 className="heading mt-3 text-3xl sm:text-4xl">
                {dict.home.industries.title}
              </h2>
              <p className="lead mt-4">{dict.home.industries.sub}</p>
            </Reveal>
            <div className="mt-8 space-y-5">
              {dict.home.industries.primary.map((item) => (
                <Reveal key={item.title}>
                  <article className="border-l-2 border-[var(--teal)] pl-4">
                    <h3 className="serif text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ink-muted)]">
                {dict.home.industries.secondary.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <Link
                href={localePath(locale, "/industries")}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--teal)]"
              >
                {dict.cta.learnMore} →
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
              <Image
                src="/images/manufacturing.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{locale === "zh" ? "案例" : "Cases"}</p>
                <h2 className="heading mt-3 text-3xl sm:text-4xl">
                  {dict.home.cases.title}
                </h2>
                <p className="lead mt-4">{dict.home.cases.sub}</p>
              </div>
              <Link
                href={localePath(locale, "/cases")}
                className="text-sm font-semibold text-[var(--teal)]"
              >
                {dict.cta.viewCase} →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((item) => (
              <Reveal key={item.id}>
                <article className="panel flex h-full flex-col p-6">
                  <p className="text-xs font-semibold tracking-wide text-[var(--orange)]">
                    {item.industry}
                  </p>
                  <h3 className="serif mt-3 text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-[var(--ink-soft)]">
                    {item.summary}
                  </p>
                  <Link
                    href={localePath(locale, `/cases#${item.id}`)}
                    className="mt-5 text-sm font-semibold text-[var(--teal)]"
                  >
                    {dict.cta.viewCase} →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[color-mix(in_srgb,var(--bg-muted)_50%,transparent)]">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{locale === "zh" ? "成长范式" : "Growth model"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">{dict.home.growth.title}</h2>
            <p className="lead mt-4">{dict.home.growth.sub}</p>
          </Reveal>
          <div className="mt-12 grid gap-0 md:grid-cols-3">
            {dict.home.growth.stages.map((stage, i) => (
              <Reveal key={stage.title}>
                <article
                  className={`h-full border border-[var(--line)] bg-[var(--bg-elevated)] p-6 ${
                    i === 0 ? "md:rounded-l-[var(--radius)]" : ""
                  } ${i === 2 ? "md:rounded-r-[var(--radius)]" : ""} ${
                    i > 0 ? "md:-ml-px" : ""
                  }`}
                >
                  <p className="mono text-xs text-[var(--teal)]">
                    {locale === "zh" ? `阶段 ${i + 1}` : `Stage ${i + 1}`}
                  </p>
                  <h3 className="serif mt-3 text-xl font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-xs font-medium text-[var(--orange)]">
                    {stage.period}
                  </p>
                  <p className="mt-4 text-sm text-[var(--ink-soft)]">{stage.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 max-w-3xl text-sm text-[var(--ink-muted)]">
              {dict.home.growth.note}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{locale === "zh" ? "信任" : "Trust"}</p>
            <h2 className="heading mt-3 text-3xl sm:text-4xl">{dict.home.trust.title}</h2>
            <p className="lead mt-4">{dict.home.trust.sub}</p>
            <ul className="mt-8 space-y-4">
              {dict.home.trust.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm text-[var(--ink-soft)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href={localePath(locale, "/about#team")}
              className="mt-8 inline-flex text-sm font-semibold text-[var(--teal)]"
            >
              {dict.cta.learnMore} →
            </Link>
          </Reveal>
          <Reveal>
            <article className="panel h-full p-8">
              <p className="eyebrow">{locale === "zh" ? "窗口期" : "Outlook"}</p>
              <h2 className="heading mt-3 text-2xl sm:text-3xl">
                {dict.home.outlook.title}
              </h2>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
                {dict.home.outlook.body}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-tight pb-20">
        <div className="container">
          <Reveal>
            <div className="panel relative overflow-hidden px-6 py-10 sm:px-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(500px 200px at 10% 0%, rgba(217,119,44,0.12), transparent), radial-gradient(400px 180px at 90% 100%, rgba(47,111,106,0.1), transparent)",
                }}
              />
              <div className="relative">
                <h2 className="heading text-3xl sm:text-4xl">{dict.home.finalCta.title}</h2>
                <p className="lead mt-4">{dict.home.finalCta.sub}</p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {dict.home.finalCta.items.map((item) => (
                    <Link
                      key={item.label}
                      href={localePath(locale, item.href)}
                      className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[rgba(255,253,249,0.7)] p-5 transition hover:border-[var(--teal)]"
                    >
                      <p className="serif text-lg font-semibold">{item.label}</p>
                      <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
