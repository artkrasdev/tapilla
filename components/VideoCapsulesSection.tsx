"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const exampleVideos = [
    "/examples-ai/example-ai-1.mp4",
    "/examples-ai/example-ai-2.mp4",
    "/examples-ai/example-ai-3.mp4",
];

export default function VideoCapsulesSection() {
    const t = useTranslations("VideoCapsulesSection");

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                {/* Header - Two column layout like BrandsSection */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20 mb-12">
                    {/* Left column - Subtitle and Heading */}
                    <div className="flex flex-col gap-4">
                        <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                            {t("subtitle")}
                        </p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.25rem)] leading-[1.1] tracking-tighter uppercase text-white whitespace-nowrap">
                            {t("heading")}
                        </h2>
                    </div>

                    {/* Right column - Description */}
                    <div className="flex flex-col justify-center self-stretch max-w-[540px]">
                        <p className="text-base font-light leading-5 tracking-tight text-white md:text-right">
                            {t("description")}
                        </p>
                    </div>
                </div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Video Cards */}
                    {exampleVideos.map((video, index) => (
                        <div
                            key={index}
                            className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1a1a1a]"
                        >
                            <video
                                src={video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    ))}

                    {/* CTA Card with Animated Background */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-6">
                        {/* Animated gradient background */}
                        <div className="footer-bg" aria-hidden="true">
                            <div className="footer-gradient-1" />
                            <div className="footer-gradient-2" />
                        </div>

                        {/* Animated noise overlay */}
                        <div className="footer-noise">
                            <svg
                                className="footer-grain-anim"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <filter id="footerNoiseFilter">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} seed={3} stitchTiles="stitch" />
                                    <feColorMatrix type="saturate" values="0" />
                                </filter>
                                <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" fill="transparent" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-normal tracking-tight text-white mb-3">
                                {t("ctaHeading")}
                            </h3>
                            <p className="text-sm font-light leading-4 tracking-tight text-white/90 mb-6 max-w-[200px]">
                                {t("ctaDescription")}
                            </p>
                            <Button
                                variant="secondary"
                                render={<a href="#contact" />}
                                nativeButton={false}
                                className="text-[10px] uppercase tracking-wider px-4 py-2"
                            >
                                {t("ctaButton")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
