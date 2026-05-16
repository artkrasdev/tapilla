import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OffreHeader from "@/components/OffreHeader";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PhotoSlider from "@/components/PhotoSlider";
import BrandComparison from "@/components/BrandComparison";
import TimelineSection from "@/components/TimelineSection";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";
import CTABanner from "@/components/CTABanner";
import SchemaMarkup, { buildFaqSchema } from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

const EXAMPLE_PHOTOS = [
  "/slider/service/slide-1.webp",
  "/slider/service/slide-2.webp",
  "/slider/service/slide-3.webp",
  "/slider/service/slide-4.webp",
  "/slider/service/slide-5.webp",
  "/slider/service/slide-6.webp",
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(seoConfigs.uxUi, locale);
}

export default async function UxUiPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("UxUiPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 6, "UxUiPage");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/ux-ui-webdesign`}
        data={{
          serviceType: "UX/UI Design",
          name: "UX/UI Design Services",
          description:
            locale === "ru"
              ? "Услуги UX/UI дизайна для электронной коммерции и корпоративных сайтов"
              : "UX/UI design services for e-commerce and corporate websites",
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/ux-ui-webdesign`}
        data={{ questions: faqQuestions }}
      />
      <main>
        <OffreHeader
          namespace="UxUiPage"
          primaryColor="rgba(6, 182, 212, 0.65)"
          secondaryColor="rgba(59, 130, 246, 0.5)"
        />
        <PhotoSlider photos={EXAMPLE_PHOTOS} speed={25} />
        <BrandComparison
          namespace="UxUiPage.BrandComparison"
          headerLayout="split"
          showCardSubtitle={false}
          showLeftCardDescription={false}
          rightCardVariant="paragraph"
        />
        <BentoGrid namespace="UxUiPage.BentoGrid" />
        <TimelineSection
          namespace="UxUiPage.TimelineSection"
          itemKeys={["approach", "history"]}
          itemIcons={["/brand-expieince.svg", "/tech-data.svg"]}
        />
        <CTABanner
          namespace="UxUiPage.CTABanner"
          buttonHref="#contact"
          colors={{
            color1: "rgba(6, 182, 212, 0.6)",
            color2: "rgba(99, 102, 241, 0.5)",
          }}
        />
        <FaqSection namespace="UxUiPage.FaqSection" count={6} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(6, 182, 212, 0.7)" // Cyan
          color2="rgba(59, 130, 246, 0.5)" // Blue
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="UxUiPage.ExpertiseSection" />
      </main>
    </>
  );
}
