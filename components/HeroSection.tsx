"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import HeroSlider from "@/components/HeroSlider";

// ── Idle animation parameters ────────────────────────────────────────────────
const C = { ax: 320, ay: 180, fx: 1, fy: 0.73, px: 0, py: Math.PI * 0.4 };
const P = { ax: 170, ay: 90, fx: 0.6, fy: 1.1, px: Math.PI * 0.9, py: Math.PI * 0.2 };

const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;
const INTRO_SECS = 1.2;

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cyanRef = useRef<HTMLDivElement>(null);
    const purpleRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("HeroSection");

    // ── Blob animation ───────────────────────────────────────────────────────
    useEffect(() => {
        if (window.innerWidth < 767) return;

        const section = sectionRef.current!;
        const bg = bgRef.current!;
        const cyan = cyanRef.current!;
        const purple = purpleRef.current!;
        if (!section || !bg || !cyan || !purple) return;

        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

        gsap.set([cyan, purple], { xPercent: -50, yPercent: -50, x: 0, y: 0 });
        requestAnimationFrame(() => bg.classList.add("blobs-ready"));

        const cx = gsap.quickTo(cyan, "x", { duration: 1.5, ease: "power2.out" });
        const cy = gsap.quickTo(cyan, "y", { duration: 1.5, ease: "power2.out" });
        const px = gsap.quickTo(purple, "x", { duration: 2.5, ease: "power2.out" });
        const py = gsap.quickTo(purple, "y", { duration: 2.5, ease: "power2.out" });

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
        observer.observe(section!);

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

            const tCx = Math.sin(t2 * C.fx + C.px) * C.ax + nCx;
            const tCy = Math.cos(t2 * C.fy + C.py) * C.ay + nCy;
            const tPx = Math.sin(t2 * P.fx + P.px) * P.ax + nPx;
            const tPy = Math.cos(t2 * P.fy + P.py) * P.ay + nPy;

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
            className="relative h-svh max-h-[900px] w-full overflow-hidden isolate bg-(--hero-bg) flex items-center"
        >

            {/* ── Animated blob layer (stays as CSS — GSAP-driven) ── */}
            <div ref={bgRef} className="hero-bg">
                <div ref={cyanRef} className="giant-blob blob-cyan" />
                <div className="giant-blob blob-dark" />
                <div ref={purpleRef} className="giant-blob blob-purple" />

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

                <div className="hero-bottom-fade" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto w-full max-w-content flex flex-col items-center gap-12 px-6 py-24 md:flex-row md:items-stretch md:gap-30 md:px-8 lg:px-12 md:justify-center">

                {/* Left — Slider card */}
                <HeroSlider />

                {/* Right — text */}
                <div className="flex flex-col gap-6 justify-center">
                    <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">{t("tagline")}</p>

                    <h1 className="text-[clamp(3.5rem,10vw,7.6rem)] leading-[0.95] tracking-tighter uppercase text-white [text-shadow:10px_8px_12px_rgba(0,0,0,0.20)]">
                        {t("heading").split("\n").map((line, i, arr) => (
                            <span key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>

                    <p className="max-w-[600px] text-base font-light leading-5 tracking-tight text-white">{t("description")}</p>

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
