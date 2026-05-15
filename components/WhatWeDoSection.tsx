"use client";

import { useTranslations } from "next-intl";

/* ── Service-list data ─────────────────────────────────────────────── */
interface ServiceItem {
    key: string;
    hot?: boolean;
    link: string;
}

const brandServices: ServiceItem[] = [
    { key: "brand1", link: "/offer/branding" },
    { key: "brand2", link: "/offer/ux-ui-webdesign" },
    { key: "brand3", hot: true, link: "/offer/generative-ai" }
];

const techServices: ServiceItem[] = [
    { key: "tech1", link: "/offer/shopify" },
    { key: "tech4", link: "/offer/wordpress" },
    { key: "tech6", link: "/offer/" },
];

/* ── Arrow icon (north-east) ───────────────────────────────────────── */
function ArrowNE({ className = "" }: { className?: string }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ── Service row ───────────────────────────────────────────────────── */
function ServiceRow({ item, t, variant = "default" }: { item: ServiceItem; t: (key: string) => string; variant?: "default" | "card" }) {
    return (
        <a
            href={item.link}
            className={`group flex items-center justify-between gap-4 border-b border-white/10 last:border-b-0 ${variant === "card" ? "py-2" : "py-2.5"}`}
        >
            <span className="text-[0.85rem] italic font-light tracking-tight text-white duration-300 ease-out transition-colors group-hover:text-white/60">
                {t(item.key)}
                {item.hot && (
                    <span className="ml-2 inline-block rounded-full bg-rose-500 px-2 py-0.5 text-[0.55rem] font-medium uppercase leading-none tracking-wider text-white align-middle">
                        HOT
                    </span>
                )}
            </span>
            <ArrowNE className={`shrink-0 duration-300 ease-out transition-all group-hover:-translate-y-1 group-hover:rotate-45 ${variant === "card" ? "text-white/50 group-hover:text-white" : "text-white group-hover:text-white/40"}`} />
        </a>
    );
}

/* ── Props ─────────────────────────────────────────────────────────── */
interface WhatWeDoSectionProps {
    variant?: "default" | "card";
    color1?: string;
    color2?: string;
    bgColor?: string;
}

/* ═══════════════════════════════════════════════════════════════════════
   WhatWeDoSection
   ═══════════════════════════════════════════════════════════════════════ */
export default function WhatWeDoSection({
    variant = "default",
    color1 = "rgba(244, 114, 182, 0.7)",
    color2 = "rgba(168, 85, 247, 0.5)",
    bgColor = "#0b1221",
}: WhatWeDoSectionProps) {
    const tDefault = useTranslations("WhatWeDoSection");
    const tCard = useTranslations("ExpertisesSection");
    const t = variant === "card" ? tCard : tDefault;

    /* ── Card variant ────────────────────────────────────────────────── */
    if (variant === "card") {
        return (
            <section className="w-full bg-black py-8 md:py-10 lg:py-12 px-[5%] md:px-6">
                <div className="relative mx-auto w-full max-w-content overflow-hidden rounded-lg" style={{ backgroundColor: bgColor }}>
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                        <div
                            className="absolute inset-[-40%] animate-[footer-drift-1_30s_ease-in-out_infinite_alternate]"
                            style={{
                                background: `radial-gradient(circle at 30% 30%, ${color1}, transparent 50%), radial-gradient(circle at 70% 70%, ${color2}, transparent 50%), radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.7), transparent 40%)`
                            }}
                        />
                        <div
                            className="absolute inset-[-40%] animate-[footer-drift-2_35s_ease-in-out_infinite_alternate]"
                            style={{
                                background: `radial-gradient(circle at 65% 25%, ${color2}, transparent 45%), radial-gradient(circle at 30% 75%, ${color1}, transparent 50%)`
                            }}
                        />
                    </div>

                    {/* Animated noise overlay */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
                        <svg
                            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-[0.225] animate-[footer-grain_8s_steps(6)_infinite]"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <filter id="expertisesNoiseFilter">
                                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} seed={3} stitchTiles="stitch" />
                                <feColorMatrix type="saturate" values="0" />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#expertisesNoiseFilter)" fill="transparent" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full px-[5%] py-10 md:py-12 lg:py-14 lg:px-16">

                        {/* Top title */}
                        <div className="mb-8 lg:mb-10">
                            <p className="text-[1.25rem] md:text-[1.5rem] font-normal tracking-tight text-white/80 font-secondary max-w-xl">
                                {t("title")}
                            </p>
                        </div>

                        {/* 2-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-start">

                            {/* ── Col 1 — Brand & Experience ── */}
                            <div className="flex flex-col gap-6 items-start h-full">
                                <div className="flex flex-col gap-3 items-start">
                                    <img src="/brand-expieince.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
                                    <h3 className="text-[clamp(2rem,3.5vw,2.5rem)] leading-[0.95] tracking-tighter uppercase text-white">
                                        {t("brandTitle").split("\n").map((line, i, arr) => (
                                            <span key={i}>
                                                {line}
                                                {i < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </h3>
                                </div>
                                <div className="flex flex-col w-full mt-auto pt-4">
                                    {brandServices.map((s) => (
                                        <ServiceRow key={s.key} item={s} t={t} variant="card" />
                                    ))}
                                </div>
                            </div>

                            {/* ── Col 2 — Tech & Data ── */}
                            <div className="flex flex-col gap-6 items-start h-full">
                                <div className="flex flex-col gap-3 items-start">
                                    <img src="/tech-data.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
                                    <h3 className="text-[clamp(2rem,3.5vw,2.5rem)] leading-[0.95] tracking-tighter uppercase text-white">
                                        {t("techTitle").split("\n").map((line, i, arr) => (
                                            <span key={i}>
                                                {line}
                                                {i < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </h3>
                                </div>
                                <div className="flex flex-col w-full mt-auto pt-4">
                                    {techServices.map((s) => (
                                        <ServiceRow key={s.key} item={s} t={t} variant="card" />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }

    /* ── Default variant ─────────────────────────────────────────────── */
    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">

                {/* 2-column master grid: label | content */}
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-12 lg:gap-32 items-start">

                    {/* Col 1 — Section label */}
                    <p className="text-[1.625rem] w-fit whitespace-nowrap font-normal tracking-tight text-white/70 font-secondary lg:pt-2">
                        {t("sectionLabel")}
                    </p>

                    {/* Col 2 — Two category rows stacked */}
                    <div className="flex flex-col gap-20">

                        {/* ── Row 1 — Brand & Experience ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Title block */}
                            <div className="flex flex-col gap-3 items-start">
                                <img src="/brand-expieince.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
                                <h3 className="text-[clamp(2.5rem,5.5vw,3.25rem)] leading-[0.95] tracking-tighter uppercase text-white">
                                    {t("brandTitle").split("\n").map((line, i, arr) => (
                                        <span key={i}>
                                            {line}
                                            {i < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </h3>
                            </div>

                            {/* Service list */}
                            <div className="flex flex-col pt-1">
                                {brandServices.map((s) => (
                                    <ServiceRow key={s.key} item={s} t={t} />
                                ))}
                            </div>
                        </div>

                        {/* ── Row 2 — Tech & Data ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Title block */}
                            <div className="flex flex-col gap-3 items-start">
                                <img src="/tech-data.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
                                <h3 className="text-[clamp(2.5rem,5.5vw,3.25rem)] leading-[0.95] tracking-tighter uppercase text-white">
                                    {t("techTitle").split("\n").map((line, i, arr) => (
                                        <span key={i}>
                                            {line}
                                            {i < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </h3>
                            </div>

                            {/* Service list */}
                            <div className="flex flex-col pt-1">
                                {techServices.map((s) => (
                                    <ServiceRow key={s.key} item={s} t={t} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
