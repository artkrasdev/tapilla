import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OffreHeader from "@/components/OffreHeader";
import VideoCapsulesSection from "@/components/VideoCapsulesSection";
import PackshotsSection from "@/components/PackshotsSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import BrandComparison from "@/components/BrandComparison";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";
import CTABanner from "@/components/CTABanner";
import Image from "next/image";
import SchemaMarkup, { buildFaqSchema } from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(seoConfigs.generativeAi, locale);
}

export default async function GenerativeAiPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("GenerativeAIPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 6, "GenerativeAIPage");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/generative-ai`}
        data={{
          serviceType: "Generative AI Services",
          name: "AI-Powered Visual Content Production",
          description:
            locale === "ru"
              ? "Услуги по производству визуального контента на основе ИИ для брендов"
              : "AI-powered visual content production services for brands",
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/generative-ai`}
        data={{ questions: faqQuestions }}
      />
      <main className="bg-black">
        <OffreHeader
          namespace="GenerativeAIPage"
          primaryColor="rgba(6, 182, 212, 0.65)"
          secondaryColor="rgba(99, 102, 241, 0.5)"
        />
        <Image
          src="/eye.webp"
          alt="Generative AI visual - artistic eye representing AI-powered creative vision"
          className="w-full h-auto max-h-[21rem] -translate-y-18 bg-black object-cover"
          width={1920}
          height={800}
          priority
        />
        <BrandComparison
          namespace="GenerativeAIPage.BrandComparison"
          headerLayout="twoPanel"
        />
        <PackshotsSection />
        <VideoCapsulesSection />
        <ImpactStatsSection />
        <BentoGrid namespace="GenerativeAIPage.BentoGrid" />
        <CTABanner
          namespace="GenerativeAIPage.CTABanner"
          colors={{
            color1: "rgba(6, 182, 212, 0.6)",
            color2: "rgba(99, 102, 241, 0.5)",
          }}
        />
        <FaqSection namespace="GenerativeAIPage.FaqSection" count={6} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(6, 182, 212, 0.7)" // Cyan
          color2="rgba(99, 102, 241, 0.5)" // Indigo
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="GenerativeAIPage.ExpertiseSection" />
      </main>
    </>
  );
}
