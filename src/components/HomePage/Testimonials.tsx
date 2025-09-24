import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Ananya Patel",
    role: "Founder, Craftico",
    quote:
      "Sharing my card is instant now. The QR code at events is a game changer! I can connect with dozens of people in seconds, and they always remember me.",
    photo: "https://randomuser.me/api/portraits/women/13.jpg",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Marketing Lead, NextGen",
    quote:
      "Analytics helped us see which links people click. We optimized our socials and saw more leads. The dashboard is so easy to use!",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Consultant",
    quote:
      "I love that it always stays updated. No more reprinting cards—eco-friendly and smart. My clients are always impressed!",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Siddharth Mehra",
    role: "Product Manager, FinEdge",
    quote:
      "The card design is stunning and professional. I can update my info anytime, and the support team is fantastic.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    role: "Freelance Designer",
    quote:
      "I get compliments on my digital card at every meeting. The star rating and reviews help build trust instantly.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Arjun Rao",
    role: "Entrepreneur",
    quote:
      "Switching to this card was the best decision. The layered card effect looks so cool and modern!",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
  },
  {
    name: "Kavya Nair",
    role: "Startup Founder",
    quote:
      "Networking feels effortless now. Just a tap and my details are shared instantly. People find it so professional!",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
  },
  {
    name: "Rohan Gupta",
    role: "Sales Director, BrightMart",
    quote:
      "Tracking engagement on my card gave me insights I never had with paper cards. It’s a real growth hack for business.",
    photo: "https://randomuser.me/api/portraits/men/69.jpg",
    rating: 5,
  },
  {
    name: "Sneha Iyer",
    role: "Content Creator",
    quote:
      "The design customization is amazing! I matched my personal brand colors, and everyone loves how unique it looks.",
    photo: "https://randomuser.me/api/portraits/women/15.jpg",
    rating: 5,
  },
  {
    name: "Amit Malhotra",
    role: "Financial Advisor",
    quote:
      "Clients appreciate how they can save my info directly to their phone. No lost cards, just seamless connections.",
    photo: "https://randomuser.me/api/portraits/men/53.jpg",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "HR Consultant",
    quote:
      "I can share my card even on virtual calls. It has made remote networking so much smoother and more personal.",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
  },
  {
    name: "Varun Singh",
    role: "Tech Enthusiast",
    quote:
      "I love the interactive feel! The animations and layers make it stand out. People always ask me where I got it from.",
    photo: "https://randomuser.me/api/portraits/men/24.jpg",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {

  const [index, setIndex] = useState(0);
  const visibleCards = 3; // Show 3 cards at a time

  // Animate to next card every 4s
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Get indices for visible cards (center, right, left)
  const getCardIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleCards; i++) {
      indices.push((index + i) % testimonials.length);
    }
    return indices;
  };

  // Card position styles and animation variants
  const positions = [
    {
      x: 0,
      scale: 1,
      zIndex: 30,
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      filter: "blur(0px)",
      opacity: 1,
    }, // center
    {
      x: -120,
      scale: 0.92,
      zIndex: 20,
      boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.17)",
      filter: "blur(1px)",
      opacity: 0.7,
    }, // left
    {
      x: 120,
      scale: 0.92,
      zIndex: 20,
      boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.17)",
      filter: "blur(1px)",
      opacity: 0.7,
    }, // right
  ];

  const cardIndices = getCardIndices();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-purple-300 to-blue-50/40 relative overflow-hidden">
      {/* Purple Dot Pattern Background */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "sm:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "opacity-30 sm:opacity-35 md:opacity-40",
          "fill-purple-600/60"
        )}
      />
      
      {/* Secondary purple dot pattern for depth */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(250px_circle_at_80%_20%,white,transparent)]",
          "sm:[mask-image:radial-gradient(300px_circle_at_80%_20%,white,transparent)]",
          "md:[mask-image:radial-gradient(350px_circle_at_80%_20%,white,transparent)]",
          "opacity-15 sm:opacity-20 md:opacity-25",
          "fill-purple-500/50"
        )}
      />
      
      {/* Third purple dot pattern for additional texture */}
      <DotPattern
        className={cn(
          "absolute inset-0 z-0",
          "[mask-image:radial-gradient(200px_circle_at_20%_80%,white,transparent)]",
          "sm:[mask-image:radial-gradient(250px_circle_at_20%_80%,white,transparent)]",
          "md:[mask-image:radial-gradient(300px_circle_at_20%_80%,white,transparent)]",
          "opacity-10 sm:opacity-15 md:opacity-20",
          "fill-purple-400/40"
        )}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-20">
          Loved by modern professionals
        </h2>
        <div className="relative flex justify-center min-h-[320px] md:min-h-[320px]">
          {/* Decorative circular ring background */}
          
          <div className="relative w-[340px] md:w-[600px] h-[340px] md:h-[340px] flex items-center justify-center z-10">
            <AnimatePresence initial={false}>
              {cardIndices.map((cardIdx, pos) => (
                <motion.blockquote
                  key={cardIdx + '-' + index}
                  initial={{
                    x: positions[pos].x + (pos === 0 ? 40 : 0),
                    scale: positions[pos].scale * 0.95,
                    opacity: 0,
                  }}
                  animate={{
                    x: positions[pos].x,
                    scale: positions[pos].scale,
                    opacity: positions[pos].opacity,
                    filter: positions[pos].filter,
                    boxShadow: positions[pos].boxShadow,
                    zIndex: positions[pos].zIndex,
                  }}
                  exit={{
                    x: pos === 0 ? -120 : (pos === 1 ? -240 : 240),
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    margin: "auto",
                    zIndex: positions[pos].zIndex,
                    boxShadow: positions[pos].boxShadow,
                    filter: positions[pos].filter,
                    width: "340px",
                    pointerEvents: pos === 0 ? "auto" : "none",
                  }}
                  className={`glass-card rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-purple-400/80 flex flex-col items-center bg-white/80 backdrop-blur-md ${pos === 0 ? "" : "scale-95"}`}
                >
                  <img
                    src={testimonials[cardIdx].photo}
                    alt={testimonials[cardIdx].name + " photo"}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg mb-4 -mt-6 bg-gray-100"
                    loading="lazy"
                  />
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 md:w-6 md:h-6 ${i < testimonials[cardIdx].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 text-center">
                    “{testimonials[cardIdx].quote}”
                  </p>
                  <div className="text-sm text-gray-600 text-center">
                    <span className="font-semibold text-gray-900">{testimonials[cardIdx].name}</span>
                    {" • "}
                    {testimonials[cardIdx].role}
                  </div>
                </motion.blockquote>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
