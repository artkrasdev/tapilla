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
import RightToolSection from "@/components/RightToolSection";
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
            <OffreHeader
                namespace="AutomationPage"
                primaryColor="rgba(255, 109, 0, 0.65)"
                secondaryColor="rgba(230, 81, 0, 0.5)"
            />
            <Image
                src="/automation.webp"
                alt="Eye"
                className="w-full h-auto max-h-[21rem] -translate-y-18 bg-black object-cover"
                width={1920}
                height={800}
            />
            <RightToolSection namespace="AutomationPage.RightTool" />
            <BentoGrid namespace="AutomationPage.BentoGrid" />
            <CTABanner
                namespace="AutomationPage.CTABanner"
                buttonHref="#contact"
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
    );
}
