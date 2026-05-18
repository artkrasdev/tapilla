"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X, Cookie, Settings, Check } from "lucide-react";

interface ConsentType {
    id: string;
    label: string;
    description: string;
    required: boolean;
    defaultValue: boolean;
}

interface ConsentState {
    [key: string]: boolean;
}

const STORAGE_KEY = "tapilla-cookie-consent";

const CONSENT_TYPES: ConsentType[] = [
    {
        id: "necessary",
        label: "Necessary",
        description: "Essential cookies required for the website to function properly. These cannot be disabled.",
        required: true,
        defaultValue: true,
    },
    {
        id: "analytics",
        label: "Analytics",
        description: "Cookies that help us understand how visitors interact with our website by collecting anonymous data.",
        required: false,
        defaultValue: false,
    },
    {
        id: "marketing",
        label: "Marketing",
        description: "Cookies used to deliver personalized advertisements and track their effectiveness.",
        required: false,
        defaultValue: false,
    },
];

export default function CookieBanner() {
    const t = useTranslations("CookieBanner");
    const locale = useLocale();
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [consent, setConsent] = useState<ConsentState>({});
    const [hasConsented, setHasConsented] = useState(false);

    // Initialize consent state from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            setConsent(parsed);
            setHasConsented(true);
        } else {
            // Default state: only necessary cookies enabled
            const defaultConsent: ConsentState = {};
            CONSENT_TYPES.forEach((type) => {
                defaultConsent[type.id] = type.required ? true : type.defaultValue;
            });
            setConsent(defaultConsent);
            setIsVisible(true);
        }
    }, []);

    // Save consent to localStorage and trigger callbacks
    const saveConsent = useCallback(
        (newConsent: ConsentState) => {
            setConsent(newConsent);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
            setHasConsented(true);
            setIsVisible(false);
            setShowPreferences(false);

            // Dispatch custom event for GTM/analytics integration
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
        },
        []
    );

    const handleAcceptAll = () => {
        const allAccepted: ConsentState = {};
        CONSENT_TYPES.forEach((type) => {
            allAccepted[type.id] = true;
        });
        saveConsent(allAccepted);
    };

    const handleRejectNonEssential = () => {
        const onlyNecessary: ConsentState = {};
        CONSENT_TYPES.forEach((type) => {
            onlyNecessary[type.id] = type.required;
        });
        saveConsent(onlyNecessary);
    };

    const handleSavePreferences = () => {
        saveConsent(consent);
    };

    const handleToggleConsent = (id: string) => {
        const type = CONSENT_TYPES.find((t) => t.id === id);
        if (type?.required) return; // Cannot toggle required cookies

        setConsent((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpenPreferences = () => {
        setShowPreferences(true);
    };

    const handleClosePreferences = () => {
        setShowPreferences(false);
    };

    // Listen for external trigger to show banner (from footer link)
    useEffect(() => {
        const handleShowBannerEvent = () => {
            setIsVisible(true);
        };
        window.addEventListener("showCookieBanner", handleShowBannerEvent);
        return () => {
            window.removeEventListener("showCookieBanner", handleShowBannerEvent);
        };
    }, []);

    // Don't render anything if not visible and no preferences modal
    if (!isVisible && !showPreferences) {
        return null;
    }

    return (
        <>
            {/* Main Banner */}
            {isVisible && !showPreferences && (
                <div
                    className={`fixed z-50 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md ${
                        locale === "ru" ? "bottom-4 right-4" : "bottom-4 right-4"
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookie-banner-title"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0">
                            <Cookie className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="flex-1">
                            <h2
                                id="cookie-banner-title"
                                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                            >
                                {t("title")}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {t("description")}
                            </p>
                            <div className="flex flex-nowrap gap-2">
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors whitespace-nowrap"
                                >
                                    {t("acceptAll")}
                                </button>
                                <button
                                    onClick={handleRejectNonEssential}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                                >
                                    {t("rejectNonEssential")}
                                </button>
                                <button
                                    onClick={handleOpenPreferences}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                                    aria-label={t("preferences")}
                                >
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preferences Modal Backdrop */}
            {showPreferences && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={handleClosePreferences}
                />
            )}

            {/* Preferences Modal */}
            {showPreferences && (
                <div
                    className="fixed z-50 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-lg w-[90vw] max-h-[80vh] overflow-y-auto"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookie-preferences-title"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <h2
                                id="cookie-preferences-title"
                                className="text-xl font-semibold text-gray-900 dark:text-white"
                            >
                                {t("preferencesTitle")}
                            </h2>
                        </div>
                        <button
                            onClick={handleClosePreferences}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            aria-label={t("close")}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        {t("preferencesDescription")}
                    </p>

                    <div className="space-y-4 mb-6">
                        {CONSENT_TYPES.map((type) => (
                            <div
                                key={type.id}
                                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                            >
                                <div className="pt-0.5">
                                    {type.required ? (
                                        <div className="w-5 h-5 rounded bg-gray-900 dark:bg-white flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white dark:text-gray-900" />
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleToggleConsent(type.id)}
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                consent[type.id]
                                                    ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                                                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                                            }`}
                                            aria-label={
                                                consent[type.id]
                                                    ? t("disable", { type: type.label })
                                                    : t("enable", { type: type.label })
                                            }
                                        >
                                            {consent[type.id] && (
                                                <Check className="w-3 h-3 text-white dark:text-gray-900" />
                                            )}
                                        </button>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                                            {t(type.id)}
                                        </span>
                                        {type.required && (
                                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                                                {t("required")}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {t(`${type.id}Description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSavePreferences}
                            className="flex-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                            {t("savePreferences")}
                        </button>
                        <button
                            onClick={handleClosePreferences}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
