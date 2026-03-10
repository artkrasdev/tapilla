"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            ref={headerRef}
            className={cn("site-header", scrolled && "site-header--scrolled")}
        >
            {/* Left — nav links */}
            <nav className="site-header__nav" aria-label="Main navigation">
                <a href="#" className="site-header__link">L&apos;Agence</a>
                <a href="#" className="site-header__link">Expertises</a>
                <a href="#" className="site-header__link">Clients</a>
                <a href="#" className="site-header__link">Projets</a>
            </nav>

            {/* Centre — wordmark */}
            <a href="/" className="site-header__logo" aria-label="Axome — home">
                agency
            </a>

            {/* Right — badge + CTA */}
            <div className="site-header__actions">
                <a href="#contact" className="site-header__cta">
                    Contactez-nous
                </a>
            </div>
        </header>
    );
}
