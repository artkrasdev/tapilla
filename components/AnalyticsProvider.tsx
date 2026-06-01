"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const STORAGE_KEY = "tapilla-cookie-consent";
const YANDEX_COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_COUNTER_ID ?? "PLACEHOLDER";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "PLACEHOLDER";

interface AnalyticsProviderProps {
    locale: string;
}

function getStoredConsent(): { analytics: boolean } | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export default function AnalyticsProvider({ locale }: AnalyticsProviderProps) {
    const [analyticsGranted, setAnalyticsGranted] = useState(false);
    const isRu = locale === "ru";

    const checkConsent = useCallback(() => {
        const consent = getStoredConsent();
        setAnalyticsGranted(consent?.analytics ?? false);
    }, []);

    useEffect(() => {
        checkConsent();

        const handler = () => checkConsent();
        window.addEventListener("cookieConsentUpdate", handler);
        return () => window.removeEventListener("cookieConsentUpdate", handler);
    }, [checkConsent]);

    if (!analyticsGranted) {
        return null;
    }

    /* ── English: GA4 + Vercel Speed Insights ── */
    if (!isRu) {
        return (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script
                    id="ga4-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA4_MEASUREMENT_ID}', {
                                page_path: window.location.pathname,
                                send_page_view: true
                            });
                            gtag('consent', 'update', {
                                analytics_storage: 'granted'
                            });
                        `,
                    }}
                />
                <SpeedInsights />
            </>
        );
    }

    /* ── Russian: Yandex Metrica only ── */
    return (
        <>
            <Script
                src="https://mc.yandex.ru/metrika/tag.js"
                strategy="afterInteractive"
            />
            <Script
                id="yandex-metrika-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                        ym('${YANDEX_COUNTER_ID}', "init", {
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                        });
                    `,
                }}
            />
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${YANDEX_COUNTER_ID}`}
                        style={{ position: "absolute", left: "-9999px" }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
}
