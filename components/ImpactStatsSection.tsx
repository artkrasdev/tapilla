"use client";

import { useTranslations } from "next-intl";

export default function ImpactStatsSection() {
    const t = useTranslations("ImpactStatsSection");

    const stats = [
        { valueKey: "stat1Value", labelKey: "stat1Label" },
        { valueKey: "stat2Value", labelKey: "stat2Label" },
        { valueKey: "stat3Value", labelKey: "stat3Label" },
    ];

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-20 md:mb-28">
                    <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                        {t("subtitle")}
                    </p>
                    <h2 className="text-[clamp(1.8rem,4vw,2.25rem)] leading-[1.1] tracking-tighter uppercase text-white">
                        {t("heading")}
                    </h2>
                    <p className="text-base font-light leading-5 tracking-tight text-white">
                        {t("description")}
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
                    {stats.map(({ valueKey, labelKey }) => (
                        <div key={valueKey} className="flex flex-col items-center gap-4 py-10 sm:py-0">
                            <span className="text-[clamp(3.5rem,9vw,6rem)] font-light leading-none tracking-tighter text-white">
                                {t(valueKey)}
                            </span>
                            <span className="text-sm font-light tracking-tight text-white/50">
                                {t(labelKey)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
