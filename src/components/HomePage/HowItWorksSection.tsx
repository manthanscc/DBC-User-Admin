import React, { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedBeam } from "@/registry/magicui/animated-beam";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

// Separated HowItWorksSection component extracted from HomePage.tsx
// Provides a scroll-animated step illustration of the product flow.
// If additional steps are needed later, extend the steps array below.

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (sectionRef.current) {
      const classList = sectionRef.current.className || "";
      if (!classList.includes("relative")) {
        console.warn(
          "[HowItWorksSection] The section container is missing the 'relative' class. This may cause Framer Motion scroll offset warnings."
        );
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // progress bar + subtle parallax on accents
  const progressX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Reserved transforms for future parallax accents (currently unused)
  useTransform(scrollYProgress, [0, 1], [0, -30]); // blobUp placeholder
  useTransform(scrollYProgress, [0, 1], [0, 30]); // blobDown placeholder

  const steps = [
    {
      title: "Create",
      desc: "Sign up and design your card with links, contact info, and brand.",
      emoji: "✍️",
      iconBg: "bg-gradient-to-br from-emerald-400 to-blue-400",
      bgGradient: "from-emerald-50 to-blue-50",
      gradient: "from-emerald-400 to-blue-400",
    },
    {
      title: "Share",
      desc: "Copy link or show QR. Add to your email signature and socials.",
      emoji: "🔗",
      iconBg: "bg-gradient-to-br from-blue-400 to-purple-400",
      bgGradient: "from-blue-50 to-purple-50",
      gradient: "from-blue-400 to-purple-400",
    },
    {
      title: "Connect",
      desc: "Grow your network and track what’s working with analytics.",
      emoji: "🤝",
      iconBg: "bg-gradient-to-br from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative py-10 md:py-10 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 overflow-hidden"
    >
      {/* Interactive Grid Pattern Background - Blue/Purple */}
      <InteractiveGridPattern
        width={70}
        height={70}
        squares={[20, 16]}
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "sm:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "md:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "lg:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-20%] h-[140%] skew-y-6",
          "opacity-30 sm:opacity-35 md:opacity-40",
          "border-blue-400/20"
        )}
        squaresClassName="stroke-blue-400/30 hover:fill-blue-300/40 hover:stroke-blue-500/50 transition-colors duration-300"
      />
      

      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            How it works?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Three simple steps to transform your networking and amplify your
            digital presence
          </motion.p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-16 items-center">
          {/* Mobile vertical line */}
          <motion.div
            aria-hidden
            className="md:hidden absolute left-1/2 -translate-x-1/2 top-16 bottom-16 w-[2px] rounded bg-gradient-to-b from-emerald-400/60 via-blue-400/60 to-purple-400/60"
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: "easeOut",
            }}
          />
          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step1Ref}
            toRef={step2Ref}
            duration={4}
            delay={1.2}
            gradientStartColor="#10b981"
            gradientStopColor="#3b82f6"
            curvature={-75}
            pathWidth={4}
            pathOpacity={0.3}
            className="hidden md:block"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={step2Ref}
            toRef={step3Ref}
            duration={4}
            delay={1.8}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            curvature={-75}
            pathWidth={4}
            pathOpacity={0.3}
            className="hidden md:block"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.8,
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative group"
            >
              {/* Circle with emoji */}
              <Circle
                ref={i === 0 ? step1Ref : i === 1 ? step2Ref : step3Ref}
                className={`mx-auto mb-6 ${
                  step.iconBg
                } border-white shadow-lg ring-4 ring-white/60 group-hover:scale-110 transition-all duration-300 ${
                  i === 0
                    ? "shadow-[0_0_30px_rgba(52,211,153,0.4)] group-hover:shadow-[0_0_40px_rgba(52,211,153,0.6)]"
                    : i === 1
                    ? "shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                    : "shadow-[0_0_30px_rgba(147,51,234,0.4)] group-hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]"
                }`}
              >
                <span className="text-2xl text-white" aria-hidden>
                  {step.emoji}
                </span>
              </Circle>

              {/* Step card */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 40px 0 rgba(0,0,0,0.1)",
                }}
                className={`relative rounded-2xl bg-gradient-to-br ${step.bgGradient} border-2 shadow-xl p-6 text-center backdrop-blur-sm`}
                style={{
                  borderImage: `linear-gradient(135deg, ${step.gradient
                    .split(" ")
                    .map((g) =>
                      g
                        .replace("from-", "")
                        .replace("to-", "")
                        .replace("-", "#")
                    )
                    .join(", ")}) 1`,
                  borderImageSlice: 1,
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>

                {/* Step number badge */}
                <div
                  className={`absolute -top-5 -right-4 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} text-white text-sm font-bold flex items-center justify-center shadow-lg`}
                >
                  {i + 1}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced feature highlights section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
          >
            Why Choose Our Platform?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Experience the perfect blend of speed, customization, and
            intelligence
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Lightning Fast Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.1,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(255, 193, 7, 0.3)",
                y: -5,
              }}
              className="relative group flex items-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/50 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              {/* Icon left */}
              <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-shadow duration-300 mr-4">
                ⚡
              </div>
              {/* Content right */}
              <div className="flex-1">
                <h4 className="text-base font-bold text-yellow-500 mb-1 text-left border-b border-b-yellow-500 pl-1 rounded">
                  Lightning Fast
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-left">
                  Setup takes less than 5 minutes with our intuitive interface
                </p>
              </div>
            </motion.div>

            {/* Fully Customizable Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.3,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(236, 72, 153, 0.3)",
                y: -5,
              }}
              className="relative group flex items-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200/50 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              {/* Icon left */}
              <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white text-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-shadow duration-300 mr-4">
                🎨
              </div>
              {/* Content right */}
              <div className="flex-1">
                <h4 className="text-base font-bold text-pink-500 mb-1 text-left border-b border-b-pink-500 pl-1 rounded">
                  Fully Customizable
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-left">
                  Match your brand with unlimited themes, colors, and layouts
                </p>
              </div>
            </motion.div>

            {/* Smart Analytics Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(34, 197, 94, 0.3)",
                y: -5,
              }}
              className="relative group flex items-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200/50 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              {/* Icon left */}
              <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow duration-300 mr-1">
                📊
              </div>
            
              {/* Content right */}
              <div className="flex-1 ">
                <h4 className="text-base font-bold text-green-500 mb-1 text-left border-b border-b-green-500 pl-1 rounded">
                  Smart Analytics
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-left">
                  Track engagement, measure performance, and optimize your
                  digital reach
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
