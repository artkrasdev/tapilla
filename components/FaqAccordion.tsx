"use client";

import { useState, useRef, useCallback } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */
export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

/* ── Single row ────────────────────────────────────────────────────── */
function FaqRow({
    item,
    index,
    isOpen,
    toggle,
}: {
    item: FaqItem;
    index: number;
    isOpen: boolean;
    toggle: () => void;
}) {
    const bodyRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-t border-white/10">
            <button
                type="button"
                onClick={toggle}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={`faq-body-${index}`}
            >
                <span className="text-[0.95rem] font-light tracking-tight text-white transition-opacity duration-300 group-hover:opacity-60">
                    {item.question}
                </span>

                {/* Chevron */}
                <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M2 5L7 10L12 5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white transition-opacity duration-300 group-hover:opacity-60"
                        />
                    </svg>
                </span>
            </button>

            {/* Collapsible body */}
            <div
                id={`faq-body-${index}`}
                role="region"
                style={{
                    height: isOpen ? bodyRef.current?.scrollHeight ?? "auto" : 0,
                }}
                className="overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
                <div ref={bodyRef} className="pb-6">
                    <p className="text-[0.85rem] font-light leading-relaxed tracking-tight text-white">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Accordion ─────────────────────────────────────────────────────── */
export default function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = useCallback(
        (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
        [],
    );

    return (
        <div className="flex flex-col">
            {items.map((item, i) => (
                <FaqRow
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    toggle={() => toggle(i)}
                />
            ))}
        </div>
    );
}
