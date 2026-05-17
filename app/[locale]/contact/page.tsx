import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import ContactCards from "@/components/ContactCards";
import SchemaMarkup from "@/components/SchemaMarkup";
import { generatePageMetadata, seoConfigs } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(seoConfigs.contact, locale);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("ContactPage");

  return (
    <>
      <SchemaMarkup
        type="ContactPage"
        locale={locale}
        url={`/${locale}/contact`}
        data={{
          name: locale === "ru" ? "Связаться с нами" : "Contact Us",
          description:
            locale === "ru"
              ? "Свяжитесь с Tapilla для обсуждения вашего проекта"
              : "Get in touch with Tapilla to discuss your project",
        }}
      />
      <main className="bg-black">
        <section className="relative w-full overflow-hidden pt-16 md:pt-20">
          <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-8 md:py-12 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-stretch">
              {/* Left column - Header + Cards */}
              <div className="flex flex-col gap-8 h-full">
                <div className="flex flex-col gap-4">
                  <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                    {t("subtitle")}
                  </p>
                  <h1 className="text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tighter uppercase text-white whitespace-pre-line">
                    {t("heading")}
                  </h1>
                  <p className="text-base font-light leading-6 tracking-tight text-white/80 max-w-[500px]">
                    {t("description")}
                  </p>
                </div>
                <ContactCards className="flex-1" />
              </div>

              {/* Right column - Form */}
              <div className="lg:pt-4 flex flex-col h-full">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
