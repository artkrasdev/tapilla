"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAnalytics } from "@/lib/analytics";

interface ContactFormProps {
  className?: string;
}

// EmailJS configuration - Replace with your actual credentials from EmailJS dashboard
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_u0r63uj", // e.g., "service_abc123"
  TEMPLATE_ID: "template_wy5cve8", // e.g., "template_xyz789"
  PUBLIC_KEY: "Jnb-BGYejg0fUONS8", // e.g., "user_1234567890abcdef"
};

export default function ContactForm({ className }: ContactFormProps) {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const { track } = useAnalytics();
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentGiven) {
      alert(locale === "ru" 
        ? "Пожалуйста, дайте согласие на обработку персональных данных" 
        : "Please consent to the processing of personal data");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus("success");
      track("contact_form_submit", {
        locale,
        deadline: formRef.current?.deadline?.value || "",
      });
      formRef.current.reset();
      setConsentGiven(false);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      track("contact_form_error", { locale });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    "w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white text-sm",
    "placeholder:text-white/40",
    "focus:outline-none focus:border-white/50 focus:bg-white/10",
    "transition-colors duration-200"
  );

  const labelClasses = "block text-sm text-white/70 mb-2 tracking-wide";

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden locale field for EmailJS template */}
        <input type="hidden" name="locale" value={locale} />

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-lg">
            <CheckCircle size={20} className="text-emerald-400" />
            <p className="text-sm text-white">
              {locale === "ru"
                ? "Сообщение отправлено! Мы свяжемся с вами в течение 24 часов."
                : "Message sent! We'll get back to you within 24 hours."}
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-3 p-4 bg-white/10 border border-white/20 rounded-lg">
            <AlertCircle size={20} className="text-red-400" />
            <p className="text-sm text-white">
              {locale === "ru"
                ? "Ошибка отправки. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по email."
                : "Failed to send. Please try again or contact us via email."}
            </p>
          </div>
        )}

        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              {locale === "ru" ? "Имя *" : "First Name *"}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className={inputClasses}
              placeholder={locale === "ru" ? "Ваше имя" : "Your first name"}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              {locale === "ru" ? "Фамилия *" : "Last Name *"}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className={inputClasses}
              placeholder={locale === "ru" ? "Ваша фамилия" : "Your last name"}
            />
          </div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClasses}>
              {locale === "ru" ? "Email *" : "Email *"}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={inputClasses}
              placeholder={locale === "ru" ? "Ваш email" : "Your email"}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              {locale === "ru" ? "Телефон *" : "Phone *"}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className={inputClasses}
              placeholder={locale === "ru" ? "Ваш телефон" : "Your phone"}
            />
          </div>
        </div>

        {/* Deadline Select */}
        <div>
          <label htmlFor="deadline" className={labelClasses}>
            {t("deadlineLabel")}
          </label>
          <select
            id="deadline"
            name="deadline"
            className={cn(inputClasses, "cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M2.5%204.5L6%208L9.5%204.5%22%20stroke%3D%22white%22%20stroke-opacity%3D%220.5%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]")}
            defaultValue=""
          >
            <option value="" disabled className="bg-black text-white/50">
              {locale === "ru" ? "Выберите срок" : "Select deadline"}
            </option>
            <option value="under2months" className="bg-black text-white">
              {t("deadlineOption1")}
            </option>
            <option value="between2and4" className="bg-black text-white">
              {t("deadlineOption2")}
            </option>
            <option value="moreThan4" className="bg-black text-white">
              {t("deadlineOption3")}
            </option>
            <option value="decideTogether" className="bg-black text-white">
              {t("deadlineOption4")}
            </option>
          </select>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className={labelClasses}>
            {locale === "ru" ? "Описание проекта" : "Project Description"}
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={5}
            className={cn(inputClasses, "resize-none min-h-[120px]")}
            placeholder={
              locale === "ru"
                ? "Расскажите о вашем проекте, целях и ожиданиях..."
                : "Tell us about your project, goals, and expectations..."
            }
          />
        </div>

        {/* Consent Checkbox - Required by Russian Federal Law 152-FZ */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border border-white/30 bg-white/5 text-white accent-white cursor-pointer"
          />
          <label htmlFor="consent" className="text-sm text-white/60 leading-relaxed cursor-pointer">
            {locale === "ru" ? (
              <>
                Я даю согласие на обработку моих персональных данных (имя, email, телефон) в целях обработки заявки и связи со мной по проекту. Согласие даётся в соответствии с{" "}
                <Link href={`/${locale}/privacy-policy`} className="underline hover:text-white/80 transition-colors">
                  Политикой конфиденциальности
                </Link>
                . Согласие является отдельным документом и может быть отозвано в любое время.
              </>
            ) : (
              <>
                I consent to the processing of my personal data (name, email, phone) for the purpose of processing my inquiry and contacting me about the project. Consent is given in accordance with the{" "}
                <Link href={`/${locale}/privacy-policy`} className="underline hover:text-white/80 transition-colors">
                  Privacy Policy
                </Link>
                . Consent is a separate document and may be withdrawn at any time.
              </>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting || !consentGiven}
            className="w-full h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {locale === "ru" ? "Отправка..." : "Sending..."}
              </span>
            ) : (
              <span>{locale === "ru" ? "Отправить" : "Send Message"}</span>
            )}
          </Button>
        </div>

        {/* Required fields note */}
        <p className="text-xs text-white/40">{t("formNote")}</p>
      </form>
    </div>
  );
}
