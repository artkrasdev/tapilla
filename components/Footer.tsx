"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Globe, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { handleAnchorClick } from "@/lib/scroll-utils";

/* ── Arrow NE icon ─────────────────────────────────────────────────── */
function ArrowNE({ className = "" }: { className?: string }) {
    return (
        <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ── Social pill link ──────────────────────────────────────────────── */
function SocialPill({ icon, label, href, onClick }: { icon: React.ReactNode; label: string; href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="group flex flex-1 min-w-0 items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/20 px-2 sm:px-4 py-2 text-[clamp(0.65rem,2.5vw,0.875rem)] text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
        >
            <div className="shrink-0 scale-90 sm:scale-100">{icon}</div>
            <span className="font-medium tracking-wide truncate">{label}</span>
            <div className="shrink-0 hidden sm:block">
                <ArrowNE className="text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
        </a>
    );
}

/* ═══════════════════════════════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════════════════════════════ */
const ROUTE_HEADING_MAP: Record<string, string> = {
    "/": "ctaHeading_home",
    "/agency": "ctaHeading_agency",
    "/services": "ctaHeading_services",
    "/offer/automation": "ctaHeading_automation",
    "/offer/branding": "ctaHeading_branding",
    "/offer/generative-ai": "ctaHeading_generative_ai",
    "/offer/shopify": "ctaHeading_shopify",
    "/offer/ux-ui-webdesign": "ctaHeading_ux_ui",
    "/offer/wordpress": "ctaHeading_wordpress",
};

function getCtaHeadingKey(pathname: string): string {
    // Strip locale prefix (e.g. "/en/agency" → "/agency", "/ru" → "/")
    const stripped = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/$1").replace(/\/$/, "") || "/";
    return ROUTE_HEADING_MAP[stripped] ?? "ctaHeading";
}

export default function Footer() {
    const t = useTranslations("Footer");
    const pathname = usePathname();
    const ctaHeadingKey = getCtaHeadingKey(pathname);

    const services = [
        t("service1"),
        t("service2"),
        t("service3"),
        t("service4"),
    ];

    const expertise = [
        t("expertise1"),
        t("expertise2"),
        t("expertise3"),
    ];

    const quickAccess = [
        t("quick1"),
        t("quick2"),
        t("quick3"),
        t("quick4"),
    ];

    return (
        <footer className="bg-black pb-6 px-[5%] md:px-6">
            <div className="footer-section relative max-w-content mx-auto overflow-hidden rounded-lg">

                {/* ── Animated gradient background ── */}
                <div className="footer-bg" aria-hidden="true">
                    <div className="footer-gradient-1" />
                    <div className="footer-gradient-2" />
                </div>

                {/* ── Animated noise overlay ── */}
                <div className="footer-noise">
                    <svg
                        className="footer-grain-anim"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <filter id="footerNoiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} seed={3} stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" fill="transparent" />
                    </svg>
                </div>

                {/* ── Content ── */}
                <div className="relative z-10">

                    {/* ═══ TOP CTA ZONE ═══ */}
                    <div id="contact" className="flex flex-col items-center text-center px-6 pt-6 pb-16 md:pb-24">
                        {/* Three pillars */}
                        <div className="flex items-start justify-between w-full max-w-content px-2 mb-16 md:mb-24">
                            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-white/50 font-medium text-left leading-tight max-w-[110px]">
                                {t("pillar1")}
                            </span>
                            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-white/50 font-medium text-center leading-tight max-w-[110px]">
                                {t("pillar2")}
                            </span>
                            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-white/50 font-medium text-right leading-tight max-w-[110px]">
                                {t("pillar3")}
                            </span>
                        </div>

                        {/* Big heading */}
                        <h2 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-tighter text-white font-sans uppercase max-w-[1200px]">
                            {t(ctaHeadingKey).split("\n").map((line, i, arr) => (
                                <span key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </span>
                            ))}
                        </h2>

                        {/* Globe icon */}
                        <Image src="/tech-data.svg" alt="Globe" className="mt-10 mb-6" width={50} height={50} />

                        {/* Tagline */}
                        <p className="text-base md:text-3xl tracking-tight text-white/80 font-secondary">
                            {t("tagline")}
                        </p>

                        {/* CTA button */}
                        <a
                            href="#contact"
                            className={cn(buttonVariants({ variant: "default" }), "mt-8")}
                            onClick={(e) => handleAnchorClick(e, "contact")}
                        >
                            {t("ctaButton")}
                        </a>
                    </div>

                    {/* ═══ 4-COLUMN LINKS ═══ */}
                    <div className="relative mx-auto w-full max-w-content px-6 md:px-8 lg:px-12 py-16">
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        <div className="grid grid-cols-2 gap-y-12 gap-x-6 sm:gap-x-12 lg:flex lg:flex-row lg:justify-between lg:gap-24 xl:gap-32">

                            {/* Col 1 — Company info */}
                            <div className="flex flex-col gap-4 lg:max-w-[280px]">
                                <Image
                                    src="/tapilla-white.png"
                                    alt="Tapilla"
                                    width={548}
                                    height={206}
                                    className="h-8 w-fit mix-blend-plus-lighter opacity-90"
                                />
                                <span className="text-sm text-white">{t("phone")}</span>
                                <p className="text-xs leading-relaxed text-white max-w-[220px]">
                                    {t("companyDescription")}
                                </p>
                                <a href={`mailto:${t("email")}`} className="text-sm text-white hover:text-white/70 transition-colors duration-200">
                                    {t("email")}
                                </a>
                            </div>

                            {/* Cols 2-4 wrapper */}
                            <div className="contents lg:grid lg:grid-cols-3 lg:gap-16 xl:gap-24 2xl:gap-32">
                                {/* Col 2 — Services */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("servicesTitle")}</h4>
                                    {services.map((s, i) => (
                                        <a key={i} href="#" className="text-sm text-white hover:text-white/70 transition-colors duration-200">{s}</a>
                                    ))}
                                </div>

                                {/* Col 3 — Expertise */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("expertiseTitle")}</h4>
                                    {expertise.map((e, i) => (
                                        <a key={i} href="#" className="text-sm text-white hover:text-white/70 transition-colors duration-200">{e}</a>
                                    ))}
                                </div>

                                {/* Col 4 — Quick access */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("quickTitle")}</h4>
                                    {quickAccess.map((q, i) => (
                                        <a key={i} href="#" className="text-sm text-white hover:text-white/70 transition-colors duration-200">{q}</a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ═══ SOCIAL ROW ═══ */}
                    <div id="newsletter" className="mx-auto w-full max-w-content px-6 md:px-8 lg:px-12 py-8 overflow-hidden">
                        <div className="flex flex-row flex-nowrap items-center justify-between gap-2 md:gap-4 w-full">
                            <SocialPill
                                icon={<Instagram size={16} strokeWidth={1.5} />}
                                label="Instagram"
                                href="https://instagram.com"
                            />
                            <SocialPill
                                icon={<Linkedin size={16} strokeWidth={1.5} />}
                                label="LinkedIn"
                                href="https://linkedin.com"
                            />
                            <SocialPill
                                icon={<Globe size={16} strokeWidth={1.5} />}
                                label="Newsletter"
                                href="#newsletter"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAnchorClick(e, "newsletter");
                                }}
                            />
                        </div>
                    </div>

                    {/* ═══ COPYRIGHT BAR ═══ */}
                    <div className="relative mx-auto w-full max-w-content px-6 md:px-8 lg:px-12 py-6">
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <span className="text-[0.7rem] text-white/30 tracking-wide">
                                © {new Date().getFullYear()} Tapilla. {t("copyright")}
                            </span>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-[0.7rem] text-white/30 hover:text-white/60 uppercase tracking-[0.08em] transition-colors duration-200">{t("legal1")}</a>
                                <a href="#" className="text-[0.7rem] text-white/30 hover:text-white/60 uppercase tracking-[0.08em] transition-colors duration-200">{t("legal2")}</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
