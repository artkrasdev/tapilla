"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface CTABannerColors {
    /** Left-side glow — default: hot pink */
    color1?: string;
    /** Right-side glow — default: violet */
    color2?: string;
    /** Top-center glow — default: rose */
    color3?: string;
}

export interface CTABannerProps {
    /** next-intl namespace, e.g. "UxUiPage.CTABanner" */
    namespace: string;
    buttonHref?: string;
    colors?: CTABannerColors;
    className?: string;
}

const DEFAULT_COLORS: Required<CTABannerColors> = {
    color1: "rgba(236, 72, 153, 0.75)",
    color2: "rgba(139, 92, 246, 0.55)",
    color3: "rgba(244, 63, 94, 0.45)",
};

export default function CTABanner({
    namespace,
    buttonHref = "#contact",
    colors = {},
    className,
}: CTABannerProps) {
    const t = useTranslations(namespace);
    const c: Required<CTABannerColors> = { ...DEFAULT_COLORS, ...colors };

    const bg1 = `radial-gradient(circle at 30% 30%, ${c.color1}, transparent 50%), radial-gradient(circle at 70% 70%, ${c.color2}, transparent 50%), radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.7), transparent 40%)`;
    const bg2 = `radial-gradient(circle at 65% 25%, ${c.color2}, transparent 45%), radial-gradient(circle at 30% 75%, ${c.color1}, transparent 50%)`;

    return (
        <div className={cn("bg-black px-[5%] md:px-6 py-6", className)}>
            <div className="cta-banner-section relative max-w-content mx-auto overflow-hidden rounded-lg">
                {/* ── Animated gradient background ── */}
                <div className="cta-banner-bg" aria-hidden="true">
                    <div className="cta-banner-gradient-1" style={{ background: bg1 }} />
                    <div className="cta-banner-gradient-2" style={{ background: bg2 }} />
                </div>

                {/* ── Noise overlay ── */}
                <div className="footer-noise">
                    <svg
                        className="footer-grain-anim"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <filter id="ctaBannerNoiseFilter">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.7"
                                numOctaves={3}
                                seed={7}
                                stitchTiles="stitch"
                            />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <rect
                            width="100%"
                            height="100%"
                            filter="url(#ctaBannerNoiseFilter)"
                            fill="transparent"
                        />
                    </svg>
                </div>

                {/* ── Content ── */}
                <div className="relative z-10 w-full px-[5%] py-6 md:py-8 lg:py-10 md:px-8 lg:px-12">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16 xl:gap-24">

                        {/* Left — Heading */}
                        <div className="lg:w-[48%] xl:w-[45%]">
                            <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] leading-none tracking-tighter uppercase text-white font-sans">
                                {t("heading").split("\n").map((line: string, i: number, arr: string[]) => (
                                    <span key={i}>
                                        {line}
                                        {i < arr.length - 1 && <br />}
                                    </span>
                                ))}
                            </h2>
                        </div>

                        {/* Right — Description + CTA */}
                        <div className="flex flex-col gap-6 w-fit">
                            <p className="text-[0.85rem] md:text-[0.9rem] font-light leading-[1.65] tracking-tight text-white max-w-115">
                                {t("description")}
                            </p>
                            <div>
                                <a
                                    href={buttonHref}
                                    className={cn(buttonVariants({ variant: "default" }))}
                                >
                                    {t("buttonLabel")}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
