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
            <OffreHeader namespace="BrandingPage" />
            <PhotoSlider photos={examplePhotos} speed={25} />
            <BrandComparison namespace="BrandComparison" />
            <TimelineSection namespace="BrandingPage.WhyBranding" />
            <BentoGrid namespace="BrandingPage.BentoGrid" />
            <FaqSection namespace="BrandingPage.FaqSection" count={6} />
            <WhatWeDoSection
                variant="card"
                color1="rgba(244, 114, 182, 0.7)" // Custom pink color
                color2="rgba(168, 85, 247, 0.5)" // Custom purple color
                bgColor="#0b1221" // Base dark background
            />
            <TitleColumnsSection namespace="BrandingPage.ExpertiseSection" />
        </main>
    );
}
