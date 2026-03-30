"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import PhotoSlider from "@/components/PhotoSlider";
import WhatWeDoSection from "@/components/WhatWeDoSection";

const SLIDER_PHOTOS = [
    "/slider/service/slide-1.webp",
    "/slider/service/slide-2.webp",
    "/slider/service/slide-3.webp",
    "/slider/service/slide-4.webp",
    "/slider/service/slide-5.webp",
    "/slider/service/slide-6.webp",
];

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");

    return (
        <main>
            <PageHeader
                subtitle={t("subtitle")}
                heading={t("heading")}
                description={t("description")}
            />
            <PhotoSlider photos={SLIDER_PHOTOS} speed={27.5} />
            <WhatWeDoSection />
        </main>
    );
}
