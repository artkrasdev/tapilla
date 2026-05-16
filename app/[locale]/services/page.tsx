import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PhotoSlider from "@/components/PhotoSlider";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

const SLIDER_PHOTOS = [
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
  return generatePageMetadata(seoConfigs.services, locale);
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <SchemaMarkup
        type="Service"
        locale={locale}
        url={`/${locale}/services`}
        data={{
          serviceType: "Digital Services",
          name: "Tapilla Digital Services",
          description:
            locale === "ru"
              ? "Комплексные цифровые услуги от Tapilla"
              : "Comprehensive digital services by Tapilla",
        }}
      />
      <main>
        <PageHeader namespace="ServicesPage" />
        <PhotoSlider photos={SLIDER_PHOTOS} speed={27.5} />
        <WhatWeDoSection />
      </main>
    </>
  );
}
