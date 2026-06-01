"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { showCookieBanner } from "@/lib/cookie-consent";
import { useAnalytics } from "@/lib/analytics";


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
    const { track } = useAnalytics();

    const locale = useLocale();
    const base = `/${locale}`;

    const brandLinks = [
        { label: t("offer_branding"),      href: `${base}/offer/branding` },
        { label: t("offer_ux_ui"),         href: `${base}/offer/ux-ui-webdesign` },
        { label: t("offer_generative_ai"), href: `${base}/offer/generative-ai` },
    ];

    const techLinks = [
        { label: t("offer_shopify"),    href: `${base}/offer/shopify` },
        { label: t("offer_wordpress"),  href: `${base}/offer/wordpress` },
        { label: t("offer_automation"), href: `${base}/offer/automation` },
    ];

    const navLinks = [
        { label: t("nav_agency"),   href: `${base}/agency` },
        { label: t("nav_services"), href: `${base}/services` },
        { label: t("nav_contact"),  href: `${base}/contact` },
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
                            href={`/${locale}/contact`}
                            className={cn(buttonVariants({ variant: "default" }), "mt-8")}
                            onClick={() => track("start_project_click", { section: "footer", locale })}
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
                                    src={locale === "ru" ? "/tapilla-ru-white.png" : "/tapilla-white.png"}
                                    alt="Tapilla"
                                    width={548}
                                    height={206}
                                    className={locale === "ru" ? "h-10 w-fit mix-blend-plus-lighter opacity-90" : "h-8 w-fit mix-blend-plus-lighter opacity-90"}
                                />
                                <p className="text-xs leading-relaxed text-white max-w-[220px]">
                                    {t("companyDescription")}
                                </p>
                                <a href="https://t.me/tapilla_chat" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white hover:text-white/70 transition-colors duration-200" onClick={() => track("footer_link_click", { type: "telegram", href: "https://t.me/tapilla_chat" })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" aria-hidden="true">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                    </svg>
                                    {t("telegram")}
                                </a>
                                <a href={`mailto:${t("email")}`} className="inline-flex items-center gap-2 text-sm text-white hover:text-white/70 transition-colors duration-200" onClick={() => track("footer_link_click", { type: "email", href: `mailto:${t("email")}` })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                    {t("email")}
                                </a>
                            </div>

                            {/* Cols 2-4 wrapper */}
                            <div className="contents lg:grid lg:grid-cols-3 lg:gap-16 xl:gap-24 2xl:gap-32">
                                {/* Col 2 — Brand & Creative */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("brandTitle")}</h4>
                                    {brandLinks.map((item, i) => (
                                        <a key={i} href={item.href} className="text-sm text-white hover:text-white/70 transition-colors duration-200">{item.label}</a>
                                    ))}
                                </div>

                                {/* Col 3 — Tech & Dev */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("techTitle")}</h4>
                                    {techLinks.map((item, i) => (
                                        <a key={i} href={item.href} className="text-sm text-white hover:text-white/70 transition-colors duration-200">{item.label}</a>
                                    ))}
                                </div>

                                {/* Col 4 — Navigation */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-secondary text-xl text-white tracking-tight mb-1">{t("navigationTitle")}</h4>
                                    {navLinks.map((item, i) => (
                                        <a key={i} href={item.href} className="text-sm text-white hover:text-white/70 transition-colors duration-200">{item.label}</a>
                                    ))}
                                </div>
                            </div>

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
                                <button
                                    onClick={() => {
                                        showCookieBanner();
                                        track("cookie_settings_click", { locale });
                                    }}
                                    className="text-[0.7rem] text-white/30 hover:text-white/60 uppercase tracking-[0.08em] transition-colors duration-200 cursor-pointer"
                                >
                                    {t("cookieSettings")}
                                </button>
                                <a href={`${base}/privacy-policy`} className="text-[0.7rem] text-white/30 hover:text-white/60 uppercase tracking-[0.08em] transition-colors duration-200" onClick={() => track("privacy_policy_click", { locale })}>{t("legal1")}</a>
                                <a href={`${base}/legal-notice`} className="text-[0.7rem] text-white/30 hover:text-white/60 uppercase tracking-[0.08em] transition-colors duration-200" onClick={() => track("legal_notice_click", { locale })}>{t("legal2")}</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
