"use client";

import { useEffect, useRef, useState } from "react";
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
            className={cn("site-header", scrolled && "site-header--scrolled")}
        >
            {/* Left — nav links */}
            <nav className="site-header__nav" aria-label="Main navigation">
                <a href="#" className="site-header__link">{t("agency")}</a>
                <a href="#" className="site-header__link">{t("whatWeDo")}</a>
                <a href="#" className="site-header__link">{t("clients")}</a>
                <a href="#" className="site-header__link">{t("projects")}</a>
            </nav>

            {/* Centre — wordmark */}
            <a href="/" className="site-header__logo" aria-label="agency — home">
                agency
            </a>

            {/* Right — language dropdown + CTA */}
            <div className="site-header__actions">

                {/* Language picker */}
                <div className="lang-picker" ref={dropdownRef}>
                    <button
                        className={cn("lang-picker__trigger", langOpen && "lang-picker__trigger--open")}
                        onClick={() => setLangOpen((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={langOpen}
                        aria-label="Select language"
                    >
                        <Globe size={14} strokeWidth={1.5} className="lang-picker__icon" />
                        <span className="lang-picker__label">{currentLocale.label}</span>
                        <ChevronDown
                            size={12}
                            strokeWidth={2}
                            className={cn("lang-picker__chevron", langOpen && "lang-picker__chevron--open")}
                        />
                    </button>

                    {langOpen && (
                        <div className="lang-picker__dropdown" role="listbox" aria-label="Language options">
                            {LOCALES.map((loc) => (
                                <button
                                    key={loc.code}
                                    role="option"
                                    aria-selected={loc.code === locale}
                                    className={cn(
                                        "lang-picker__option",
                                        loc.code === locale && "lang-picker__option--active"
                                    )}
                                    onClick={() => switchLocale(loc.code)}
                                >
                                    <span>{loc.label}</span>
                                    {loc.code === locale && (
                                        <Check size={12} strokeWidth={2.5} className="lang-picker__check" />
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
        </header>
    );
}
