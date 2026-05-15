"use client";

import OffreHeader from "@/components/OffreHeader";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PhotoSlider from "@/components/PhotoSlider";
import BrandComparison from "@/components/BrandComparison";
import TimelineSection from "@/components/TimelineSection";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";

export default function BrandingPage() {
    const examplePhotos = [
        "/slider/service/slide-1.webp",
        "/slider/service/slide-2.webp",
        "/slider/service/slide-3.webp",
        "/slider/service/slide-4.webp",
        "/slider/service/slide-5.webp",
        "/slider/service/slide-6.webp",
    ];

    return (
        <main>
            <OffreHeader
                namespace="ShopifyPage"
                primaryColor="rgba(150, 191, 72, 0.65)"
                secondaryColor="rgba(94, 142, 62, 0.5)"
            />
            <PhotoSlider photos={examplePhotos} speed={25} />
            <BentoGrid namespace="ShopifyPage.BentoGrid" />
            <BrandComparison namespace="ShopifyPage.BrandComparison" headerLayout="twoPanel" />
            <TimelineSection namespace="ShopifyPage.TimelineSection" itemKeys={["tma", "international", "emailing", "studio"]} itemIcons={["/identity.svg", "/our-history.svg", "/brand-expieince.svg", "/tech-data.svg"]} />
            <FaqSection namespace="ShopifyPage.FaqSection" count={10} />
            <WhatWeDoSection
                variant="card"
                color1="rgba(150, 191, 72, 0.7)" // Shopify green
                color2="rgba(94, 142, 62, 0.5)" // Darker Shopify green
                bgColor="#0b1221" // Base dark background
            />
            <TitleColumnsSection namespace="ShopifyPage.ExpertiseSection" />
        </main>
    );
}
