"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import HeroSlider from "@/components/HeroSlider";
import AnimatedBackground from "@/components/AnimatedBackground";
import { handleAnchorClick } from "@/lib/scroll-utils";

export default function HeroSection() {
    const t = useTranslations("HeroSection");

    return (
        <section
            className="relative h-svh max-h-[600px] md:max-h-[600px] lg:max-h-[900px] w-full overflow-hidden isolate bg-(--hero-bg) flex items-center"
        >

            {/* ── Animated blob background ── */}
            <AnimatedBackground id="hero" />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto w-full max-w-content flex flex-col items-center gap-12 px-[5%] pt-12 md:pt-12 md:pb-4 lg:py-24 md:flex-row md:items-stretch md:gap-12 lg:gap-20 md:px-8 lg:px-12 md:justify-center">

                {/* Left — Slider card */}
                <HeroSlider />

                {/* Right — text */}
                <div className="flex flex-col gap-6 justify-center">
                    <p className="text-[1.45rem] font-normal tracking-tight text-white/70 font-secondary">{t("tagline")}</p>

                    <h1 className="text-[clamp(2.5rem,10vw,7.6rem)] md:text-[clamp(3rem,8vw,6rem)] lg:text-[clamp(3rem,8vw,7.6rem)] leading-[0.95] tracking-tighter uppercase text-white [text-shadow:10px_8px_12px_rgba(0,0,0,0.20)]">
                        {t("heading").split("\n").map((line, i, arr) => (
                            <span key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>

                    <p className="max-w-[600px] text-base font-light leading-5 tracking-tight text-white">{t("description")}</p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Button render={<a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} />} nativeButton={false}>
                            {t("ctaPrimary")}
                        </Button>
                        <Button variant="secondary" render={<a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} />} nativeButton={false}>
                            {t("ctaSecondary")}
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
