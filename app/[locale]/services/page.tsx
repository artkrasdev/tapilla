"use client";

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
    return (
        <main>
            <PageHeader namespace="ServicesPage" />
            <PhotoSlider photos={SLIDER_PHOTOS} speed={27.5} />
            <WhatWeDoSection />
        </main>
    );
}
