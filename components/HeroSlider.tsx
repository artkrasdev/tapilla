"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Slider config ────────────────────────────────────────────────────────────
const SLIDE_VIDEOS = [
  { src: "/videos/hero-video-1.webm", alt: "Tapilla e-commerce project showcase - premium web design portfolio" },
  { src: "/videos/hero-video-2.webm", alt: "Shopify Plus development project by Tapilla agency" },
  { src: "/videos/hero-video-3.webm", alt: "UX/UI design excellence - Tapilla digital agency work" },
];

export default function HeroSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const [slideDuration, setSlideDuration] = useState(5000); // ms, will be updated from video
    const [isHovered, setIsHovered] = useState(false);
    const slideCount = SLIDE_VIDEOS.length;
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        SLIDE_VIDEOS.forEach((_, i) => {
            const video = videoRefs.current[i];
            if (!video) return;
            if (i === activeSlide) {
                if (isHovered) {
                    video.pause();
                } else {
                    video.play().catch(() => {});
                }
            } else {
                video.pause();
            }
        });
    }, [activeSlide, isHovered]);

    const handleLoadedMetadata = useCallback((index: number) => () => {
        const video = videoRefs.current[index];
        if (video && video.duration && index === activeSlide) {
            setSlideDuration(video.duration * 1000); // Convert to ms
        }
    }, [activeSlide]);

    const goToSlide = useCallback((index: number) => {
        setActiveSlide(index);
        setTimerKey((k) => k + 1);
    }, []);

    return (
        <div
            className="hidden md:flex shrink-0 relative overflow-hidden rounded-lg w-[220px] lg:w-[280px] min-h-[340px] lg:min-h-[420px] shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex-col group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Slides */}
            <div className="relative flex-1">
                {SLIDE_VIDEOS.map((slide, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: i === activeSlide ? 1 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <video
                            ref={(el) => { videoRefs.current[i] = el; }}
                            src={slide.src}
                            aria-label={slide.alt}
                            muted
                            loop
                            playsInline
                            onLoadedMetadata={handleLoadedMetadata(i)}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Top gradient for timer visibility */}
            <div className="absolute top-0 left-0 right-0 h-20 z-9 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Timer pagination — top */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1 px-2 pt-2">
                {SLIDE_VIDEOS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className="relative h-[2px] flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                        aria-label={`Go to ${SLIDE_VIDEOS[i].alt}`}
                    >
                        {i === activeSlide && (
                            <span
                                key={timerKey}
                                className="absolute inset-0 rounded-full bg-white origin-left"
                                style={{
                                    animationName: 'timer-fill',
                                    animationDuration: `${slideDuration}ms`,
                                    animationTimingFunction: 'linear',
                                    animationFillMode: 'forwards',
                                    animationPlayState: isHovered ? 'paused' : 'running',
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
                <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden border-[1.5px] border-white/60 shrink-0">
                    <Image
                        src="/favicon.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="object-cover w-3/4 h-3/4"
                    />
                </div>
                <span className="text-xs font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    tapilla
                </span>
            </div>
        </div>
    );
}
