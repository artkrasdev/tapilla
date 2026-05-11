"use client";

import { useTranslations } from "next-intl";

interface TitleColumnsSectionProps {
    namespace: string;
}

export default function TitleColumnsSection({ namespace }: TitleColumnsSectionProps) {
    const t = useTranslations(namespace);

    return (
        <section className="w-full bg-black">
            <div className="mx-auto w-full max-w-content px-[5%] py-16 md:py-20 lg:py-24 md:px-8 lg:px-12">
                <h2 className="text-[clamp(1.75rem,4vw,2.3rem)] font-medium leading-[0.95] tracking-tighter uppercase text-white mb-8 md:mb-10">
                    {t("heading")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    <p className="text-[0.875rem] font-light leading-[1.6] tracking-tight text-white/60">
                        {t.rich("col1", {
                            b: (chunks) => (
                                <strong className="font-semibold text-white">{chunks}</strong>
                            ),
                        })}
                    </p>
                    <p className="text-[0.875rem] font-light leading-[1.6] tracking-tight text-white/60">
                        {t.rich("col2", {
                            b: (chunks) => (
                                <strong className="font-semibold text-white">{chunks}</strong>
                            ),
                        })}
                    </p>
                    <p className="text-[0.875rem] font-light leading-[1.6] tracking-tight text-white/60">
                        {t.rich("col3", {
                            b: (chunks) => (
                                <strong className="font-semibold text-white">{chunks}</strong>
                            ),
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
}
