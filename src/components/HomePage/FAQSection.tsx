import React, { useState } from "react";
import { motion } from "framer-motion";

// Standalone FAQSection component extracted from HomePage.tsx
// Accepts optional props for future extensibility.

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
  defaultOpenIndex?: number | null;
  title?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    q: "What is a digital business card?",
    a: "It's a shareable online profile with your contact info, links, and branding.",
  },
  {
    q: "Can I update my card later?",
    a: "Yes! Edit anytime—your shared link and QR stay the same.",
  },
  {
    q: "Do I need an app?",
    a: "No app needed. It works in any modern browser.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes, start free and upgrade anytime for analytics and AI features.",
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({
  items = defaultFaqs,
  defaultOpenIndex = 0,
  title = "Frequently asked questions",
}) => {
  const [open, setOpen] = useState<number | null>(defaultOpenIndex);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="border rounded-2xl overflow-hidden bg-white"
              >
                <button
                  className="w-full text-left px-4 md:px-6 py-3 md:py-4 font-medium text-gray-900 flex items-center justify-between"
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-expanded={isOpen ? "true" : "false"}
                  type="button"
                >
                  {f.q}
                  <span
                    className={`transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  className="px-4 md:px-6 overflow-hidden text-sm text-gray-600"
                >
                  <div className="pb-4">{f.a}</div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
