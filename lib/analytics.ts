"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";

/* ═══════════════════════════════════════════════════════════════════════
   Analytics configuration
   Set in .env.local:
   NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_YANDEX_COUNTER_ID=12345678
   ═══════════════════════════════════════════════════════════════════════ */
const YANDEX_COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_COUNTER_ID ?? "PLACEHOLDER";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "PLACEHOLDER";

export function useAnalytics() {
    const locale = useLocale();
    const isRu = locale === "ru";

    const track = useCallback(
        (event: string, params?: Record<string, unknown>) => {
            if (isRu) {
                if (typeof window !== "undefined" && (window as any).ym && YANDEX_COUNTER_ID !== "PLACEHOLDER") {
                    (window as any).ym(YANDEX_COUNTER_ID, "reachGoal", event, params);
                }
            } else {
                if (typeof window !== "undefined" && (window as any).gtag && GA4_MEASUREMENT_ID !== "PLACEHOLDER") {
                    (window as any).gtag("event", event, params);
                }
            }
        },
        [isRu]
    );

    const trackPageView = useCallback(
        (path: string) => {
            if (isRu) {
                if (typeof window !== "undefined" && (window as any).ym && YANDEX_COUNTER_ID !== "PLACEHOLDER") {
                    (window as any).ym(YANDEX_COUNTER_ID, "hit", path);
                }
            } else {
                if (typeof window !== "undefined" && (window as any).gtag && GA4_MEASUREMENT_ID !== "PLACEHOLDER") {
                    (window as any).gtag("config", GA4_MEASUREMENT_ID, { page_path: path });
                }
            }
        },
        [isRu]
    );

    return { track, trackPageView, isRu };
}
