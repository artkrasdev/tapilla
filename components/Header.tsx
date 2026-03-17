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
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Header");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // Scroll listener
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
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
            className={cn(
                "fixed top-0 left-0 right-0 z-100 bg-transparent transition-[background,backdrop-filter,box-shadow] duration-450 ease-in-out",
                scrolled && "bg-[rgba(5,8,20,0.96)] backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            )}
        >
            <div className="mx-auto flex w-full max-w-content items-center justify-between px-8 h-16">
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
                        <button
                            className={cn(
                                "inline-flex items-center gap-1.5 h-7.5 px-2.5 text-[0.775rem] font-medium tracking-[0.02em] text-white/85 bg-white/6 border border-white/14 rounded-md cursor-pointer transition-[background,border-color,color] duration-200 whitespace-nowrap",
                                langOpen && "bg-white/11 border-white/28 text-white"
                            )}
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            aria-label="Select language"
                        >
                            <Globe size={14} strokeWidth={1.5} className="opacity-70 shrink-0" />
                            <span className="leading-none">{currentLocale.label}</span>
                            <ChevronDown
                                size={12}
                                strokeWidth={2}
                                className={cn(
                                    "opacity-60 shrink-0 transition-transform duration-200",
                                    langOpen && "rotate-180"
                                )}
                            />
                        </button>

                        {langOpen && (
                            <div
                                className="absolute top-[calc(100%+0.5rem)] right-0 w-full bg-white/6 border border-white/18 rounded-lg backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-200 p-1 animate-[lang-dropdown-in_0.15s_ease_forwards]"
                                role="listbox"
                                aria-label="Language options"
                            >
                                {LOCALES.map((loc) => (
                                    <button
                                        key={loc.code}
                                        role="option"
                                        aria-selected={loc.code === locale}
                                        className={cn(
                                            "flex items-center justify-between gap-2 w-full py-2 px-2.5 text-[0.8rem] font-normal text-white/70 bg-transparent border-none rounded-[5px] cursor-pointer text-left transition-[background,color] duration-150 hover:bg-white/10 hover:text-white",
                                            loc.code === locale && "text-white font-medium"
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

                    <Button variant="accent" render={<a href="#contact" />} nativeButton={false}>
                        {t("contact")}
                    </Button>
                </div>
            </div>
        </header>
    );
}
