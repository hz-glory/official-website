import Link from "next/link";
import { notFound } from "next/navigation";
import { ComputeInquiryForm } from "@/components/ComputeInquiryForm";
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
  return pageMeta(raw, dict.computeInquiry.title, dict.computeInquiry.sub, "/compute/inquiry");
}

export default async function ComputeInquiryPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);

  return (
    <>
      <PageHero
        eyebrow={dict.computeInquiry.eyebrow}
        title={dict.computeInquiry.title}
        sub={dict.computeInquiry.sub}
      />
      <section className="section">
        <div className="container max-w-4xl">
          <Reveal>
            <Link
              href={localePath(raw, "/compute")}
              className="mb-8 inline-flex text-sm font-semibold text-[var(--teal)]"
            >
              ← {dict.computeInquiry.back}
            </Link>
          </Reveal>
          <ComputeInquiryForm dict={dict} locale={raw} />
        </div>
      </section>
    </>
  );
}
