"use client";

import { useLocale } from "next-intl";

/* ── Logo sets per locale ──────────────────────────────────────────── */

const logosByLocale: Record<string, { src: string; alt: string }[]> = {
    en: [
        { src: "/logos/eng/12storeez.svg", alt: "12 Storeez" },
        { src: "/logos/eng/cdek-logo.svg", alt: "CDEK" },
        { src: "/logos/eng/hyperpc-logo-white-name-only-stencil.svg", alt: "HyperPC" },
        { src: "/logos/eng/lamoda-wordmark-logo.svg", alt: "Lamoda" },
        { src: "/logos/eng/lime.svg", alt: "Lime" },
        { src: "/logos/eng/polaris.svg", alt: "Polaris" },
        { src: "/logos/eng/pure-sense.svg", alt: "Pure Sense" },
    ],
    ru: [
        { src: "/logos/ru/12storeez.svg", alt: "12 Storeez" },
        { src: "/logos/ru/divan.svg", alt: "Диван.ру" },
        { src: "/logos/ru/ile-de-beaute-horizontal-logo.svg", alt: "Иль де Ботэ" },
        { src: "/logos/ru/lime.svg", alt: "Lime" },
        { src: "/logos/ru/pure-sense.svg", alt: "Pure Sense" },
        { src: "/logos/ru/rivegauche-horizontal-logo.svg", alt: "Рив Гош" },
        { src: "/logos/ru/sportmaster-horizontal-logo.svg", alt: "Спортмастер" },
    ],
};

interface LogoMarqueeProps {
    /** Animation duration in seconds (lower = faster). Default: 18 */
    speed?: number;
}

export default function LogoMarquee({ speed = 18 }: LogoMarqueeProps) {
    const locale = useLocale();
    const logos = logosByLocale[locale] ?? logosByLocale.en;

    /* We render the track twice so the second copy slides in seamlessly */
    const track = (key: string) => (
        <div key={key} className="marquee-track" aria-hidden={key === "b"}>
            {logos.map((logo) => (
                <div key={`${key}-${logo.alt}`} className="marquee-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        className="marquee-logo"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <section className="marquee-section">
            <div
                className="marquee-container"
                style={{ animationDuration: `${speed}s` }}
            >
                {track("a")}
                {track("b")}
            </div>
        </section>
    );
}
