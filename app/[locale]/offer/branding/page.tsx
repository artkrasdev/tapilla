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
  return generatePageMetadata(seoConfigs.branding, locale);
}

export default async function BrandingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("BrandingPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 6, "BrandingPage");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/branding`}
        data={{
          serviceType: "Branding & Identity",
          name: "Brand Identity & Strategy Services",
          description:
            locale === "ru"
              ? "Услуги по разработке айдентики и стратегии бренда"
              : "Brand identity and strategy development services",
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/branding`}
        data={{ questions: faqQuestions }}
      />
      <main>
        <OffreHeader
          namespace="BrandingPage"
          primaryColor="rgba(232, 74, 151, 0.65)"
          secondaryColor="rgba(147, 51, 234, 0.5)"
        />
        <PhotoSlider photos={EXAMPLE_PHOTOS} speed={25} />
        <BrandComparison namespace="BrandComparison" />
        <TimelineSection namespace="BrandingPage.WhyBranding" />
        <BentoGrid namespace="BrandingPage.BentoGrid" />
        <FaqSection namespace="BrandingPage.FaqSection" count={6} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(232, 74, 151, 0.7)" // Magenta
          color2="rgba(147, 51, 234, 0.5)" // Purple
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="BrandingPage.ExpertiseSection" />
      </main>
    </>
  );
}
