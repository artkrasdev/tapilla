import { useTranslations } from "next-intl";

export default function TextSection() {
    const t = useTranslations("AgencyPage.Mission");

    return (
        <section className="relative w-full bg-black overflow-hidden">
            {/* Content  */}
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-12 md:py-16 md:px-8 lg:px-12 border-t border-white/10">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-20">
                    {/* Left column */}
                    <div className="flex flex-col gap-3 md:w-5/12">
                        {/* Subtitle */}
                        <p className="text-[1.1rem] md:text-[1.3rem] font-normal tracking-tight text-white/50 font-secondary">
                            {t("subtitle")}
                        </p>

                        {/* Heading */}
                        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.05] tracking-tighter uppercase text-white">
                            {t("heading")}
                        </h2>
                    </div>

                    {/* Right column — description */}
                    <div className="flex flex-col justify-center self-stretch md:w-7/12 max-w-[750px] items-start">
                        <p className="text-base font-light leading-5 tracking-tight text-white/80 text-left">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
