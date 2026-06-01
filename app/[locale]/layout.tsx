import type { Metadata } from "next";
import { Inter, Geist, Cormorant } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["300", "400", "500"],
});

const cormorant = Cormorant({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        en: "Tapilla — E-Commerce Web Agency | Shopify Plus Partner",
        ru: "Tapilla — Веб-агентство электронной коммерции | Партнер Shopify Plus",
    };

    const descriptions: Record<string, string> = {
        en: "Tapilla is a certified Shopify Plus agency specializing in e-commerce web design, UX/UI, and digital transformation. 25+ years of expertise building high-converting online stores for ambitious brands.",
        ru: "Tapilla — сертифицированное агентство Shopify Plus, специализирующееся на веб-дизайне электронной коммерции, UX/UI и цифровой трансформации. Более 25 лет опыта создания высококонверсионных интернет-магазинов.",
    };

    return {
        metadataBase: new URL("https://tapilla.com"),
        icons: {
            icon: "/favicon.png",
            shortcut: "/favicon.png",
            apple: "/favicon.png",
        },
        title: {
            default: titles[locale] || titles.en,
            template: "%s | Tapilla",
        },
        description: descriptions[locale] || descriptions.en,
        keywords: [
            "e-commerce agency",
            "Shopify Plus",
            "web design",
            "UX/UI",
            "digital transformation",
            "e-commerce development",
            "Shopify expert",
        ],
        authors: [{ name: "Tapilla" }],
        creator: "Tapilla",
        publisher: "Tapilla",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "ru" ? "ru_RU" : "en_US",
            url: `https://tapilla.com/${locale}`,
            siteName: "Tapilla Agency",
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            images: [
                {
                    url: "/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Tapilla — E-Commerce Web Agency",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            images: ["/og-image.jpg"],
        },
        alternates: {
            canonical: `https://tapilla.com/${locale}`,
            languages: {
                en: "https://tapilla.com/en",
                ru: "https://tapilla.com/ru",
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as "en" | "ru")) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className={cn("font-sans", geist.variable)}>
            <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    {children}
                    <Footer />
                    <CookieBanner />
                    <AnalyticsProvider locale={locale} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
