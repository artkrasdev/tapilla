import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OffreHeader from "@/components/OffreHeader";
import BrandsSection from "@/components/BrandsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PhotoSlider from "@/components/PhotoSlider";
import TimelineSection from "@/components/TimelineSection";
import ThreeCardsGrid from "@/components/ThreeCardsGrid";
import NumberedCardsGrid from "@/components/NumberedCardsGrid";
import CTABanner from "@/components/CTABanner";
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
  return generatePageMetadata(seoConfigs.wordpress, locale);
}

export default async function WordPressPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("WordPressPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 5, "FaqSection");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/wordpress`}
        data={{
          serviceType: "WordPress Development",
          name: "Custom WordPress Development Services",
          description:
            locale === "ru"
              ? "Услуги кастомной разработки WordPress для корпоративных сайтов"
              : "Custom WordPress development services for corporate websites",
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/wordpress`}
        data={{ questions: faqQuestions }}
      />
      <main>
        <OffreHeader
          namespace="WordPressPage"
          primaryColor="rgba(34, 113, 177, 0.65)"
          secondaryColor="rgba(19, 94, 150, 0.5)"
        />
        <PhotoSlider photos={EXAMPLE_PHOTOS} speed={25} />
        <BrandsSection namespace="WordPressPage.BrandsSection" pb="2rem" />
        <ThreeCardsGrid namespace="WordPressPage.BentoGrid" />
        <NumberedCardsGrid namespace="WordPressPage.NumberedCardsGrid" />
        <TimelineSection
          namespace="WordPressPage.TimelineSection"
          itemKeys={["freedom", "selection", "connectivity", "seo"]}
          itemIcons={[
            "/identity.svg",
            "/our-history.svg",
            "/brand-expieince.svg",
            "/tech-data.svg",
          ]}
        />
        <CTABanner
          namespace="WordPressPage.CTABanner"
          colors={{
            color1: "rgba(34, 113, 177, 0.75)",
            color2: "rgba(19, 94, 150, 0.55)",
            color3: "rgba(0, 124, 186, 0.45)",
          }}
        />
        <FaqSection namespace="WordPressPage.FaqSection" count={5} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(34, 113, 177, 0.7)" // WordPress blue
          color2="rgba(19, 94, 150, 0.5)" // Darker WordPress blue
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="WordPressPage.ExpertiseSection" />
      </main>
    </>
  );
}
