"use client";

import OffreHeader from "@/components/OffreHeader";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PhotoSlider from "@/components/PhotoSlider";
import BrandComparison from "@/components/BrandComparison";
import TimelineSection from "@/components/TimelineSection";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";
import CTABanner from "@/components/CTABanner";

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
                namespace="UxUiPage"
                primaryColor="rgba(6, 182, 212, 0.65)"
                secondaryColor="rgba(59, 130, 246, 0.5)"
            />
            <PhotoSlider photos={examplePhotos} speed={25} />
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
    );
}
