"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface ContactCardsProps {
  className?: string;
}

export default function ContactCards({ className }: ContactCardsProps) {
  const locale = useLocale();

  return (
    <div className={cn("grid grid-rows-2 gap-3 h-full", className)}>
      {/* Top row - Email and Telegram side by side */}
      <div className="grid grid-cols-2 gap-3 h-full">
        {/* Email Card */}
        <div className="flex flex-col gap-3 border border-white/10 rounded bg-white/3 backdrop-blur-sm p-4 h-full">
          <div className="flex items-center">
            <Image
              src="/our-history.svg"
              alt="Email"
              width={40}
              height={22}
              className="object-contain opacity-70"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[1.1rem] font-medium tracking-tight text-white leading-tight">
              {locale === "ru" ? "По email" : "By email"}
            </h3>
            <span className="text-[0.8rem] font-normal tracking-tight text-white/50">
              {locale === "ru" ? "Короткое сообщение" : "A short message"}
            </span>
          </div>
          <a
            href="mailto:hello@tapilla.com"
            className="text-[0.95rem] font-light tracking-tight text-white/90 hover:text-white transition-colors"
          >
            hello@tapilla.com
          </a>
        </div>

        {/* Telegram Card */}
        <div className="flex flex-col gap-3 border border-white/10 rounded bg-white/3 backdrop-blur-sm p-4 h-full">
          <div className="flex items-center">
            <Image
              src="/brand-expieince.svg"
              alt="Telegram"
              width={40}
              height={22}
              className="object-contain opacity-70"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[1.1rem] font-medium tracking-tight text-white leading-tight">
              {locale === "ru" ? "В Telegram" : "On Telegram"}
            </h3>
            <span className="text-[0.8rem] font-normal tracking-tight text-white/50">
              {locale === "ru" ? "Сообщение" : "A message"}
            </span>
          </div>
          <a
            href="https://t.me/tapilla_chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.95rem] font-light tracking-tight text-white/90 hover:text-white transition-colors"
          >
            @tapilla_chat
          </a>
        </div>
      </div>

      {/* Bottom row - Recruiting card full width */}
      <div className="flex flex-col gap-3 border border-white/10 rounded bg-white/3 backdrop-blur-sm p-4 h-full">
        <div className="flex items-center">
          <Image
            src="/identity.svg"
            alt="Recruiting"
            width={40}
            height={22}
            className="object-contain opacity-70"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[1.1rem] font-medium tracking-tight text-white leading-tight">
            {locale === "ru" ? "Для ваших заявок" : "For your applications"}
          </h3>
          <span className="text-[0.8rem] font-normal tracking-tight text-white/50">
            {locale === "ru" ? "Это в другом месте" : "It's elsewhere"}
          </span>
        </div>
        <p className="text-[0.9rem] font-light leading-[1.5] tracking-tight text-white/80">
          {locale === "ru"
            ? "Эта форма предназначена только для запросов о наших услугах или будущем проекте. Спасибо, что посетили нашу страницу Карьера."
            : "This form is reserved for requests concerning our services or a future project. Thank you for stopping by our Recruiting page."}
        </p>
      </div>
    </div>
  );
}
