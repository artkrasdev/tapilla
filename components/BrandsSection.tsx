"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/analytics";

interface BrandsSectionProps {
    namespace?: string;
    pb?: string;
}

export default function BrandsSection({ namespace = "BrandsSection", pb }: BrandsSectionProps) {
    const t = useTranslations(namespace);
    const locale = useLocale();
    const { track } = useAnalytics();

    return (
        <section className="relative w-full bg-black overflow-hidden">
            {/* Content — same wrapper as HeroSection */}
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12" style={pb !== undefined ? { paddingBottom: pb } : undefined}>
                <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20">
                    {/* Left column */}
                    <div className="flex flex-col gap-6">
                        {/* Subtitle — matches HeroSection tagline */}
                        <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                            {t("subtitle")}
                        </p>

                        {/* Heading — same scale & rhythm as HeroSection h1 */}
                        <h2 className="text-[clamp(2.2rem,5vw,2.5rem)] max-w-[500px] leading-[0.95] tracking-tighter uppercase text-white">
                            {t("heading")}
                        </h2>

                        {/* CTA — same primary Button as HeroSection */}
                        <div className="mt-2">
                            <Button
                                variant="secondary"
                                render={<a href="#" />}
                                nativeButton={false}
                                onClick={() => track("view_cases_click", { section: "brands", locale })}
                            >
                                {t("cta")}
                            </Button>
                        </div>
                    </div>

                    {/* Right column — description, same as HeroSection body copy */}
                    <div className="flex flex-col justify-center self-stretch max-w-[500px]">
                        <p className="text-base font-light leading-5 tracking-tight text-white md:text-right">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
