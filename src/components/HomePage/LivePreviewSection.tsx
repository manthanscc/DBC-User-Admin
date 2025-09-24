import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import confetti from "canvas-confetti";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { demoCards, ProfileCard } from "./cardData";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const LivePreviewSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(demoCards[0].id);
  const [direction, setDirection] = useState<number>(1); // 1: next, -1: prev
  const active: ProfileCard = useMemo(
    () => demoCards.find((c) => c.id === activeId) || demoCards[0],
    [activeId]
  );
  const cardUrl = useMemo(
    () => `${window.location.origin}${active.shareLink || "/c/demo"}`,
    [active]
  );

  const currentIndex = useMemo(
    () =>
      Math.max(
        0,
        demoCards.findIndex((c) => c.id === activeId)
      ),
    [activeId]
  );
  const goPrev = () => {
    setDirection(-1);
    const i = (currentIndex - 1 + demoCards.length) % demoCards.length;
    setActiveId(demoCards[i].id);
  };
  const goNext = () => {
    setDirection(1);
    const i = (currentIndex + 1) % demoCards.length;
    setActiveId(demoCards[i].id);
  };

  // Variants for directional slide/opacity/scale animations
  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  } as const;

  // Fireworks-style confetti using canvas-confetti
  const triggerFireworks = () => {
    if (typeof window === "undefined") return;
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
    } as const;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return window.clearInterval(interval);
      }
      const particleCount = Math.max(
        10,
        Math.floor(50 * (timeLeft / duration))
      );
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Map theme to explicit Tailwind border classes (keeps JIT happy)
  const themeBorders = useMemo(() => {
    switch (active.theme.name) {
      case "IndigoGlow":
        return { card: "border-blue-300" };
      case "EmeraldSun":
        return { card: "border-emerald-300" };
      case "RoseGold":
        return { card: "border-rose-300" };
      case "GujaratSpice":
        return { card: "border-amber-300" };
      case "OceanWave":
        return { card: "border-sky-300" };
      case "SunsetBlaze":
        return { card: "border-orange-300" };
      case "ForestLeaf":
        return { card: "border-green-300" };
      case "RoyalGlow":
        return { card: "border-violet-300" };
      case "GoldenSand":
        return { card: "border-amber-300" };
      case "MidnightAura":
        return { card: "border-blue-700" };

      default:
        return { card: "border-gray-200" };
    }
  }, [active.theme.name]);

  return (
    <section
      id="preview"
      className="py-10 md:py-12 bg-gradient-to-b from-blue-50/40 to-white relative overflow-hidden"
    >
      {/* Dot Pattern Background - Responsive */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "sm:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "lg:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-20 sm:opacity-25 md:opacity-30"
        )}
      />
      
      {/* Secondary dot pattern for depth */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(200px_circle_at_70%_30%,white,transparent)]",
          "sm:[mask-image:radial-gradient(250px_circle_at_70%_30%,white,transparent)]",
          "md:[mask-image:radial-gradient(300px_circle_at_70%_30%,white,transparent)]",
          "opacity-10 sm:opacity-15 md:opacity-20"
        )}
      />
      
      <div className="absolute inset-0 bg-radial-soft z-0" />
      
      {/* Decorative concentric ring background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[250px] bottom-[-200px] w-[500px] h-[450px] border-8 border-pink-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute right-[300px] bottom-[-200px] w-[400px] h-[400px] border-8 border-purple-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute right-[350px] bottom-[-200px] w-[300px] h-[350px] border-8 border-yellow-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute right-[400px] bottom-[-200px] w-[200px] h-[300px] border-8 border-orange-400/20 rounded-full animate-pulse-slow" />
      </div>
     
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Live card preview
        </h2> */}
        {/* Card navigation removed; using prev/next arrows on card */}

        <div className="grid md:grid-cols-2 gap-9 items-center">
          {/* Copy + QR description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-gray-700 w-full"
          >
            {/* Modern Heading & Subheading */}
            <div className="border-l-4 border-blue-600 pl-4 rounded-lg md:-mt-6">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Share Instantly, Impress Instantly
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                Your digital card is always up to date, easy to share, and ready
                to wow your network.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-3 ml-5 ">
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xl">
                  🔗
                </span>
                <span className="font-medium">One-tap sharing & QR code</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-xl">
                  📱
                </span>
                <span className="font-medium">Mobile & desktop ready</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-xl">
                  ✨
                </span>
                <span className="font-medium">Personalized & professional</span>
              </li>
            </ul>

            {/* Testimonial */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 shadow flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    Amit S., Marketing Lead
                  </div>
                  <div className="text-xs text-gray-500">SCC Infotech LLP</div>
                </div>
              </div>
              <blockquote className="italic text-gray-700 text-sm md:text-base">
                “I shared my digital card at a conference and made more
                connections in one day than ever before. It's so easy and looks
                amazing!”
              </blockquote>
            </div>
          </motion.div>

          {/* Animated Card with QR Code + Prev/Next */}
          <div className="relative flex items-center justify-center">
            {/* Prev */}
            <button
              onClick={goPrev}
              aria-label="Previous card"
              title="Previous"
              className="absolute left-0 -ml-3 md:ml-8 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200 text-gray-700 grid place-items-center"
            >
              <FaChevronLeft />
            </button>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`w-full max-w-xs mx-auto bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4 relative animate-fade-in border-2 ${themeBorders.card}`}
                style={{ minHeight: 420 }}
              >
              {/* Profile Section: avatar left, name/role right */}
              <div className="flex items-center gap-4 w-full -mb-2">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 ${themeBorders.card} shadow`}
                />
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div
                    className={`text-lg font-bold ${
                      active.theme.accent || "text-gray-900"
                    } truncate`}
                  >
                    {active.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-1 truncate">
                    {active.role}
                  </div>
                </div>
              </div>
              {active.bio && (
                <div className="text-xs text-gray-600 mt-0 text-center whitespace-pre-line leading-tight">
                  {active.bio}
                </div>
              )}
              <div className="w-full border-t border-gray-200 -my-1 rounded" />
              {/* Contact Info */}
              <div className="w-full text-sm text-gray-700 space-y-1">
                <div>
                  <span className="font-semibold">Email:</span> {active.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {active.phone}
                </div>
                <div>
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={active.websiteHref}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {active.websiteLabel}
                  </a>
                </div>
              </div>
              {/* Social Icons */}
              <div className="flex gap-3 mt-2">
                {active.socials.map((s) => {
                  const iconEl =
                    s.icon === "instagram" ? (
                      <FaInstagram size={20} />
                    ) : s.icon === "facebook" ? (
                      <FaFacebookF size={20} />
                    ) : s.icon === "linkedin" ? (
                      <FaLinkedinIn size={20} />
                    ) : s.icon === "whatsapp" ? (
                      <FaWhatsapp size={20} />
                    ) : s.icon === "twitter" ? (
                      <FaTwitter size={20} />
                    ) : (
                      <FaYoutube size={20} />
                    );
                  const bgClass =
                    s.icon === "instagram"
                      ? "bg-gradient-to-tr from-pink-500 to-yellow-400"
                      : s.icon === "facebook"
                      ? "bg-blue-600"
                      : s.icon === "linkedin"
                      ? "bg-blue-700"
                      : s.icon === "whatsapp"
                      ? "bg-green-500"
                      : s.icon === "twitter"
                      ? "bg-sky-500"
                      : "bg-red-600";
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      aria-label={s.label}
                      className={`w-8 h-8 rounded-full ${bgClass} grid place-items-center text-white text-lg hover:scale-110 transition-transform`}
                    >
                      {iconEl}
                    </a>
                  );
                })}
              </div>
              {/* QR Code Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                className="mt-4 bg-white p-3 rounded-xl border border-blue-100 shadow-inner flex flex-col items-center"
              >
                <div className="mb-2 text-xs text-gray-500">
                  Scan to view card
                </div>
                <QRCodeCanvas value={cardUrl} size={110} includeMargin />
              </motion.div>
              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full mt-4 bg-gradient-to-r ${active.theme.gradientFrom} ${active.theme.gradientTo} text-white py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-shadow text-base`}
                onClick={async () => {
                  triggerFireworks();
                  await navigator.clipboard.writeText(cardUrl);
                  toast.success("Link copied");
                }}
              >
                📇 Share My Card
              </motion.button>
              </motion.div>
            </AnimatePresence>
            {/* Next */}
            <button
              onClick={goNext}
              aria-label="Next card"
              title="Next"
              className="absolute right-0 -mr-3 md:mr-8 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200 text-gray-700 grid place-items-center"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePreviewSection;
