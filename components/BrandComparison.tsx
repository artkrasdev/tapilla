"use client";

import { useTranslations } from "next-intl";

export interface BrandComparisonProps {
    /** next-intl namespace, e.g. "BrandComparison" */
    namespace: string;
    /** "stacked" (default): label + heading stacked; "split": heading left + headerParagraph right */
    headerLayout?: "stacked" | "split";
    /** Whether to render subtitle inside cards (default: true) */
    showCardSubtitle?: boolean;
    /** Whether to render description in the left card (default: true) */
    showLeftCardDescription?: boolean;
    /** Right card content: "numbered" (default) numbered points, "paragraph" single description only */
    rightCardVariant?: "numbered" | "paragraph";
}

export default function BrandComparison({
    namespace,
    headerLayout = "stacked",
    showCardSubtitle = true,
    showLeftCardDescription = true,
    rightCardVariant = "numbered",
}: BrandComparisonProps) {
    const t = useTranslations(namespace);

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-12 md:py-16 md:px-8 lg:px-12 border-t border-white/10">

                {/* Section header */}
                {headerLayout === "stacked" ? (
                    <div className="flex flex-col gap-3 mb-8 md:mb-10">
                        <p className="text-[1.1rem] md:text-[1.3rem] font-normal tracking-tight text-white font-secondary">
                            {t("label")}
                        </p>
                        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] tracking-tighter uppercase text-white">
                            {t("heading")}
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-10 items-end">
                        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] tracking-tighter uppercase text-white self-end">
                            {t("heading")}
                        </h2>
                        <p className="text-[0.875rem] font-light leading-[1.6] tracking-tight text-white">
                            {t("headerParagraph")}
                        </p>
                    </div>
                )}

                {/* Comparison grid with vs. overlay */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative">

                    {/* Left card — Obsolete */}
                    <div className="flex flex-col gap-6 border border-white/10 rounded bg-white/3 backdrop-blur-sm p-6 md:p-7 lg:p-8">
                        <div className="flex flex-col gap-3">
                            {showCardSubtitle ? (
                                <p className="text-[1.1rem] md:text-[1.2rem] font-normal tracking-tight text-white font-secondary">
                                    {t("obsolete.title")}
                                </p>
                            ) : (
                                <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-white leading-tight">
                                    {t("obsolete.title")}
                                </h3>
                            )}
                            {showCardSubtitle && (
                                <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold tracking-tight text-white uppercase leading-tight">
                                    {t("obsolete.subtitle")}
                                </p>
                            )}
                            {showLeftCardDescription && (
                                <p className="text-base font-light leading-5 tracking-tight text-white">
                                    {t("obsolete.description")}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            {[
                                t("obsolete.point1"),
                                t("obsolete.point2"),
                                t("obsolete.point3"),
                            ].map((point, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-white/30 rounded-full mt-[0.45rem] shrink-0" />
                                    <p className="text-[0.85rem] font-light leading-[1.6] tracking-tight text-white">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right card — Axome */}
                    <div className="flex flex-col gap-6 border border-white/20 rounded bg-white/5 backdrop-blur-sm p-6 md:p-7 lg:p-8">
                        <div className="flex flex-col gap-3">
                            {showCardSubtitle ? (
                                <p className="text-[1.1rem] md:text-[1.2rem] font-normal tracking-tight text-white font-secondary">
                                    {t("axome.title")}
                                </p>
                            ) : (
                                <h3 className="text-[clamp(1.1rem,2vw,1.35rem)] font-medium tracking-tight text-white leading-tight">
                                    {t("axome.title")}
                                </h3>
                            )}
                            {showCardSubtitle && (
                                <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-semibold tracking-tight text-white uppercase leading-tight">
                                    {t("axome.subtitle")}
                                </p>
                            )}
                            <p className="text-base font-light leading-5 tracking-tight text-white/80">
                                {t("axome.description")}
                            </p>
                        </div>

                        {rightCardVariant === "numbered" && (
                            <div className="flex flex-col gap-4">
                                {[
                                    { title: t("axome.point1Title"), desc: t("axome.point1Description") },
                                    { title: t("axome.point2Title"), desc: t("axome.point2Description") },
                                    { title: t("axome.point3Title"), desc: t("axome.point3Description") },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 bg-white/8 border border-white/10 rounded flex items-center justify-center shrink-0">
                                            <span className="text-white font-light text-xs">{i + 1}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[0.9rem] md:text-[0.95rem] font-medium tracking-tight text-white leading-tight">
                                                {item.title}
                                            </p>
                                            <p className="text-[0.8rem] md:text-[0.85rem] font-light leading-[1.6] tracking-tight text-white">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* vs. overlay - positioned between cards */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-2">
                        <p className="text-[1.1rem] md:text-[1.2rem] font-normal tracking-tight text-white/50 font-secondary">
                            vs.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
