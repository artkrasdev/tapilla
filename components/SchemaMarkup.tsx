import { routing } from "@/i18n/routing";

interface SchemaMarkupProps {
  type: "LocalBusiness" | "WebSite" | "Service" | "FAQPage";
  locale: string;
  url: string;
  data?: Record<string, unknown>;
}

export default function SchemaMarkup({ type, locale, url, data = {} }: SchemaMarkupProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  let schema: Record<string, unknown> = { ...baseSchema };

  switch (type) {
    case "LocalBusiness":
      schema = {
        ...schema,
        "@type": "ProfessionalService",
        name: "Tapilla",
        description:
          locale === "ru"
            ? "Сертифицированное агентство Shopify Plus, специализирующееся на веб-дизайне электронной коммерции, UX/UI и цифровой трансформации."
            : "Certified Shopify Plus agency specializing in e-commerce web design, UX/UI, and digital transformation.",
        url: "https://tapilla.com",
        logo: "https://tapilla.com/tapilla-white.png",
        sameAs: [
          "https://www.linkedin.com/company/tapilla",
          "https://www.instagram.com/tapilla",
        ],
        areaServed: {
          "@type": "Place",
          name: locale === "ru" ? "Россия и международный рынок" : "Global",
        },
        serviceType: [
          "E-commerce Development",
          "Shopify Plus Development",
          "UX/UI Design",
          "Web Design",
          "Digital Transformation",
          "Generative AI",
        ],
        ...data,
      };
      break;

    case "WebSite":
      schema = {
        ...schema,
        name: "Tapilla Agency",
        url: "https://tapilla.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://tapilla.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        inLanguage: locale === "ru" ? "ru-RU" : "en-US",
        ...data,
      };
      break;

    case "Service":
      schema = {
        ...schema,
        serviceType: data.serviceType || "Web Development",
        provider: {
          "@type": "Organization",
          name: "Tapilla",
          url: "https://tapilla.com",
        },
        areaServed: {
          "@type": "Place",
          name: "Global",
        },
        ...data,
      };
      break;

    case "FAQPage":
      schema = {
        ...schema,
        mainEntity: data.questions || [],
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper to build FAQ schema from translation data
export function buildFaqSchema(
  t: (key: string) => string,
  count: number,
  namespace: string
): Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }> {
  return Array.from({ length: count }).map((_, i) => ({
    "@type": "Question",
    name: t(`${namespace}.faq${i + 1}.q`),
    acceptedAnswer: {
      "@type": "Answer",
      text: t(`${namespace}.faq${i + 1}.a`),
    },
  }));
}
