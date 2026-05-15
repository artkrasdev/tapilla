"use client";

import { useTranslations } from "next-intl";
import React from "react";

export interface NumberedCardsGridProps {
    namespace: string;
}

const CARDS = [
    { key: "card1", number: "01" },
    { key: "card2", number: "02" },
    { key: "card3", number: "03" },
    { key: "card4", number: "04" },
];

export default function NumberedCardsGrid({ namespace }: NumberedCardsGridProps) {
    const t = useTranslations(namespace);

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-12 md:py-16 md:px-8 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-3 mb-8 md:mb-10">
                    <p className="text-[1.1rem] md:text-[1.3rem] font-normal tracking-tight text-white/70 font-secondary">
                        {t("subtitle")}
                    </p>
                    <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] tracking-tighter uppercase text-white">
                        {t("heading")}
                    </h2>
                </div>

                {/* 2×2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    {CARDS.map(({ key, number }) => (
                        <div
                            key={key}
                            className="flex flex-col gap-5 border border-white/10 rounded bg-white/3 backdrop-blur-sm p-6 md:p-7 lg:p-8"
                        >
                            <span className="text-[2rem] font-light tracking-tighter text-white/55 leading-none">
                                {number}
                            </span>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-[clamp(1.1rem,2vw,1.45rem)] font-light leading-snug tracking-tight text-white">
                                    {t(`${key}.title`)}
                                </h3>
                                <p className="text-[0.82rem] font-light leading-[1.65] tracking-tight text-white/80">
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
