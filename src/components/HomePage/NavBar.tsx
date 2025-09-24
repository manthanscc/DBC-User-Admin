import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const NavBar: React.FC = () => {
  const links = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how" },
    { name: "Preview", href: "#preview" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  // Add scroll progress motion value
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur border-b border-white/40"
    >
      {/* scroll progress bar */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-1 bg-gray-200/40">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                style={{ scaleX }}
              />
            </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/DBCLOGO_2.png" className="w-8 h-8" alt="SCC" />
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DBC
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {links.map((l) => (
            <a key={l.name} href={l.href} className="hover:text-blue-600 transition-colors">
              {l.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 text-gray-500">
          <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer noopener" className="hover:text-blue-600">
            <FaFacebookF />
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer noopener" className="hover:text-blue-700">
            <FaLinkedinIn />
          </a>
          <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer noopener" className="hover:text-red-600">
            <FaYoutube />
          </a>
        </div>
        <a href="#cta" className="ml-4 inline-block md:hidden text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow">
          Get started
        </a>
      </div>
    </motion.header>
  );
};

export default NavBar;
