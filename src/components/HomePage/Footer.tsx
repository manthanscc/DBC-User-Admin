import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  const links = [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-purple-50 to-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-3 gap-8 items-start">
        <div className="flex items-center gap-3">
          <img src="/scc.png" alt="SCC" className="w-10 h-10" />
          <div>
            <div className="text-gray-900 font-semibold">SCC INFOTECH LLP</div>
            <div className="text-gray-500 text-sm">AI ✨ Powered</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
          {links.map((l) => (
            <a key={l.name} href={l.href} className="hover:text-blue-600">
              {l.name}
            </a>
          ))}
        </nav>
        <div className="flex gap-3 text-gray-500 justify-start md:justify-end">
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
      </div>
      <div className="text-center text-xs md:text-sm text-gray-500 pb-8">
        © {new Date().getFullYear()} Digital Business Cards · AI ✨ Powered by SCC INFOTECH LLP
      </div>
    </footer>
  );
};

export default Footer;
