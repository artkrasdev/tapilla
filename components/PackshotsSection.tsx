"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const exampleImages = [
    { src: "/examples-ai/example-ai-1.webp", captionKey: "card1" },
    { src: "/examples-ai/example-ai-2.webp", captionKey: "card2" },
    { src: "/examples-ai/example-ai-3.webp", captionKey: "card3" },
];

export default function PackshotsSection() {
    const t = useTranslations("PackshotsSection");

    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                {/* Header - Two column layout */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20 mb-10">
                    {/* Left column - Subtitle and Heading */}
                    <div className="flex flex-col gap-4 shrink-0">
                        <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                            {t("subtitle")}
                        </p>
                        <h2 className="text-[clamp(1.8rem,4vw,2.25rem)] leading-[1.1] tracking-tighter uppercase text-white">
                            {t("heading").split("\n").map((line, i, arr) => (
                                <span key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                    </div>

                    {/* Right column - Description */}
                    <div className="flex flex-col justify-center self-stretch max-w-[540px]">
                        <p className="text-base font-light leading-5 tracking-tight text-white md:text-right">
                            {t("description")}
                        </p>
                    </div>
                </div>

                {/* Image Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {exampleImages.map(({ src, captionKey }) => (
                        <div key={captionKey} className="flex flex-col gap-3">
                            {/* Image */}
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#1a1a1a]">
                                <Image
                                    src={src}
                                    alt={t(`${captionKey}.title`)}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                />
                            </div>

                            {/* Caption */}
                            <div className="flex flex-col gap-1 px-0.5">
                                <p className="text-sm font-normal text-white/80 tracking-tight">
                                    {t(`${captionKey}.title`)}
                                </p>
                                <p className="text-xs font-light text-white/50 leading-4 tracking-tight">
                                    {t(`${captionKey}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
