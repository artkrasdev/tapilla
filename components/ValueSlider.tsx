"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

// ── Types ────────────────────────────────────────────────────────────────────
interface ValueItem {
    title: string;
    subtitle: string;
}

interface ValueSliderProps {
    /** Scroll speed in seconds for one full cycle (default: 40) */
    speed?: number;
}

// ── Translation keys (order matters) ─────────────────────────────────────────
const VALUE_KEYS = [
    "onTime",
    "onBudget",
    "proactive",
    "conversionFocused",
    "bespoke",
    "specialized",
    "transparent",
    "partnerPreferred",
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────────
/** Extract the current translateX value from a computed transform matrix */
function getTranslateX(el: HTMLElement): number {
    const style = window.getComputedStyle(el);
    const matrix = style.transform;
    if (!matrix || matrix === "none") return 0;
    // matrix(a, b, c, d, tx, ty)
    const match = matrix.match(/matrix.*\((.+)\)/);
    if (!match) return 0;
    const values = match[1].split(",").map(Number);
    return values[4] ?? 0;
}

// ── Card ─────────────────────────────────────────────────────────────────────
function ValueCard({
    title,
    subtitle,
    onHover,
    onLeave,
}: ValueItem & {
    onHover: () => void;
    onLeave: () => void;
}) {
    return (
        <div
            className="relative flex flex-col justify-start gap-4 shrink-0 w-[300px] h-[210px] md:w-[360px] md:h-[240px] lg:w-[420px] lg:h-[270px] rounded border border-white/10 bg-white/3 backdrop-blur-sm p-6 md:p-7 lg:p-8 overflow-hidden group/card transition-colors duration-300 hover:border-white/20 hover:bg-white/6"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Title */}
            <h3 className="text-[1.25rem] md:text-[1.4rem] lg:text-[1.55rem] font-semibold tracking-tight text-white leading-tight">
                {title}
            </h3>

            {/* Subtitle */}
            <p className="text-[0.8rem] md:text-[0.85rem] lg:text-[0.875rem] font-light leading-[1.55] tracking-tight text-white/55">
                {subtitle}
            </p>
        </div>
    );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ValueSlider({ speed = 40 }: ValueSliderProps) {
    const t = useTranslations("AgencyPage.Values");
    const [paused, setPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Drag state (refs to avoid re-renders during drag)
    const dragging = useRef(false);
    const startX = useRef(0);
    const dragOffset = useRef(0);
    const frozenX = useRef(0);

    // Build translated items
    const values: ValueItem[] = VALUE_KEYS.map((key) => ({
        title: t(`${key}.title`),
        subtitle: t(`${key}.subtitle`),
    }));

    // ── Touch handlers ───────────────────────────────────────────────────────
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!trackRef.current) return;
        dragging.current = true;
        startX.current = e.touches[0].clientX;
        // Freeze the current animated position
        frozenX.current = getTranslateX(trackRef.current);
        dragOffset.current = 0;
        // Pause animation, apply frozen position manually
        setPaused(true);
        trackRef.current.style.animation = "none";
        trackRef.current.style.transform = `translateX(${frozenX.current}px)`;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    }, []);

    // Attach a non-passive touchmove so we can preventDefault (block page scroll)
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const onTouchMove = (e: TouchEvent) => {
            if (!dragging.current) return;
            // Prevent vertical page scroll while dragging the slider
            e.preventDefault();
            const currentX = e.touches[0].clientX;
            dragOffset.current = currentX - startX.current;
            const totalWidth = el.scrollWidth / 2;
            let newX = frozenX.current + dragOffset.current;
            if (newX > 0) newX -= totalWidth;
            if (newX < -totalWidth) newX += totalWidth;
            el.style.transform = `translateX(${newX}px)`;
        };

        el.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => el.removeEventListener("touchmove", onTouchMove);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!dragging.current || !trackRef.current) return;
        dragging.current = false;
        const el = trackRef.current;
        const totalWidth = el.scrollWidth / 2;
        // Compute final position and the animation offset percentage
        let finalX = frozenX.current + dragOffset.current;
        if (finalX > 0) finalX -= totalWidth;
        if (finalX < -totalWidth) finalX += totalWidth;
        // Convert position to animation progress (0% → 0px, 100% → -totalWidth)
        const progress = Math.abs(finalX) / totalWidth;
        // Restore the CSS animation from this offset using negative delay
        el.style.transform = "";
        el.style.animation = `value-slider-scroll ${speed}s linear infinite`;
        el.style.animationDelay = `-${progress * speed}s`;
        // Auto-resume after a brief pause so user can read
        resumeTimer.current = setTimeout(() => setPaused(false), 2000);
    }, [speed]);

    return (
        <section className="relative w-full bg-black overflow-hidden py-6">
            <div
                ref={trackRef}
                className="flex w-max"
                style={{
                    animation: `value-slider-scroll ${speed}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Original track */}
                <div className="flex items-stretch gap-1.5 pr-1.5 shrink-0">
                    {values.map((item, i) => (
                        <ValueCard
                            key={`a-${i}`}
                            {...item}
                            onHover={() => setPaused(true)}
                            onLeave={() => setPaused(false)}
                        />
                    ))}
                </div>

                {/* Duplicated track for seamless loop */}
                <div
                    className="flex items-stretch gap-1.5 pr-1.5 shrink-0"
                    aria-hidden="true"
                >
                    {values.map((item, i) => (
                        <ValueCard
                            key={`b-${i}`}
                            {...item}
                            onHover={() => setPaused(true)}
                            onLeave={() => setPaused(false)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
