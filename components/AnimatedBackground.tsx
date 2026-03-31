"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ── Default idle-animation parameters ──────────────────────────────────────
const DEFAULT_PRIMARY = { ax: 320, ay: 180, fx: 1, fy: 0.73, px: 0, py: Math.PI * 0.4 };
const DEFAULT_SECONDARY = { ax: 170, ay: 90, fx: 0.6, fy: 1.1, px: Math.PI * 0.9, py: Math.PI * 0.2 };

const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;
const INTRO_SECS = 1.2;

// ── Types ──────────────────────────────────────────────────────────────────
export interface BlobOrbitParams {
    /** Horizontal amplitude (px) */
    ax?: number;
    /** Vertical amplitude (px) */
    ay?: number;
    /** Horizontal frequency multiplier */
    fx?: number;
    /** Vertical frequency multiplier */
    fy?: number;
    /** Horizontal phase offset (radians) */
    px?: number;
    /** Vertical phase offset (radians) */
    py?: number;
}

export interface AnimatedBackgroundProps {
    /** Primary blob color — default: `rgba(6,182,212,0.7)` (cyan) */
    primaryColor?: string;
    /** Secondary blob color — default: `rgba(99,102,241,0.45)` (indigo/purple) */
    secondaryColor?: string;
    /** Center dark-vignette blob color — default: `rgba(2,6,23,0.95)` */
    darkColor?: string;
    /** Whether to render the SVG noise overlay — default: `true` */
    showNoise?: boolean;
    /** Noise overlay opacity 0–1 — default: `0.135` */
    noiseOpacity?: number;
    /** Whether to render the bottom-to-top black fade — default: `true` */
    showBottomFade?: boolean;
    /** Bottom-fade height (CSS value) — default: `400px` */
    bottomFadeHeight?: string;
    /** Bottom-fade gradient — overrides the default black gradient */
    bottomFadeGradient?: string;
    /** Whether mouse follow is enabled on pointer-fine devices — default: `true` */
    mouseFollow?: boolean;
    /** Idle-orbit tuning for the primary blob */
    primaryOrbit?: BlobOrbitParams;
    /** Idle-orbit tuning for the secondary blob */
    secondaryOrbit?: BlobOrbitParams;
    /** Blob blur radius (CSS value) — default: `100px` */
    blurRadius?: string;
    /** A unique id prefix for the noise SVG filter (needed when multiple instances exist) */
    id?: string;
    /** Extra className appended to the wrapper div */
    className?: string;
}

export default function AnimatedBackground({
    primaryColor = "rgba(6,182,212,0.7)",
    secondaryColor = "rgba(99,102,241,0.45)",
    darkColor = "rgba(2,6,23,0.95)",
    showNoise = true,
    noiseOpacity = 0.135,
    showBottomFade = true,
    bottomFadeHeight = "400px",
    bottomFadeGradient,
    mouseFollow = true,
    primaryOrbit,
    secondaryOrbit,
    blurRadius = "100px",
    id,
    className,
}: AnimatedBackgroundProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const primaryRef = useRef<HTMLDivElement>(null);
    const secondaryRef = useRef<HTMLDivElement>(null);

    const filterId = id ? `noiseFilter-${id}` : `noiseFilter-${Math.random().toString(36).slice(2, 8)}`;

    // Merge user orbit overrides with defaults
    const C = { ...DEFAULT_PRIMARY, ...primaryOrbit };
    const P = { ...DEFAULT_SECONDARY, ...secondaryOrbit };

    useEffect(() => {
        const wrapper = wrapperRef.current!;
        const primary = primaryRef.current!;
        const secondary = secondaryRef.current!;
        if (!wrapper || !primary || !secondary) return;

        // Find the closest positioned ancestor to scope IntersectionObserver
        const scopeEl = wrapper.parentElement ?? wrapper;

        const hasFinePointer = mouseFollow && window.matchMedia("(pointer: fine)").matches;

        gsap.set([primary, secondary], { xPercent: -50, yPercent: -50, x: 0, y: 0 });
        requestAnimationFrame(() => wrapper.classList.add("blobs-ready"));

        const cx = gsap.quickTo(primary, "x", { duration: 1.5, ease: "power2.out" });
        const cy = gsap.quickTo(primary, "y", { duration: 1.5, ease: "power2.out" });
        const px = gsap.quickTo(secondary, "x", { duration: 2.5, ease: "power2.out" });
        const py = gsap.quickTo(secondary, "y", { duration: 2.5, ease: "power2.out" });

        let isVisible = false;
        let isMouseActive = false;
        let idleRafId: number | null = null;
        let idleTimeout: ReturnType<typeof setTimeout>;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (!isVisible) stopIdle();
                    else if (!isMouseActive) startIdle();
                });
            },
            { threshold: 0.05 },
        );
        observer.observe(scopeEl);

        let t2 = 0;
        let noiseT = Math.random() * 100;
        let startCx = 0, startCy = 0, startPx = 0, startPy = 0;
        let lastRafTime = 0;

        function idleFrame(now: number) {
            if (!isVisible) return;
            idleRafId = requestAnimationFrame(idleFrame);
            if (now - lastRafTime < FRAME_MS) return;
            lastRafTime = now;

            t2 += 0.008;
            noiseT += 0.003;

            const nCx = Math.sin(noiseT * 1.3) * 55 + Math.cos(noiseT * 0.7) * 30;
            const nCy = Math.cos(noiseT * 0.9) * 40 + Math.sin(noiseT * 1.7) * 25;
            const nPx = Math.sin(noiseT * 0.8 + 1) * 50 + Math.cos(noiseT * 1.2) * 35;
            const nPy = Math.cos(noiseT * 1.1 + 2) * 45 + Math.sin(noiseT * 0.6) * 20;

            const tCx = Math.sin(t2 * C.fx! + C.px!) * C.ax! + nCx;
            const tCy = Math.cos(t2 * C.fy! + C.py!) * C.ay! + nCy;
            const tPx = Math.sin(t2 * P.fx! + P.px!) * P.ax! + nPx;
            const tPy = Math.cos(t2 * P.fy! + P.py!) * P.ay! + nPy;

            const raw = Math.min(t2 / INTRO_SECS, 1);
            const eased = raw < 1 ? raw * raw * (3 - 2 * raw) : 1;

            cx(startCx + (tCx - startCx) * eased || tCx);
            cy(startCy + (tCy - startCy) * eased || tCy);
            px(startPx + (tPx - startPx) * eased || tPx);
            py(startPy + (tPy - startPy) * eased || tPy);
        }

        function startIdle() {
            if (!isVisible || idleRafId) return;
            t2 = 0;
            startCx = gsap.getProperty(primary, "x") as number;
            startCy = gsap.getProperty(primary, "y") as number;
            startPx = gsap.getProperty(secondary, "x") as number;
            startPy = gsap.getProperty(secondary, "y") as number;
            idleRafId = requestAnimationFrame(idleFrame);
        }

        function stopIdle() {
            if (idleRafId) {
                cancelAnimationFrame(idleRafId);
                idleRafId = null;
            }
        }

        function onMouseMove(e: MouseEvent) {
            if (!isVisible) return;
            if (!isMouseActive) {
                isMouseActive = true;
                stopIdle();
            }
            clearTimeout(idleTimeout);

            const rect = scopeEl.getBoundingClientRect();
            const ox = e.clientX - (rect.left + rect.width / 2);
            const oy = e.clientY - (rect.top + rect.height / 2);

            cx(ox * 0.9);
            cy(oy * 0.4);
            px(-ox * 0.4);
            py(-oy * 0.2);

            idleTimeout = setTimeout(() => {
                isMouseActive = false;
                if (isVisible) startIdle();
            }, 1200);
        }

        if (hasFinePointer) {
            window.addEventListener("mousemove", onMouseMove, { passive: true });
        }

        startIdle();

        return () => {
            observer.disconnect();
            stopIdle();
            clearTimeout(idleTimeout);
            if (hasFinePointer) {
                window.removeEventListener("mousemove", onMouseMove);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`animated-bg${className ? ` ${className}` : ""}`}
        >
            {/* Primary blob */}
            <div
                ref={primaryRef}
                className="animated-bg__blob"
                style={{
                    background: `radial-gradient(circle at center, ${primaryColor}, transparent 65%)`,
                    filter: `blur(${blurRadius})`,
                }}
            />

            {/* Center dark vignette */}
            <div
                className="animated-bg__blob animated-bg__blob--static"
                style={{
                    background: `radial-gradient(circle at center, ${darkColor}, transparent 50%)`,
                    filter: `blur(${blurRadius})`,
                    opacity: 1,
                }}
            />

            {/* Secondary blob */}
            <div
                ref={secondaryRef}
                className="animated-bg__blob"
                style={{
                    background: `radial-gradient(circle at center, ${secondaryColor}, transparent 65%)`,
                    filter: `blur(${blurRadius})`,
                }}
            />

            {/* Noise texture overlay */}
            {showNoise && (
                <svg
                    className="animated-bg__noise"
                    style={{ opacity: noiseOpacity }}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={2} />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="discrete" tableValues="0 0 1 1" />
                        </feComponentTransfer>
                    </filter>
                    <rect width="100%" height="100%" filter={`url(#${filterId})`} fill="transparent" />
                </svg>
            )}

            {/* Bottom fade */}
            {showBottomFade && (
                <div
                    className="animated-bg__bottom-fade"
                    style={{
                        height: bottomFadeHeight,
                        background: bottomFadeGradient ?? "linear-gradient(to top, #000 0%, rgba(0,0,0,0.9) 35%, transparent 100%)",
                    }}
                />
            )}
        </div>
    );
}
