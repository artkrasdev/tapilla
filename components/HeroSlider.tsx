"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ── Slider config ────────────────────────────────────────────────────────────
const SLIDE_DURATION = 5000; // ms per slide
const SLIDE_IMAGES = [
  { src: "/hero-card.jpg", alt: "Tapilla e-commerce project showcase - premium web design portfolio" },
  { src: "/hero-card.jpg", alt: "Shopify Plus development project by Tapilla agency" },
  { src: "/hero-card.jpg", alt: "UX/UI design excellence - Tapilla digital agency work" },
];

export default function HeroSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const slideCount = SLIDE_IMAGES.length;

    const goToSlide = useCallback((index: number) => {
        setActiveSlide(index);
        setTimerKey((k) => k + 1);
    }, []);

    return (
        <div className="hidden md:flex shrink-0 relative overflow-hidden rounded-lg w-[220px] lg:w-[280px] min-h-[340px] lg:min-h-[420px] shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex-col group">

            {/* Slides */}
            <div className="relative flex-1">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={SLIDE_IMAGES[activeSlide].src}
                            alt={SLIDE_IMAGES[activeSlide].alt}
                            fill
                            className="object-cover"
                            priority={activeSlide === 0}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Top gradient for timer visibility */}
            <div className="absolute top-0 left-0 right-0 h-20 z-9 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Timer pagination — top */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1 px-2 pt-2">
                {SLIDE_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className="relative h-[2px] flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                        aria-label={`Go to ${SLIDE_IMAGES[i].alt}`}
                    >
                        {i === activeSlide && (
                            <span
                                key={timerKey}
                                className="absolute inset-0 rounded-full bg-white origin-left group-hover:paused!"
                                style={{
                                    animation: `timer-fill ${SLIDE_DURATION}ms linear forwards`,
                                }}
                                onAnimationEnd={() => goToSlide((activeSlide + 1) % slideCount)}
                            />
                        )}
                        {i < activeSlide && (
                            <span className="absolute inset-0 rounded-full bg-white" />
                        )}
                    </button>
                ))}
            </div>

            {/* Logo + name row */}
            <div className="absolute top-4 left-2 z-10 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border-[1.5px] border-white/60 shrink-0">
                    <Image
                        src="/tapilla-white.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="text-xs font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    tapilla
                </span>
            </div>
        </div>
    );
}
