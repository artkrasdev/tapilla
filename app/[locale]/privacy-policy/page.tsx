import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "PrivacyPolicy" });

    const sections: { title: string; body: string }[] = [
        { title: t("s1Title"), body: t("s1Body") },
        { title: t("s2Title"), body: t("s2Body") },
        { title: t("s3Title"), body: t("s3Body") },
        { title: t("s4Title"), body: t("s4Body") },
        { title: t("s5Title"), body: t("s5Body") },
        { title: t("s6Title"), body: t("s6Body") },
        { title: t("s7Title"), body: t("s7Body") },
        { title: t("s8Title"), body: t("s8Body") },
        { title: t("s9Title"), body: t("s9Body") },
        { title: t("s10Title"), body: t("s10Body") },
        { title: t("s11Title"), body: t("s11Body") },
        { title: t("s12Title"), body: t("s12Body") },
        { title: t("s13Title"), body: t("s13Body") },
        { title: t("s14Title"), body: t("s14Body") },
        { title: t("s15Title"), body: t("s15Body") },
        { title: t("s16Title"), body: t("s16Body") },
    ];

    return (
        <main className="bg-black min-h-screen px-[5%] md:px-8 pt-36 pb-24">
            <div className="mx-auto w-full max-w-3xl">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-4">{t("label")}</p>
                <h1 className="font-secondary text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] tracking-tight text-white uppercase mb-4">
                    {t("heading")}
                </h1>
                <p className="text-sm text-white/40 mb-16">{t("lastUpdated")}</p>

                <div className="space-y-12">
                    {sections.map((s, i) => (
                        <section key={i}>
                            <h2 className="text-base font-semibold text-white/80 uppercase tracking-widest mb-3">
                                {String(i + 1).padStart(2, "0")} — {s.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-white/50 whitespace-pre-line">{s.body}</p>
                        </section>
                    ))}
                </div>

                <div className="mt-20 pt-8 border-t border-white/10">
                    <p className="text-xs text-white/30">
                        © {new Date().getFullYear()} Tapilla. {t("copyright")}
                    </p>
                </div>
            </div>
        </main>
    );
}
