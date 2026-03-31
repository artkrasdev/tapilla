"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fixed key slots — the namespace must expose these keys
const ITEM_KEYS = ["approach", "history", "team"] as const;
const ITEM_ICONS = ["/brand-expieince.svg", "/tech-data.svg", "/our-history.svg"] as const;

export interface DifferencesSectionProps {
    /** next-intl namespace, e.g. "AgencyPage.Differences" */
    namespace: string;
}

export default function DifferencesSection({ namespace }: DifferencesSectionProps) {
    const t = useTranslations(namespace);

    const timelineItems = ITEM_KEYS.map((key, i) => ({
        icon: ITEM_ICONS[i],
        title: t(`${key}.title`),
        subtitle: t(`${key}.subtitle`),
        description: t(`${key}.description`),
    }));
    const sectionRef = useRef<HTMLElement>(null);
    const linesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const validLines = linesRef.current.filter((l) => l !== null);
            if (validLines.length === 0) return;

            // Use a single Timeline so they fill strictly sequentially
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 70%",
                    end: "bottom 60%",
                    scrub: 1,
                },
            });

            validLines.forEach((line) => {
                tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black overflow-hidden"
        >
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                {/* Two-column layout */}
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
                    {/* ─── Left column ─── */}
                    <div className="flex flex-col gap-2 lg:w-1/2 xl:w-[48%] lg:sticky lg:self-start">
                        {/* Label */}
                        <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                            {t("label")}
                        </p>

                        {/* Heading */}
                        <h2 className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-tighter uppercase text-white">
                            {t("heading")}
                        </h2>

                        {/* Description */}
                        <p className="text-base font-light leading-5 tracking-tight mt-4 text-white max-w-[520px]">
                            {t("description")}
                        </p>
                    </div>

                    {/* ─── Right column: Timeline ─── */}
                    <div className="lg:flex-1 w-full">
                        <div className="flex flex-col timeline-container">
                            {timelineItems.map((item, index) => (
                                <div key={index} className="flex gap-6 md:gap-8 group">

                                    {/* ── Left Column: Icon & Line ── */}
                                    <div className="flex flex-col items-center shrink-0 w-[40px] md:w-[46px]">
                                        {/* Icon */}
                                        <div className="relative z-10 shrink-0 h-[36px] flex items-center justify-center">
                                            <Image
                                                src={item.icon}
                                                alt=""
                                                width={46}
                                                height={28}
                                                className="w-[40px] md:w-[46px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </div>

                                        {/* Connecting line (rendered for all 3 items to make exactly 3 lines) */}
                                        <div className="relative w-px flex-1 my-2 min-h-[40px]">
                                            {/* Track (static bg) */}
                                            <div className="absolute inset-0 w-full h-full bg-white/10" />
                                            {/* Fill (GSAP-driven) */}
                                            <div
                                                ref={(el) => { linesRef.current[index] = el; }}
                                                className="absolute inset-0 w-full h-full bg-white/70 origin-top"
                                                style={{ transform: "scaleY(0)" }}
                                            />
                                        </div>
                                    </div>

                                    {/* ── Right Column: Text content ── */}
                                    <div className={`flex flex-col gap-3 pb-10 md:pb-12 ${index === timelineItems.length - 1 ? 'pb-0 md:pb-0' : ''}`}>
                                        {/* Title */}
                                        <h3 className="text-[clamp(1.3rem,2.5vw,1.65rem)] font-medium tracking-tight text-white leading-tight mt-1">
                                            {item.title}
                                        </h3>

                                        <div className="flex flex-col ">
                                            {/* Subtitle */}
                                            <p className="text-base md:text-lg font-medium tracking-tight bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent leading-snug font-secondary">
                                                {item.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p className="text-[0.85rem] md:text-[0.9rem] font-light leading-[1.65] tracking-tight text-white/80">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
