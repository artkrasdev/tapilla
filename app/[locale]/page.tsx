import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import LogoMarquee from "@/components/LogoMarquee";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import FaqSection from "@/components/FaqSection";
import AgencyTabs from "@/components/AgencyTabs";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...generatePageMetadata(seoConfigs.home, locale),
    openGraph: {
      ...generatePageMetadata(seoConfigs.home, locale).openGraph,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Tapilla — E-Commerce Web Agency",
        },
      ],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <SchemaMarkup type="LocalBusiness" locale={locale} url={`/${locale}`} />
      <SchemaMarkup type="WebSite" locale={locale} url={`/${locale}`} />
      <main>
        <HeroSection />
        <LogoMarquee speed={30} />
        <BrandsSection />
        <WhatWeDoSection />
        <AgencyTabs />
        <FaqSection />
      </main>
    </>
  );
}
