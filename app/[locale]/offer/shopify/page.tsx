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
  return generatePageMetadata(seoConfigs.shopify, locale);
}

export default async function ShopifyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("ShopifyPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 6, "ShopifyPage");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/shopify`}
        data={{
          serviceType: "Shopify Development",
          name: "Shopify Plus Development Services",
          description:
            locale === "ru"
              ? "Сертифицированные услуги разработки Shopify Plus"
              : "Certified Shopify Plus development services",
          provider: {
            "@type": "Organization",
            name: "Tapilla",
            url: "https://tapilla.com",
          },
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/shopify`}
        data={{ questions: faqQuestions }}
      />
      <main>
        <OffreHeader
          namespace="ShopifyPage"
          primaryColor="rgba(150, 191, 72, 0.65)"
          secondaryColor="rgba(94, 142, 62, 0.5)"
        />
        <PhotoSlider photos={EXAMPLE_PHOTOS} speed={25} />
        <BentoGrid namespace="ShopifyPage.BentoGrid" />
        <BrandComparison
          namespace="ShopifyPage.BrandComparison"
          headerLayout="twoPanel"
        />
        <TimelineSection
          namespace="ShopifyPage.TimelineSection"
          itemKeys={["tma", "international", "emailing", "studio"]}
          itemIcons={[
            "/identity.svg",
            "/our-history.svg",
            "/brand-expieince.svg",
            "/tech-data.svg",
          ]}
        />
        <FaqSection namespace="ShopifyPage.FaqSection" count={10} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(150, 191, 72, 0.7)" // Shopify green
          color2="rgba(94, 142, 62, 0.5)" // Darker Shopify green
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="ShopifyPage.ExpertiseSection" />
      </main>
    </>
  );
}
