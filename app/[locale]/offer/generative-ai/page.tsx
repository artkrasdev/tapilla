"use client";

import OffreHeader from "@/components/OffreHeader";
import VideoCapsulesSection from "@/components/VideoCapsulesSection";
import PackshotsSection from "@/components/PackshotsSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import PhotoSlider from "@/components/PhotoSlider";
import BrandComparison from "@/components/BrandComparison";
import TimelineSection from "@/components/TimelineSection";
import BentoGrid from "@/components/BentoGrid";
import FaqSection from "@/components/FaqSection";
import TitleColumnsSection from "@/components/TitleColumnsSection";
import CTABanner from "@/components/CTABanner";
import Image from "next/image";

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
        <main className="bg-black">
            <OffreHeader namespace="GenerativeAIPage" />
            <Image
                src="/eye.webp"
                alt="Eye"
                className="w-full h-auto max-h-[21rem] -translate-y-18 bg-black object-cover"
                width={1920}
                height={800}
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
                buttonHref="#contact"
                colors={{
                    color1: "rgba(6, 182, 212, 0.6)",
                    color2: "rgba(99, 102, 241, 0.5)",
                }}
            />
            <FaqSection namespace="GenerativeAIPage.FaqSection" count={6} />
            <WhatWeDoSection
                variant="card"
                color1="rgba(244, 114, 182, 0.7)" // Custom pink color
                color2="rgba(168, 85, 247, 0.5)" // Custom purple color
                bgColor="#0b1221" // Base dark background
            />
            <TitleColumnsSection namespace="GenerativeAIPage.ExpertiseSection" />
        </main>
    );
}
