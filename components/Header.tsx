"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";

const LOCALES = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
] as const;

export default function Header() {
    const [scrollOpacity, setScrollOpacity] = useState(0);
    const [langOpen, setLangOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // Gradually fade header background from transparent → black over 0–300px scroll
    useEffect(() => {
        const onScroll = () => {
            const opacity = Math.min(window.scrollY / 800, 1);
            setScrollOpacity(opacity);
        };
        onScroll(); // check immediately on mount
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

    function switchLocale(code: string) {
        const newPath = pathname.replace(`/${locale}`, `/${code}`);
        router.push(newPath);
        setLangOpen(false);
    }

    const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-100"
        >
            {/* Background Layer — moved here to prevent nested backdrop-filter bug breaking the dropdown blur */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})`,
                    backdropFilter: scrollOpacity > 0 ? `blur(${scrollOpacity * 12}px)` : "none",
                }}
            />

            <div className="relative z-10 mx-auto flex w-full max-w-content items-center justify-between px-8 h-16">
                {/* Left — nav links */}
                <nav className="flex items-center gap-8" aria-label="Main navigation">
                    <a href="#" className="text-base font-normal -tracking-[0.025em] text-white no-underline capitalize transition-colors duration-200 hover:text-white/75">{t("agency")}</a>
                    <a href="#" className="text-base font-normal -tracking-[0.025em] text-white no-underline capitalize transition-colors duration-200 hover:text-white/75">{t("whatWeDo")}</a>
                    <a href="#" className="text-base font-normal -tracking-[0.025em] text-white no-underline capitalize transition-colors duration-200 hover:text-white/75">{t("clients")}</a>
                    <a href="#" className="text-base font-normal -tracking-[0.025em] text-white no-underline capitalize transition-colors duration-200 hover:text-white/75">{t("projects")}</a>
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
                        className="h-8 w-auto"
                        priority
                    />
                </a>

                {/* Right — language dropdown + CTA */}
                <div className="flex items-center gap-5">

                    {/* Language picker */}
                    <div className="relative" ref={dropdownRef}>
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

                    <Button variant="accent" render={<a href="#contact" />} nativeButton={false}>
                        {t("contact")}
                    </Button>
                </div>
            </div>
        </header>
    );
}
