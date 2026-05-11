"use client";

import { useTranslations } from "next-intl";
import React from "react";

export interface BentoGridProps {
    /** next-intl namespace, e.g. "BrandingPage.BentoGrid" */
    namespace: string;
}

const CARDS = [
    {
        key: "card1",
        span: "md:col-span-7",
        iconSrc: "/identity.svg"
    },
    {
        key: "card2",
        span: "md:col-span-5",
        iconSrc: "/our-history.svg"
    },
    {
        key: "card3",
        span: "md:col-span-5",
        iconSrc: "/brand-expieince.svg"
    },
    {
        key: "card4",
        span: "md:col-span-7",
        iconSrc: "/tech-data.svg"
    },
];

export default function BentoGrid({ namespace }: BentoGridProps) {
    const t = useTranslations(namespace);

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16 max-w-2xl mx-auto">
                    <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.05] tracking-tighter uppercase text-white">
                        {t("heading")}
                    </h2>
                    <p className="text-base font-light leading-[1.5] tracking-tight text-white/70">
                        {t("description")}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full">
                    {CARDS.map(({ key, iconSrc, span }) => (
                        <div
                            key={key}
                            className={`flex flex-col gap-10 border border-white/10 rounded-[1rem] bg-black p-8 md:p-10 transition-colors duration-300 hover:bg-white/[0.02] ${span}`}
                        >
                            {/* Icons row */}
                            <div className="flex items-center">
                                <img src={iconSrc} alt="" className="h-6 w-auto" aria-hidden="true" />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className="text-[clamp(1.2rem,2.5vw,1.4rem)] font-normal tracking-tight text-white leading-tight">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="text-[0.9rem] font-light leading-[1.6] tracking-tight text-white/60">
                                    {t(`${key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
