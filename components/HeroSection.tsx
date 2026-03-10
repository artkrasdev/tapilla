"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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
        let t = 0;
        let noiseT = Math.random() * 100;
        let startCx = 0, startCy = 0, startPx = 0, startPy = 0;
        let lastRafTime = 0;

        function idleFrame(now: number) {
            if (!isVisible) return;
            idleRafId = requestAnimationFrame(idleFrame);

            if (now - lastRafTime < FRAME_MS) return;
            lastRafTime = now;

            t += 0.008;
            noiseT += 0.003;

            // Layered sine noise for organic drift
            const nCx = Math.sin(noiseT * 1.3) * 55 + Math.cos(noiseT * 0.7) * 30;
            const nCy = Math.cos(noiseT * 0.9) * 40 + Math.sin(noiseT * 1.7) * 25;
            const nPx = Math.sin(noiseT * 0.8 + 1) * 50 + Math.cos(noiseT * 1.2) * 35;
            const nPy = Math.cos(noiseT * 1.1 + 2) * 45 + Math.sin(noiseT * 0.6) * 20;

            const tCx = Math.sin(t * C.fx + C.px) * C.ax + nCx;
            const tCy = Math.cos(t * C.fy + C.py) * C.ay + nCy;
            const tPx = Math.sin(t * P.fx + P.px) * P.ax + nPx;
            const tPy = Math.cos(t * P.fy + P.py) * P.ay + nPy;

            // Smooth blend-in from wherever the blobs currently are
            const raw = Math.min(t / INTRO_SECS, 1);
            const eased = raw < 1 ? raw * raw * (3 - 2 * raw) : 1;

            cx(startCx + (tCx - startCx) * eased || tCx);
            cy(startCy + (tCy - startCy) * eased || tCy);
            px(startPx + (tPx - startPx) * eased || tPx);
            py(startPy + (tPy - startPy) * eased || tPy);
        }

        function startIdle() {
            if (!isVisible || idleRafId) return;
            t = 0;
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
        <section ref={sectionRef} className="hero-section">

            {/* ── Animated blob layer ── */}
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
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="2" />
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
            <div className="hero-content">

                {/* Left — image card */}
                <div className="hero-card">
                    <Image
                        src="/hero-card.jpg"
                        alt="Balzac Paris project showcase"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="hero-card-overlay">
                        <span className="hero-card-label">Zoomé sur</span>
                        <span className="hero-card-name">Balzac Paris</span>
                    </div>
                    <div className="hero-card-accent" />
                </div>

                {/* Right — text */}
                <div className="hero-text">
                    <p className="hero-tagline">Create. Develop. Perform.</p>

                    <h1 className="hero-heading">
                        Agence Web
                        <br />
                        E-Commerce
                        <br />
                        Marketing
                    </h1>

                    <p className="hero-description">
                        Nous concevons des sites e-commerce et corporate pensés pour
                        refléter votre univers, fluidifier la navigation et maximiser les
                        conversions. Design exigeant, développement solide, vision business
                        et accompagnement long terme.
                    </p>

                    <div className="hero-ctas">
                        <a href="#" className="hero-btn-primary">
                            Démarrer votre projet
                        </a>
                        <a href="#" className="hero-btn-secondary">
                            Découvrir nos réalisations
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
