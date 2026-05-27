import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OffreHeader from "@/components/OffreHeader";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";
import CTABanner from "@/components/CTABanner";
import RightToolSection from "@/components/RightToolSection";
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
  return generatePageMetadata(seoConfigs.automation, locale);
}

export default async function AutomationPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("AutomationPage");

  // Build FAQ schema for this page
  const faqQuestions = buildFaqSchema(t as unknown as (key: string) => string, 6, "FaqSection");

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/offer/automation`}
        data={{
          serviceType: "Workflow Automation",
          name: "Business Process Automation Services",
          description:
            locale === "ru"
              ? "Услуги автоматизации бизнес-процессов и системной интеграции"
              : "Business process automation and system integration services",
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        locale={locale}
        url={`/${locale}/offer/automation`}
        data={{ questions: faqQuestions }}
      />
      <main className="bg-black">
        <OffreHeader
          namespace="AutomationPage"
          primaryColor="rgba(255, 109, 0, 0.65)"
          secondaryColor="rgba(230, 81, 0, 0.5)"
        />
        <Image
          src="/automation.webp"
          alt="Business workflow automation - interconnected systems and automated processes visualization"
          className="w-full h-auto max-h-[21rem] -translate-y-18 bg-black object-cover"
          width={1920}
          height={800}
          priority
        />
        <RightToolSection namespace="AutomationPage.RightTool" />
        <BentoGrid namespace="AutomationPage.BentoGrid" />
        <CTABanner
          namespace="AutomationPage.CTABanner"
          colors={{
            color1: "rgba(255, 109, 0, 0.75)",
            color2: "rgba(255, 145, 0, 0.6)",
            color3: "rgba(230, 81, 0, 0.45)",
          }}
        />
        <FaqSection namespace="AutomationPage.FaqSection" count={6} />
        <WhatWeDoSection
          variant="card"
          color1="rgba(255, 109, 0, 0.7)" // n8n Orange
          color2="rgba(230, 81, 0, 0.5)" // Darker n8n Orange
          bgColor="#0b1221" // Base dark background
        />
        <TitleColumnsSection namespace="AutomationPage.ExpertiseSection" />
      </main>
    </>
  );
}
