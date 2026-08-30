import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ intent?: string; from?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return pageMeta(raw, dict.contact.title, dict.contact.sub, "/contact");
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const { intent, from } = await searchParams;

  return (
    <>
      <PageHero title={dict.contact.title} sub={dict.contact.sub} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[var(--teal)]">
                  {dict.contact.office}
                </p>
                <p className="serif mt-2 text-2xl font-semibold">
                  {dict.contact.officeValue}
                </p>
              </div>
              <div className="border-t border-[var(--line)] pt-6">
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  {raw === "zh"
                    ? "请通过表单留下联系方式与诉求。我们会按客户合作、招聘或投资合作分类跟进。"
                    : "Leave your details and intent via the form. We route inquiries across client partnerships, careers, and investment conversations."}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">
                  {dict.contact.form.privacyNote}
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
                <div
                  className="aspect-[4/3]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(47,111,106,0.12), rgba(217,119,44,0.1)), url('/images/hangzhou.jpg') center/cover",
                  }}
                />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm dict={dict} defaultIntent={intent} defaultFrom={from} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
