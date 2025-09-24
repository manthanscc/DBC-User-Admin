import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <span aria-hidden className="text-white">📇</span>,
      title: "Smart Digital Card",
      description: "Interactive profile that’s always up to date—no reprints needed.",
      gradient: "bg-gradient-to-br from-blue-50 via-indigo-50 to-white",
      iconGradient: "from-blue-600 to-indigo-500",
      accent: "from-blue-500/70 to-indigo-500/70",
    },
    {
      icon: <span aria-hidden className="text-white">🌐</span>,
      title: "Social Integrations",
      description: "Instagram, Facebook, LinkedIn, YouTube—link all your channels.",
      gradient: "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white",
      iconGradient: "from-fuchsia-600 to-purple-600",
      accent: "from-fuchsia-500/70 to-purple-500/70",
    },
    {
      icon: <span aria-hidden className="text-white">⚡</span>,
      title: "One‑click Share & QR",
      description: "Share instantly with a link or QR code—perfect for events.",
      gradient: "bg-gradient-to-br from-amber-50 via-yellow-50 to-white",
      iconGradient: "from-amber-500 to-yellow-500",
      accent: "from-amber-400/70 to-yellow-400/70",
    },
    {
      icon: <span aria-hidden className="text-white">🤖</span>,
      title: "AI Suggestions",
      description: "Get recommendations for better bios, CTAs, and link order.",
      gradient: "bg-gradient-to-br from-emerald-50 via-teal-50 to-white",
      iconGradient: "from-emerald-500 to-teal-500",
      accent: "from-emerald-400/70 to-teal-400/70",
    },
    {
      icon: <span aria-hidden className="text-white">📈</span>,
      title: "Analytics",
      description: "See clicks, top links, and locations to understand your audience.",
      gradient: "bg-gradient-to-br from-rose-50 via-pink-50 to-white",
      iconGradient: "from-rose-500 to-pink-500",
      accent: "from-rose-400/70 to-pink-400/70",
    },
    {
      icon: <span aria-hidden className="text-white">🔒</span>,
      title: "Secure & Fast",
      description: "Backed by modern hosting, privacy friendly, and blazing quick.",
      gradient: "bg-gradient-to-br from-slate-50 via-gray-50 to-white",
      iconGradient: "from-slate-600 to-gray-600",
      accent: "from-slate-500/70 to-gray-500/70",
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      {/* decorative accents */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-10 md:opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-10 md:opacity-20" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          id="features-heading"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-center mb-2  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  text-transparent bg-clip-text"
        >
          Everything your card needs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12"
        >
          Create once, share anywhere. Update in seconds and track engagement
          with smart analytics.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              gradient={f.gradient}
              iconGradient={f.iconGradient}
              accent={f.accent}
              delay={0.05 * i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
