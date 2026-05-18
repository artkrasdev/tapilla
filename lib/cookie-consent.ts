"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tapilla-cookie-consent";

export interface ConsentState {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export function useCookieConsent() {
    const [consent, setConsent] = useState<ConsentState | null>(null);
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            setConsent(parsed);
            setHasConsented(true);
        }
    }, []);

    const updateConsent = useCallback((newConsent: ConsentState) => {
        setConsent(newConsent);
        setHasConsented(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));

        // Dispatch event for GTM/analytics
        window.dispatchEvent(
            new CustomEvent("cookieConsentUpdate", {
                detail: newConsent,
            })
        );

        // Update dataLayer for Google Tag Manager
        if (typeof window !== "undefined" && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: "cookie_consent_update",
                consent: newConsent,
            });
        }
    }, []);

    const resetConsent = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setConsent(null);
        setHasConsented(false);
    }, []);

    return {
        consent,
        hasConsented,
        updateConsent,
        resetConsent,
        // Helper booleans
        analyticsAllowed: consent?.analytics ?? false,
        marketingAllowed: consent?.marketing ?? false,
        necessaryAllowed: consent?.necessary ?? true,
    };
}

// For non-React usage (e.g., in script tags)
export function getConsentState(): ConsentState | null {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return null;
}

export function hasConsent(): boolean {
    return typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) !== null;
}

// Trigger the cookie banner to show from anywhere (e.g., footer link)
export function showCookieBanner(): void {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCookieBanner"));
    }
}
