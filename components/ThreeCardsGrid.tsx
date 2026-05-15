"use client";

import { useTranslations } from "next-intl";
import React from "react";

export interface ThreeCardsGridProps {
    namespace: string;
}

const CARDS = [
    { key: "card1" },
    { key: "card2" },
    { key: "card3" },
];

export default function ThreeCardsGrid({ namespace }: ThreeCardsGridProps) {
    const t = useTranslations(namespace);

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] pb-16 md:pb-20 lg:pb-24 md:px-8 lg:px-12">

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                    {CARDS.map(({ key }) => (
                        <div
                            key={key}
                            className="flex flex-col gap-10 border border-white/10 rounded bg-black p-6 md:p-7 lg:p-8 transition-colors duration-300 hover:bg-white/[0.02]"
                        >
                            {/* Icon row */}
                            <div className="flex items-center">
                                <img src="/tech-data.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
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
