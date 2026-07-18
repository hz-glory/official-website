type Props = {
  eyebrow?: string;
  title: string;
  sub: string;
};

export function PageHero({ eyebrow, title, sub }: Props) {
  return (
    <section className="section-tight border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,253,249,0.7),transparent)]">
      <div className="container max-w-3xl pt-6">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h1 className="heading text-4xl sm:text-5xl">{title}</h1>
        <p className="lead mt-5">{sub}</p>
      </div>
    </section>
  );
}
