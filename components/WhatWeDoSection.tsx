"use client";

import { useTranslations } from "next-intl";

/* ── Service-list data ─────────────────────────────────────────────── */
interface ServiceItem {
    key: string;
    hot?: boolean;
}

const brandServices: ServiceItem[] = [
    { key: "brand1" },
    { key: "brand2" },
    { key: "brand3", hot: true },
    { key: "brand4" },
    { key: "brand5" },
];

const techServices: ServiceItem[] = [
    { key: "tech1" },
    { key: "tech2" },
    { key: "tech4" },
    { key: "tech6" },
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
function ServiceRow({ item, t }: { item: ServiceItem; t: (key: string) => string }) {
    return (
        <a
            href="#"
            className="group flex items-center justify-between gap-4 border-b border-white/10 py-2.5 last:border-b-0"
        >
            <span className="text-[0.85rem] italic font-light tracking-tight text-white duration-300 ease-out transition-colors group-hover:text-white/60">
                {t(item.key)}
                {item.hot && (
                    <span className="ml-2 inline-block rounded-full bg-rose-500 px-2 py-0.5 text-[0.55rem] font-medium uppercase leading-none tracking-wider text-white align-middle">
                        HOT
                    </span>
                )}
            </span>
            <ArrowNE className="shrink-0 text-white duration-300 ease-out transition-all group-hover:text-white/40 group-hover:-translate-y-1 group-hover:rotate-45" />
        </a>
    );
}

/* ═══════════════════════════════════════════════════════════════════════
   WhatWeDoSection
   ═══════════════════════════════════════════════════════════════════════ */
export default function WhatWeDoSection() {
    const t = useTranslations("WhatWeDoSection");

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-6 py-24 md:px-8 lg:px-8">

                {/* 2-column master grid: label | content */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12 md:gap-32 items-start">

                    {/* Col 1 — Section label */}
                    <p className="text-[1.625rem] w-fit whitespace-nowrap font-normal tracking-tight text-white/70 font-secondary md:pt-2">
                        {t("sectionLabel")}
                    </p>

                    {/* Col 2 — Two category rows stacked */}
                    <div className="flex flex-col gap-20">

                        {/* ── Row 1 — Brand & Experience ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Title block */}
                            <div className="flex flex-col gap-3 items-start">
                                <img src="/brand-expieince.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
                                <h3 className="text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[0.95] tracking-tighter uppercase text-white">
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
                                <h3 className="text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[0.95] tracking-tighter uppercase text-white">
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
