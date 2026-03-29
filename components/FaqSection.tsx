"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

/* ── FAQ keys (mapped to messages/en.json → FaqSection) ────────────── */
const FAQ_KEYS = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;

export default function FaqSection() {
    const t = useTranslations("FaqSection");

    /* Build items array from translations */
    const items: FaqItem[] = useMemo(
        () =>
            FAQ_KEYS.map((key) => ({
                question: t(`${key}.q`),
                answer: t(`${key}.a`),
            })),
        [t],
    );

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 w-full px-6 py-24 md:px-8 lg:px-8">
                {/* 2-column master grid: left sidebar | right content */}
                <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,320px)_1fr] gap-12 md:gap-[15rem] items-start">
                    {/* ── Left column — image + description + CTA ── */}
                    <div className="flex flex-col gap-6">
                        {/* Image */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                            <img
                                src="/faq-image.webp"
                                alt=""
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
                                render={<a href="#contact" />}
                                nativeButton={false}
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
                                <p className="text-[1.4rem] font-light tracking-tight text-white font-secondary">
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
