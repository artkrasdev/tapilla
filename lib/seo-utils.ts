import type { Metadata } from "next";

interface PageSeoConfig {
  title: { en: string; ru: string };
  description: { en: string; ru: string };
  keywords?: string[];
  path?: string;
}

export function generatePageMetadata(
  config: PageSeoConfig,
  locale: string
): Metadata {
  const baseUrl = "https://tapilla.com";
  const url = config.path ? `${baseUrl}/${locale}${config.path}` : `${baseUrl}/${locale}`;

  const validLocale = locale === "ru" ? "ru" : "en";

  return {
    title: config.title[validLocale],
    description: config.description[validLocale],
    ...(config.keywords && { keywords: config.keywords }),
    openGraph: {
      title: config.title[validLocale],
      description: config.description[validLocale],
      type: "website",
      url,
      locale: validLocale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

// Page-specific SEO configs
export const seoConfigs = {
  home: {
    title: {
      en: "Tapilla — E-Commerce Web Agency | Shopify Plus Partner",
      ru: "Tapilla — Веб-агентство электронной коммерции | Партнер Shopify Plus",
    },
    description: {
      en: "Tapilla is a Shopify Plus agency specializing in e-commerce web design, UX/UI, and digital transformation. 10+ years of expertise building high-converting online stores for ambitious brands.",
      ru: "Tapilla — агентство Shopify Plus, специализирующееся на веб-дизайне интернет магазинов, UX/UI и цифровой трансформации. Более 10 лет опыта создания высококонверсионных интернет-магазинов.",
    },
    keywords: [
      "e-commerce agency",
      "Shopify Plus",
      "web design",
      "UX/UI",
      "digital transformation",
    ],
  },
  agency: {
    title: {
      en: "The Agency | Tapilla — 10+ Years of Digital Excellence",
      ru: "Агентство | Tapilla — Более 10 лет цифрового совершенства",
    },
    description: {
      en: "Discover Tapilla: a passionate team dedicated to brands and digital transformation. 10+ years of expertise in e-commerce, UX/UI design, and Shopify development.",
      ru: "Откройте Tapilla: увлеченная команда, посвященная брендам и цифровой трансформации. Более 10 лет опыта в электронной коммерции, UX/UI дизайне и разработке Shopify.",
    },
    path: "/agency",
  },
  services: {
    title: {
      en: "Our Services | Tapilla — E-Commerce & Digital Solutions",
      ru: "Наши услуги | Tapilla — Электронная коммерция и цифровые решения",
    },
    description: {
      en: "Discover our comprehensive digital services: Shopify development, UX/UI design, generative AI, branding, and e-commerce solutions tailored to your brand's success.",
      ru: "Откройте наши комплексные цифровые услуги: разработка Shopify, UX/UI дизайн, генеративный ИИ, брендинг и решения для электронной коммерции.",
    },
    path: "/services",
  },
  shopify: {
    title: {
      en: "Shopify Plus Agency | Certified Shopify Experts | Tapilla",
      ru: "Агентство Shopify Plus | Сертифицированные эксперты Shopify | Tapilla",
    },
    description: {
      en: "Tapilla is a certified Shopify Plus Partner agency. We build high-converting Shopify stores, custom themes, headless commerce, and complex integrations for ambitious e-commerce brands.",
      ru: "Tapilla — сертифицированное агентство-партнер Shopify Plus. Мы создаем высококонверсионные магазины Shopify, кастомные темы, headless коммерцию и сложные интеграции.",
    },
    keywords: [
      "Shopify Plus",
      "Shopify agency",
      "Shopify development",
      "e-commerce development",
      "headless commerce",
    ],
    path: "/offer/shopify",
  },
  uxUi: {
    title: {
      en: "UX/UI Design Agency | E-Commerce Web Design | Tapilla",
      ru: "Агентство UX/UI дизайна | Веб-дизайн электронной коммерции | Tapilla",
    },
    description: {
      en: "Elevate your brand with Tapilla's UX/UI design expertise. We create conversion-focused interfaces for e-commerce and corporate sites that blend aesthetics with performance.",
      ru: "Улучшите свой бренд с помощью экспертизы UX/UI дизайна Tapilla. Мы создаем интерфейсы, ориентированные на конверсию, для электронной коммерции и корпоративных сайтов.",
    },
    keywords: [
      "UX/UI design",
      "web design",
      "e-commerce design",
      "conversion rate optimization",
      "mobile first design",
    ],
    path: "/offer/ux-ui-webdesign",
  },
  generativeAi: {
    title: {
      en: "Generative AI for Brands | Visual Content Production | Tapilla",
      ru: "Генеративный ИИ для брендов | Производство визуального контента | Tapilla",
    },
    description: {
      en: "AI-directed by humans. Tapilla combines artistic direction and multi-AI power to create homogeneous visuals for web, print, and social media.",
      ru: "ИИ под руководством людей. Tapilla сочетает художественное руководство и мощь нескольких ИИ для создания однородных визуальных материалов.",
    },
    keywords: [
      "generative AI",
      "AI content production",
      "AI image generation",
      "brand content AI",
    ],
    path: "/offer/generative-ai",
  },
  automation: {
    title: {
      en: "Workflow Automation | N8N & System Integration | Tapilla",
      ru: "Автоматизация рабочих процессов | N8N и системная интеграция | Tapilla",
    },
    description: {
      en: "Streamline your business operations with Tapilla's automation expertise. N8N workflows, system integrations, and process automation to boost efficiency.",
      ru: "Оптимизируйте бизнес-операции с помощью экспертизы автоматизации Tapilla. Рабочие процессы N8N, системная интеграция и автоматизация процессов.",
    },
    keywords: ["workflow automation", "n8n", "system integration", "business automation"],
    path: "/offer/automation",
  },
  branding: {
    title: {
      en: "Branding & Identity | Brand Strategy & Design | Tapilla",
      ru: "Брендинг и айдентика | Стратегия и дизайн бренда | Tapilla",
    },
    description: {
      en: "Build a distinctive brand identity with Tapilla. Strategic branding, visual identity systems, and brand storytelling that connects with your audience.",
      ru: "Создайте выдающуюся айдентику бренда с Tapilla. Стратегический брендинг, системы визуальной айдентики и истории бренда.",
    },
    keywords: ["branding", "brand identity", "brand strategy", "visual identity"],
    path: "/offer/branding",
  },
  wordpress: {
    title: {
      en: "WordPress Development | Custom WordPress Agency | Tapilla",
      ru: "Разработка WordPress | Агентство кастомного WordPress | Tapilla",
    },
    description: {
      en: "Custom WordPress development for corporate and editorial websites. Tapilla builds high-performance, SEO-optimized WordPress sites with custom themes.",
      ru: "Кастомная разработка WordPress для корпоративных и редакционных сайтов. Tapilla создает высокопроизводительные, SEO-оптимизированные сайты WordPress.",
    },
    keywords: ["WordPress development", "custom WordPress", "WordPress agency", "CMS development"],
    path: "/offer/wordpress",
  },
  contact: {
    title: {
      en: "Contact Us | Get in Touch | Tapilla Digital Agency",
      ru: "Связаться с нами | Свяжитесь с нами | Tapilla Digital Agency",
    },
    description: {
      en: "Get in touch with Tapilla to discuss your e-commerce project. Contact our team for Shopify development, UX/UI design, branding, and digital transformation services.",
      ru: "Свяжитесь с Tapilla, чтобы обсудить ваш проект электронной коммерции. Свяжитесь с нашей командой для разработки Shopify, UX/UI дизайна, брендинга и цифровой трансформации.",
    },
    keywords: [
      "contact",
      "get in touch",
      "digital agency contact",
      "e-commerce agency",
      "project inquiry",
    ],
    path: "/contact",
  },
} satisfies Record<string, PageSeoConfig>;
