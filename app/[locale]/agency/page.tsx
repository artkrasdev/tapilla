"use client";

import { useLocale } from "next-intl";
import PageHeader from "@/components/PageHeader";
import TextSection from "@/components/TextSection";
import ValueSlider from "@/components/ValueSlider";
import TimelineSection from "@/components/TimelineSection";

export default function AgencyPage() {
    const locale = useLocale();

    return (
        <main>
            <PageHeader
                namespace="AgencyPage"
                buttonLink={`/${locale}/services`}
            />

            {/* Agency video */}
            <section className="bg-black px-[5%] md:px-8 lg:px-12 pb-12 md:pb-16">
                <div className="mx-auto w-full max-w-content">
                    <video
                        src="/theagency.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full aspect-4/3 sm:aspect-2/1 md:aspect-21/9 lg:aspect-3/1 rounded-xl object-cover"
                    />
                </div>
            </section>

            <TextSection />
            <ValueSlider />
            <TimelineSection namespace="AgencyPage.Differences" />

        </main>
    );
}

