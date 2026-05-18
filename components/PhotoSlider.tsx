"use client";

import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────────────
interface PhotoSliderProps {
    /** Array of image paths to display */
    photos: string[];
    /** Scroll speed in seconds for one full cycle (default: 20) */
    speed?: number;
    /** Additional classes */
    className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function PhotoSlider({ photos, speed = 20, className = "" }: PhotoSliderProps) {
    return (
        <section className={`relative w-full bg-black overflow-hidden py-6 ${className}`}>
            <div
                className="flex w-max"
                style={{
                    animation: `photo-slider-scroll ${speed}s linear infinite`,
                }}
            >
                {/* Original track */}
                <div className="flex items-stretch gap-1.5 pr-1.5 shrink-0">
                    {photos.map((src, i) => (
                        <div
                            key={`a-${i}`}
                            className="relative overflow-hidden rounded shrink-0 w-[280px] h-[200px] md:w-[340px] md:h-[240px] lg:w-[416px] lg:h-[300px]"
                        >
                            <Image
                                src={src}
                                alt={`Slide ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 416px"
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicated track for seamless loop */}
                <div className="flex items-stretch gap-1.5 pr-1.5 shrink-0" aria-hidden="true">
                    {photos.map((src, i) => (
                        <div
                            key={`b-${i}`}
                            className="relative overflow-hidden rounded shrink-0 w-[280px] h-[200px] md:w-[340px] md:h-[240px] lg:w-[416px] lg:h-[300px]"
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 416px"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
