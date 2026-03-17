"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// ── Idle animation parameters ────────────────────────────────────────────────
// Cyan blob: wider, faster lemniscate
const C = { ax: 320, ay: 180, fx: 1, fy: 0.73, px: 0, py: Math.PI * 0.4 };
// Purple blob: narrower, slower, offset phase
const P = { ax: 170, ay: 90, fx: 0.6, fy: 1.1, px: Math.PI * 0.9, py: Math.PI * 0.2 };

const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;
const INTRO_SECS = 1.2; // blend-in duration for idle start

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cyanRef = useRef<HTMLDivElement>(null);
    const purpleRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("HeroSection");

    useEffect(() => {
        // ── Mobile guard — no JS animation, CSS handles it ──────────────────
        if (window.innerWidth < 767) return;

        const section = sectionRef.current!;
        const bg = bgRef.current!;
        const cyan = cyanRef.current!;
        const purple = purpleRef.current!;
        if (!section || !bg || !cyan || !purple) return;

        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

        // Centre blobs via GSAP transform (xPercent/yPercent offset built into CSS)
        gsap.set([cyan, purple], { xPercent: -50, yPercent: -50, x: 0, y: 0 });

        // Reveal blobs on first frame to trigger the CSS opacity transition
        requestAnimationFrame(() => bg.classList.add("blobs-ready"));

        // ── quickTo tweens ──────────────────────────────────────────────────
        const cx = gsap.quickTo(cyan, "x", { duration: 1.5, ease: "power2.out" });
        const cy = gsap.quickTo(cyan, "y", { duration: 1.5, ease: "power2.out" });
        const px = gsap.quickTo(purple, "x", { duration: 2.5, ease: "power2.out" });
        const py = gsap.quickTo(purple, "y", { duration: 2.5, ease: "power2.out" });

        // ── State ───────────────────────────────────────────────────────────
        let isVisible = false;
        let isMouseActive = false;
        let idleRafId: number | null = null;
        let idleTimeout: ReturnType<typeof setTimeout>;

        // ── IntersectionObserver — pause when out of view ───────────────────
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
        observer.observe(section!);

        // ── Idle lemniscate — rAF throttled to 30 fps ───────────────────────
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

            // Layered sine noise for organic drift
            const nCx = Math.sin(noiseT * 1.3) * 55 + Math.cos(noiseT * 0.7) * 30;
            const nCy = Math.cos(noiseT * 0.9) * 40 + Math.sin(noiseT * 1.7) * 25;
            const nPx = Math.sin(noiseT * 0.8 + 1) * 50 + Math.cos(noiseT * 1.2) * 35;
            const nPy = Math.cos(noiseT * 1.1 + 2) * 45 + Math.sin(noiseT * 0.6) * 20;

            const tCx = Math.sin(t2 * C.fx + C.px) * C.ax + nCx;
            const tCy = Math.cos(t2 * C.fy + C.py) * C.ay + nCy;
            const tPx = Math.sin(t2 * P.fx + P.px) * P.ax + nPx;
            const tPy = Math.cos(t2 * P.fy + P.py) * P.ay + nPy;

            // Smooth blend-in from wherever the blobs currently are
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
            startCx = gsap.getProperty(cyan, "x") as number;
            startCy = gsap.getProperty(cyan, "y") as number;
            startPx = gsap.getProperty(purple, "x") as number;
            startPy = gsap.getProperty(purple, "y") as number;
            idleRafId = requestAnimationFrame(idleFrame);
        }

        function stopIdle() {
            if (idleRafId) {
                cancelAnimationFrame(idleRafId);
                idleRafId = null;
            }
        }

        // ── Mouse tracking (fine pointer only) ──────────────────────────────
        function onMouseMove(e: MouseEvent) {
            if (!isVisible) return;

            if (!isMouseActive) {
                isMouseActive = true;
                stopIdle();
            }
            clearTimeout(idleTimeout);

            const rect = section.getBoundingClientRect();
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

        // Start idle straight away (no wait-for-mouse needed server-side)
        startIdle();

        return () => {
            observer.disconnect();
            stopIdle();
            clearTimeout(idleTimeout);
            if (hasFinePointer) {
                window.removeEventListener("mousemove", onMouseMove);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-svh w-full overflow-hidden isolate bg-(--hero-bg) flex items-center"
        >

            {/* ── Animated blob layer (stays as CSS — GSAP-driven) ── */}
            <div ref={bgRef} className="hero-bg">
                <div ref={cyanRef} className="giant-blob blob-cyan" />
                <div className="giant-blob blob-dark" />
                <div ref={purpleRef} className="giant-blob blob-purple" />

                {/* SVG noise texture */}
                <svg
                    className="hero-noise"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={2} />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="discrete" tableValues="0 0 1 1" />
                        </feComponentTransfer>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" fill="transparent" />
                </svg>

                {/* Bottom fade to black */}
                <div className="hero-bottom-fade" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto w-full max-w-[1200px] flex flex-col items-center gap-12 px-6 py-24 md:flex-row md:items-center md:gap-16 md:px-8 lg:px-12">

                {/* Left — image card */}
                <div className="shrink-0 relative overflow-hidden rounded-2xl w-[210px] h-[300px] shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                    <Image
                        src="/hero-card.jpg"
                        alt="Balzac Paris project showcase"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end pt-20 px-4 pb-4 bg-linear-to-t from-black/85 to-transparent">
                        <span className="text-xs font-light text-white/70">{t("cardLabel")}</span>
                        <span className="text-base font-semibold text-white">{t("cardName")}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500" />
                </div>

                {/* Right — text */}
                <div className="flex flex-col gap-6">
                    <p className="text-[1.4rem] font-light tracking-tight text-white/60 font-secondary">{t("tagline")}</p>

                    <h1 className="text-[clamp(3.5rem,7vw,8.5rem)] leading-[0.95] tracking-tight uppercase text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)]">
                        {t("heading").split("\n").map((line, i, arr) => (
                            <span key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>

                    <p className="max-w-[520px] text-base font-light leading-relaxed tracking-wide text-white/70">{t("description")}</p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Button render={<a href="#" />} nativeButton={false}>
                            {t("ctaPrimary")}
                        </Button>
                        <Button variant="secondary" render={<a href="#" />} nativeButton={false}>
                            {t("ctaSecondary")}
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
