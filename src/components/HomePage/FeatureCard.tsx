import React from "react";
import { motion } from "framer-motion";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  gradient?: string; // tailwind gradient classes for card background
  iconGradient?: string; // gradient for icon container
  accent?: string; // small accent bar / ring color
};

const FeatureCard: React.FC<Props> = ({
  icon,
  title,
  description,
  delay = 0,
  gradient = "bg-gradient-to-br from-white via-white to-white",
  iconGradient = "from-blue-600 to-purple-600",
  accent = "from-blue-500/60 to-purple-500/60",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.4 }}
      className={`relative rounded-2xl  shadow-sm hover:shadow-lg transition-all duration-300 group`}
    >
      {/* inner panel */}
      <div className={`relative rounded-[calc(theme(borderRadius.xl)-2px)] h-full w-full ${gradient} backdrop-blur-sm p-5 md:p-6 flex flex-col border border-white/60`}>        
       
        {/* subtle gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-opacity" />
        {/* accent bar */}
        <span className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${accent} rounded-l-[inherit]`} />
        <div className="flex items-center mb-0">
          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr ${iconGradient} text-white grid place-items-center shadow-md shadow-black/10 mr-3`}>
            {icon}
          </div>
          <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-0">{title}</h3>
        </div>
        <div className="mt-2 mb-2 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
