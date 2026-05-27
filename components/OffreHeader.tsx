"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

interface OffreHeaderProps {
    /** next-intl namespace that exposes: subtitle, heading, description, ctaPrimary */
    namespace: string;
    /** Link for the CTA button (defaults to localized /contact) */
    primaryLink?: string;
    /** Primary blob color override for AnimatedBackground */
    primaryColor?: string;
    /** Secondary blob color override for AnimatedBackground */
    secondaryColor?: string;
}

export default function OffreHeader({
    namespace,
    primaryLink,
    primaryColor = "rgba(34,120,80,0.65)",
    secondaryColor = "rgba(16,70,48,0.5)",
}: OffreHeaderProps) {
    const t = useTranslations(namespace);
    const locale = useLocale();

    const contactLink = primaryLink ?? `/${locale}/contact`;
    const hasPrimary = t.has("ctaPrimary");

    return (
        <section className="relative w-full min-h-[85vh] md:min-h-[75vh] overflow-hidden isolate bg-[#0a0f1e] flex items-center justify-center">
            {/* ── Fade to black overlay ── */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black via-black/25 to-transparent pointer-events-none z-15" />
            {/* ── Animated blob background ── */}
            <AnimatedBackground
                id={`offre-${namespace.toLowerCase()}`}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                darkColor="rgba(2,6,23,0.85)"
                showBottomFade={false}
                noiseOpacity={0.11}
                blurRadius="120px"
            />

            {/* ── Content ── */}
            <div className="relative z-30 mx-auto w-full max-w-content flex flex-col items-center text-center gap-6 px-[5%] py-24 md:py-32 md:px-8 lg:px-12">
                {/* Subtitle — italic serif */}
                <p className="text-[1.45rem] font-normal tracking-tight text-white/70 font-secondary">
                    {t("subtitle")}
                </p>

                {/* Heading — large bold */}
                <h1 className="text-[clamp(2.5rem,10vw,5.625rem)] leading-[0.95] tracking-tighter text-white [text-shadow:10px_8px_12px_rgba(0,0,0,0.20)]">
                    <span className="sr-only">Tapilla — </span>
                    {t("heading").split("\n").map((line, i) => (
                        <span key={i} className="block uppercase">
                            {line}
                        </span>
                    ))}
                </h1>

                {/* Description */}
                <p className="max-w-[680px] text-base font-light leading-5 tracking-tight text-white">
                    {t("description")}
                </p>

                {/* CTA */}
                {hasPrimary && (
                    <div className="pt-2">
                        <Button render={<a href={contactLink} />} nativeButton={false}>
                            {t("ctaPrimary")}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
