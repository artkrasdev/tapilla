"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface RightToolSectionProps {
    namespace?: string;
}

export default function RightToolSection({ namespace = "RightToolSection" }: RightToolSectionProps) {
    const t = useTranslations(namespace);

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    {/* Left Content */}
                    <div className="flex flex-col gap-6 lg:max-w-[45%]">
                        {/* Heading */}
                        <h2 className="text-[clamp(2.2rem,5vw,2.5rem)] max-w-[500px] leading-[0.95] tracking-tighter uppercase text-white">
                            {t("heading")}
                        </h2>

                        {/* Description */}
                        <p className="text-base font-light leading-5 tracking-tight text-white/70 max-w-[500px]">
                            {t("description")}
                        </p>

                        {/* Two column comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            {/* Monolithic Approach */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-secondary text-[1.4rem] font-normal text-white">
                                    {t("monolithicTitle")}
                                </h3>
                                <p className="text-sm font-light leading-4 tracking-tight text-white/60">
                                    {t("monolithicDescription")}
                                </p>
                            </div>

                            {/* Tapilla Visual Approach */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-secondary text-[1.4rem] font-normal text-white">
                                    {t("tapillaTitle")}
                                </h3>
                                <p className="text-sm font-light leading-4 tracking-tight text-white/60">
                                    {t("tapillaDescription")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center lg:justify-end lg:max-w-[55%]">
                        <Image
                            src="/automation-graph.png"
                            alt={t("imageAlt")}
                            width={700}
                            height={467}
                            className="w-full max-w-lg lg:max-w-xl h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
