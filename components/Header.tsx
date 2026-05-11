"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown, Check, Menu, X } from "lucide-react";
import { handleAnchorClick } from "@/lib/scroll-utils";

const LOCALES = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
] as const;

export default function Header() {
    const [scrollOpacity, setScrollOpacity] = useState(0);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // Gradually fade header background from transparent → black over scroll
    useEffect(() => {
        const onScroll = () => {
            const opacity = Math.min(window.scrollY / 800, 1);
            setScrollOpacity(opacity);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        if (!langOpen) return;
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [langOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    function switchLocale(code: string) {
        const newPath = pathname.replace(`/${locale}`, `/${code}`);
        router.push(newPath);
        setLangOpen(false);
    }

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

    const navLinks = [
        { label: t("agency"), href: `/${locale}/agency` },
        { label: t("whatWeDo"), href: `/${locale}/services` },
    ];

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-100"
            >
                {/* Background Layer */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})`,
                        backdropFilter: scrollOpacity > 0 ? `blur(${scrollOpacity * 12}px)` : "none",
                    }}
                />

                <div className="relative z-10 mx-auto flex w-full max-w-content items-center justify-between px-[5%] md:px-8 h-16">

                    {/* ═══ MOBILE: Burger button (left) ═══ */}
                    <button
                        className="lg:hidden flex items-center justify-center w-10 h-10 -ml-2 cursor-pointer"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="text-white" />
                    </button>

                    {/* ═══ DESKTOP: Left nav links ═══ */}
                    <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-base font-normal -tracking-[0.025em] text-white no-underline capitalize transition-colors duration-200 hover:text-white/75"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Centre — logo */}
                    <a
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 hover:opacity-80"
                        aria-label="Tapilla — home"
                    >
                        <Image
                            src="/tapilla-white.png"
                            alt="Tapilla"
                            width={548}
                            height={206}
                            className="h-8 w-auto lg:h-8"
                            priority
                        />
                    </a>

                    {/* Right side */}
                    <div className="flex items-center gap-5">

                        {/* ═══ DESKTOP: Language picker ═══ */}
                        <div className="relative hidden lg:block" ref={dropdownRef}>
                            {/* Placeholder so header layout stays stable */}
                            <div className="invisible h-7.5 flex items-center gap-1.5 px-2.5 text-[0.775rem] font-medium border border-transparent">
                                <Globe size={14} strokeWidth={1.5} className="shrink-0" />
                                <span className="leading-none text-center">{currentLocale.label}</span>
                                <ChevronDown size={12} strokeWidth={2} className="shrink-0" />
                            </div>

                            {/* Dropdown container */}
                            <div
                                className={cn(
                                    "absolute top-0 left-0 w-full flex flex-col overflow-hidden border backdrop-blur-[20px] transition-[background,border-color,border-radius,height] duration-300 ease-out",
                                    langOpen
                                        ? "bg-white/15 border-white/25 rounded-[6px] shadow-lg z-20"
                                        : "bg-white/10 border-white/10 rounded-[6px] z-10 hover:bg-white/15"
                                )}
                            >
                                <button
                                    className="inline-flex w-full items-center justify-between gap-1.5 h-[28px] px-2.5 text-[0.775rem] font-medium tracking-[0.02em] text-white/90 cursor-pointer whitespace-nowrap outline-none"
                                    onClick={() => setLangOpen((v) => !v)}
                                    aria-haspopup="listbox"
                                    aria-expanded={langOpen}
                                    aria-label="Select language"
                                >
                                    <Globe size={14} strokeWidth={1.5} className="opacity-80 shrink-0 pointer-events-none" />
                                    <span className="leading-none text-center flex-1 pointer-events-none">{currentLocale.label}</span>
                                    <ChevronDown
                                        size={12}
                                        strokeWidth={2}
                                        className={cn(
                                            "opacity-70 shrink-0 transition-transform duration-300 pointer-events-none",
                                            langOpen && "rotate-180"
                                        )}
                                    />
                                </button>

                                {langOpen && (
                                    <div
                                        className="w-full px-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-300"
                                        role="listbox"
                                        aria-label="Language options"
                                    >
                                        <div className="mx-1 h-px bg-white/10 mb-1 rounded-full" />
                                        {LOCALES.map((loc) => (
                                            <button
                                                key={loc.code}
                                                role="option"
                                                aria-selected={loc.code === locale}
                                                className={cn(
                                                    "flex items-center justify-between gap-2 w-full py-1.5 px-1.5 text-[0.8rem] text-white/80 rounded-[4px] cursor-pointer text-left transition-colors duration-200 hover:bg-white/10 hover:text-white",
                                                    loc.code === locale && "text-white font-medium bg-white/10"
                                                )}
                                                onClick={() => switchLocale(loc.code)}
                                            >
                                                <span>{loc.label}</span>
                                                {loc.code === locale && (
                                                    <Check size={12} strokeWidth={2.5} className="text-white shrink-0" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA button — visible on all sizes */}
                        <Button 
                            variant="accent" 
                            render={<a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} />} 
                            nativeButton={false}
                        >
                            <span className="hidden sm:inline">{t("contact")}</span>
                            <span className="sm:hidden text-[0.7rem]">{t("contact")}</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════════
                MOBILE SLIDE-IN MENU
            ═══════════════════════════════════════════════════════════════ */}

            {/* Backdrop overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[200] bg-black/60 backdrop-blur-[2px] transition-opacity duration-700 lg:hidden",
                    mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Slide-in panel */}
            <nav
                className={cn(
                    "fixed top-0 left-0 bottom-0 z-[201] w-[82%] max-w-[450px] bg-black flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
                aria-label="Mobile navigation"
            >
                {/* Top bar — logo + close */}
                <div className="flex px-6 pt-10 pb-2 shrink-0 relative">
                    <a href="/" aria-label="Tapilla — home" onClick={closeMobileMenu}>
                        <Image
                            src="/tapilla-white.png"
                            alt="Tapilla"
                            width={548}
                            height={206}
                            className="h-10 w-auto"
                        />
                    </a>
                    <button
                        className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 cursor-pointer text-white/90 hover:text-white transition-colors"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                    >
                        <X size={30} strokeWidth={2} />
                    </button>
                </div>

                {/* Nav links */}
                <div className="flex flex-col px-6 pt-6 gap-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="text-[1.05rem] font-normal text-white/90 no-underline py-3 transition-colors duration-200 hover:text-white"
                            style={{
                                opacity: mobileMenuOpen ? 1 : 0,
                                transform: mobileMenuOpen ? "translateY(0)" : "translateY(8px)",
                                transition: `opacity 0.6s ease ${0.25 + i * 0.08}s, transform 0.6s ease ${0.25 + i * 0.08}s`,
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* CTA button */}
                    <div
                        className="pt-5"
                        style={{
                            opacity: mobileMenuOpen ? 1 : 0,
                            transform: mobileMenuOpen ? "translateY(0)" : "translateY(8px)",
                            transition: `opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s`,
                        }}
                    >
                        <Button
                            variant="default"
                            className="w-full py-5 text-sm"
                            onClick={(e) => {
                                handleAnchorClick(e, "contact");
                                closeMobileMenu();
                            }}
                            render={<a href="#contact" />}
                            nativeButton={false}
                        >
                            {t("startProject")}
                        </Button>
                    </div>
                </div>

                {/* Language switcher (mobile) */}
                <div
                    className="px-6 pt-6 pb-12 mt-auto"
                    style={{
                        opacity: mobileMenuOpen ? 1 : 0,
                        transform: mobileMenuOpen ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s`,
                    }}
                >
                    <div className="flex items-center gap-3 py-2 text-white/60">
                        <Globe size={18} strokeWidth={1.5} className="shrink-0" />
                        {LOCALES.map((loc, index) => (
                            <div key={loc.code} className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        switchLocale(loc.code);
                                        closeMobileMenu();
                                    }}
                                    className={cn(
                                        "text-[0.9rem] tracking-wide cursor-pointer transition-colors duration-200",
                                        loc.code === locale
                                            ? "text-white font-medium"
                                            : "text-white/40 hover:text-white/70"
                                    )}
                                >
                                    {loc.label}
                                </button>
                                {index < LOCALES.length - 1 && (
                                    <span className="text-white/20 text-sm">/</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
