"use client";

import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { handleAnchorClick } from "@/lib/scroll-utils";
import { useAnalytics } from "@/lib/analytics";

export interface FaqSectionProps {
    namespace?: string;
    count?: number;
}

export default function FaqSection({ namespace = "FaqSection", count = 5 }: FaqSectionProps) {
    const t = useTranslations(namespace);
    const locale = useLocale();
    const { track } = useAnalytics();

    /* Build items array from translations */
    const items: FaqItem[] = useMemo(
        () =>
            Array.from({ length: count }).map((_, i) => ({
                question: t(`faq${i + 1}.q`),
                answer: t(`faq${i + 1}.a`),
            })),
        [t, count],
    );

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                {/* 2-column master grid: left sidebar | right content */}
                <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,280px)_1fr] lg:grid-cols-[minmax(200px,320px)_1fr] gap-12 md:gap-12 lg:gap-[15rem] items-start">
                    {/* ── Left column — image + description + CTA ── */}
                    <div className="hidden md:flex flex-col gap-6">
                        {/* Image */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                            <img
                                src="/faq-image.webp"
                                alt="Tapilla agency team discussing digital strategy and e-commerce solutions"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Description text */}
                        <p className="text-[0.8rem] font-light leading-relaxed tracking-tight text-white transition-opacity duration-300 hover:opacity-60">
                            {t("description")}
                        </p>

                        {/* CTA */}
                        <div>
                            <Button
                                variant="secondary"
                                render={<a href={`/${locale}/contact`} />}
                                nativeButton={false}
                                onClick={() => track("contact_cta_click", { section: "faq", locale })}
                            >
                                {t("cta")}
                            </Button>
                        </div>
                    </div>

                    {/* ── Right column — heading + accordion ── */}
                    <div className="flex flex-col gap-10">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-8">
                            <div className="flex flex-col gap-2">
                                {/* Subtitle */}
                                <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                                    {t("subtitle")}
                                </p>

                                {/* Main heading */}
                                <h2 className="text-[clamp(2.2rem,5vw,3.2rem)] leading-[0.95] tracking-tighter uppercase text-white">
                                    {t("heading")
                                        .split("\n")
                                        .map((line, i, arr) => (
                                            <span key={i}>
                                                {line}
                                                {i < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                </h2>
                            </div>

                            {/* Count badge */}
                            <span className="shrink-0 pt-2 text-sm font-light tracking-tight text-white">
                                ({String(items.length).padStart(2, "0")})
                            </span>
                        </div>

                        {/* Accordion */}
                        <FaqAccordion items={items} />
                    </div>
                </div>
            </div>
        </section>
    );
}
