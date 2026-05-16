import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TextSection from "@/components/TextSection";
import ValueSlider from "@/components/ValueSlider";
import TimelineSection from "@/components/TimelineSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(seoConfigs.agency, locale);
}

export default async function AgencyPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        locale={locale}
        url={`/${locale}/agency`}
        data={{
          name: "Tapilla Digital Agency",
          description:
            locale === "ru"
              ? "Цифровое агентство с 25-летним опытом в электронной коммерции и дизайне"
              : "Digital agency with 25+ years of e-commerce and design expertise",
        }}
      />
      <main>
        <PageHeader
          namespace="AgencyPage"
          buttonLink={`/${locale}/services`}
        />

        {/* Agency video */}
        <section className="bg-black px-[5%] md:px-8 lg:px-12 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-content">
            <video
              src="/theagency.webm"
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-4/3 sm:aspect-2/1 md:aspect-21/9 lg:aspect-3/1 rounded-xl object-cover"
            />
          </div>
        </section>

        <TextSection />
        <ValueSlider />
        <TimelineSection namespace="AgencyPage.Differences" />
      </main>
    </>
  );
}

