import { motion } from "framer-motion";
import { OrbitCircle } from "./OrbitCircle";
import {
  FaBolt,
  FaGlobe,
  FaShareAlt,
  FaRobot,
  FaChartLine,
  FaLink,
} from "react-icons/fa";

// Feature definition
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  badge?: string;
  bg?: string; // gradient background tint for card
  iconBg?: string; // gradient for icon container
  accentBar?: string; // vertical accent bar gradient
}

const features: Feature[] = [
  {
    icon: <FaRobot className="text-purple-500 text-xl" />,
    title: "Auto Social Sync",
    description:
      "Generate social links instantly from a single username across platforms.",
    badge: "AI",
    bg: "bg-gradient-to-br from-purple-50 via-pink-50 to-white",
    iconBg: "from-purple-100 to-pink-50",
    accentBar: "from-purple-400/70 to-pink-400/70",
  },
  {
    icon: <FaShareAlt className="text-pink-500 text-xl" />,
    title: "One-Tap Sharing",
    description:
      "Share or scan your digital identity anywhere with smart QR & short links.",
    bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-white",
    iconBg: "from-rose-100 to-pink-50",
    accentBar: "from-rose-400/70 to-pink-400/70",
  },
  {
    icon: <FaGlobe className="text-blue-500 text-xl" />,
    title: "Public Profile Card",
    description:
      "Polished public URL showcasing your brand, socials, media and reviews.",
    bg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-white",
    iconBg: "from-blue-100 to-indigo-50",
    accentBar: "from-indigo-400/70 to-blue-400/70",
  },
  {
    icon: <FaBolt className="text-yellow-500 text-xl" />,
    title: "Realtime Admin Updates",
    description:
      "Edit info, products, media & reviews – instantly reflected on your live card.",
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-white",
    iconBg: "from-amber-100 to-yellow-50",
    accentBar: "from-amber-400/70 to-yellow-400/70",
  },
  {
    icon: <FaChartLine className="text-emerald-500 text-xl" />,
    title: "Engagement Insights",
    description: "Track clicks & interactions (planned analytics module).",
    bg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-white",
    iconBg: "from-emerald-100 to-teal-50",
    accentBar: "from-emerald-400/70 to-teal-400/70",
  },
  {
    icon: <FaLink className="text-indigo-500 text-xl" />,
    title: "Deep Linking",
    description: "Direct jump to WhatsApp, call, map, website & media actions.",
    bg: "bg-gradient-to-br from-violet-50 via-indigo-50 to-white",
    iconBg: "from-violet-100 to-indigo-50",
    accentBar: "from-violet-400/70 to-indigo-400/70",
  },
];

import type { Variants, Transition } from "framer-motion";

const stagger: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier for smooth easeOut
    } as Transition,
  }),
};

export function SocialAutomationSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-transparent">
      {/* Soft subtle dot pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.3] sm:opacity-[0.5] [background:radial-gradient(circle_at_1px_1px,#e5e7eb_0.8px,transparent_0)] [background-size:24px_24px] sm:[background-size:34px_34px]" />
      {/* Decorative soft glows - reduced on mobile */}
      <div className="pointer-events-none absolute -top-20 -left-20 sm:-top-32 sm:-left-32 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-fuchsia-300/15 sm:from-fuchsia-300/20 via-purple-300/8 sm:via-purple-300/10 to-transparent blur-2xl sm:blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-gradient-to-tr from-cyan-300/15 sm:from-cyan-300/20 via-sky-300/8 sm:via-sky-300/10 to-transparent blur-2xl sm:blur-3xl" />

      <div className="mx-auto max-w-7xl">
        
        {/* Header Section - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-8 lg:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-4">
            Social Automation Engine
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className=" text-gray-600 leading-relaxed max-w-2xl mx-auto px-4 sm:px-4 lg:px-0"
          >
            Connect, control and amplify your digital presence. Our admin panel
            powers instant updates, while your public card stays fast,
            responsive and share-ready. Automate the boring – focus on
            relationships.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* left: Orbit animation - responsive sizing */}
         
            
            {/* Orbit container with proper centering */}
            <div className="">
              <OrbitCircle />
            </div>
            
          {/* right: Text & Features */}
          <div className="relative z-10 order-1 lg:order-2 mb-4 lg:mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto lg:max-w-none">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={stagger}
                  className={`group relative rounded-xl border border-slate-200 ${f.bg ?? "bg-white"} backdrop-blur p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mx-4 sm:mx-6 lg:mx-0`}
                >
                  {/* Accent bar */}
                  {f.accentBar && (
                    <span className={`pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${f.accentBar}`} />
                  )}
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-gradient-to-tr ${f.iconBg ?? "from-slate-50 to-white"} shadow-inner ring-1 ring-slate-200 group-hover:scale-105 transition-transform flex-shrink-0`}>                  
                    <div className="text-lg sm:text-xl">{f.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-base leading-tight">
                        {f.title}
                      </h3>
                      {f.badge && (
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wide font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow flex-shrink-0">
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-0"
            >
              <span className="text-sm sm:text-base px-3 sm:px-4 py-2 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap font-medium">
                Responsive
              </span>
              <span className="text-sm sm:text-base px-3 sm:px-4 py-2 rounded-full bg-purple-100 text-purple-700 whitespace-nowrap font-medium">
                Realtime
              </span>
              <span className="text-sm sm:text-base px-3 sm:px-4 py-2 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap font-medium">
                Share Ready
              </span>
              <span className="text-sm sm:text-base px-3 sm:px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap font-medium">
                Modern UI
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialAutomationSection;
