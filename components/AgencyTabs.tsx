"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface TabData {
    key: string;
    image: string;
    paragraphs: string[];
    boldLast?: boolean;
}

const TABS: TabData[] = [
    {
        key: "tab0",
        image: "/e-commerce.webp",
        paragraphs: ["p1", "p2", "p3", "p4"],
        boldLast: true,
    },
    {
        key: "tab1",
        image: "/creative.webp",
        paragraphs: ["p1", "p2", "p3"],
    },
    {
        key: "tab2",
        image: "/web-agency.webp",
        paragraphs: ["p1", "p2", "p3"],
    },
    {
        key: "tab3",
        image: "/marketing-agency.webp",
        paragraphs: ["p1", "p2", "p3"],
    },
];

export default function AgencyTabs() {
    const t = useTranslations("AgencyTabs");
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="relative w-full bg-black py-8 md:py-10 px-[5%] md:px-8 lg:px-12">
            {/* ── Contained card ── */}
            <div
                className="relative mx-auto w-full max-w-[1600px] h-[550px] overflow-hidden rounded-2xl border border-white/10"
                style={{ background: "#111" }}
            >
                <div className="flex flex-row h-full">

                    {/* ═══ Active tab content (always rendered, slides to fill) ═══ */}
                    {TABS.map((tab, index) => {
                        const isActive = activeTab === index;
                        return (
                            <div
                                key={tab.key}
                                onMouseEnter={() => setActiveTab(index)}
                                className={[
                                    "relative flex flex-row overflow-hidden",
                                    "transition-all duration-700 ease-in-out",
                                    isActive ? "flex-[1_1_0%]" : "flex-[0_0_64px] cursor-pointer",
                                ].join(" ")}
                            >
                                {/* ── Vertical label strip ── */}
                                <div
                                    className="relative z-10 flex-shrink-0 flex items-start justify-center border-r border-white/10 pt-6"
                                    style={{ width: "64px", minWidth: "64px" }}
                                >
                                    <span
                                        className={[
                                            "text-[1.15rem] font-light tracking-[0.08em] whitespace-nowrap select-none transition-colors duration-300",
                                            isActive ? "text-white" : "text-white/55",
                                        ].join(" ")}
                                        style={{
                                            writingMode: "vertical-rl",
                                            transform: "rotate(180deg)",
                                        }}
                                    >
                                        {t(`${tab.key}.label`)}
                                    </span>
                                </div>

                                {/* ── Expanded panel ── */}
                                <div
                                    className={[
                                        "flex flex-row items-center overflow-hidden",
                                        "transition-all duration-700 ease-in-out p-16",
                                        isActive
                                            ? "opacity-100 flex-1 pointer-events-auto"
                                            : "opacity-0 w-0 flex-none pointer-events-none",
                                    ].join(" ")}
                                    aria-hidden={!isActive}
                                >
                                    {/* Fixed width content container to prevent text jumping */}
                                    <div
                                        className="flex flex-row items-start flex-shrink-0 "
                                        style={{ width: "900px" }}
                                    >
                                        {/* Image — inset, rounded, full height with aspect ratio preserved */}
                                        <div
                                            className="flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-center max-w-[400px]"
                                        >
                                            <img
                                                src={tab.image}
                                                alt={t(`${tab.key}.label`)}
                                                className="w-full h-full object-contain"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Text */}
                                        <div
                                            className="flex flex-col justify-center gap-4 px-10 lg:px-14 pb-10 flex-shrink-0"
                                            style={{ width: "580px" }}
                                        >
                                        <h2 className="text-[clamp(1.35rem,2.2vw,1.8rem)] font-normal leading-[1.15] tracking-tight text-white">
                                            {t(`${tab.key}.title`)}
                                        </h2>
                                        <div className="flex flex-col gap-[0.6rem]">
                                            {tab.paragraphs.map((pKey, pi) => {
                                                const isLast = pi === tab.paragraphs.length - 1;
                                                return (
                                                    <p
                                                        key={pKey}
                                                        className="text-[0.8rem] text-white leading-[1.72] tracking-tight"
                                                    >
                                                        {t(`${tab.key}.${pKey}`)}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
