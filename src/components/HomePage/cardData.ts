export type SocialLink = {
  label: string;
  href: string;
  icon:
    | "instagram"
    | "facebook"
    | "linkedin"
    | "youtube"
    | "whatsapp"
    | "twitter";
};

export type Theme = {
  name: string;
  // Tailwind utility classes for quick theming
  gradientFrom: string; // e.g. from-blue-600
  gradientTo: string; // e.g. to-purple-600
  accent: string; // e.g. text-blue-600
  bgBadgeFrom?: string;
  bgBadgeTo?: string;
  buttonText?: string;
};

export type ProfileCard = {
  id: string;
  name: string;
  role: string;
  avatar: string; // image url
  /** Optional short bio (can contain \n for line breaks) */
  bio?: string;
  email: string;
  phone: string;
  websiteLabel: string;
  websiteHref: string;
  socials: SocialLink[];
  shareLink?: string; // optional override for button/QR
  theme: Theme;
};

export const themes: Theme[] = [
  {
    name: "IndigoGlow",
    gradientFrom: "from-blue-600",
    gradientTo: "to-purple-600",
    accent: "text-blue-600",
    bgBadgeFrom: "from-blue-500",
    bgBadgeTo: "to-purple-500",
  },
  {
    name: "EmeraldSun",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-cyan-600",
    accent: "text-emerald-600",
    bgBadgeFrom: "from-emerald-500",
    bgBadgeTo: "to-cyan-500",
  },
  {
    name: "RoseGold",
    gradientFrom: "from-rose-500",
    gradientTo: "to-amber-500",
    accent: "text-rose-600",
    bgBadgeFrom: "from-rose-400",
    bgBadgeTo: "to-amber-400",
  },
  {
    name: "GujaratSpice",
    gradientFrom: "from-amber-500",
    gradientTo: "to-emerald-500",
    accent: "text-amber-600",
    bgBadgeFrom: "from-amber-400",
    bgBadgeTo: "to-emerald-400",
  },
  {
    name: "OceanWave",
    gradientFrom: "from-sky-500",
    gradientTo: "to-indigo-600",
    accent: "text-sky-600",
    bgBadgeFrom: "from-sky-400",
    bgBadgeTo: "to-indigo-500",
  },
  {
    name: "SunsetBlaze",
    gradientFrom: "from-orange-500",
    gradientTo: "to-pink-600",
    accent: "text-orange-600",
    bgBadgeFrom: "from-orange-400",
    bgBadgeTo: "to-pink-500",
  },
  {
    name: "ForestLeaf",
    gradientFrom: "from-green-600",
    gradientTo: "to-lime-500",
    accent: "text-green-600",
    bgBadgeFrom: "from-green-400",
    bgBadgeTo: "to-lime-400",
  },
  {
    name: "RoyalGlow",
    gradientFrom: "from-violet-600",
    gradientTo: "to-fuchsia-600",
    accent: "text-violet-600",
    bgBadgeFrom: "from-violet-500",
    bgBadgeTo: "to-fuchsia-500",
  },
  {
    name: "GoldenSand",
    gradientFrom: "from-amber-400",
    gradientTo: "to-yellow-600",
    accent: "text-amber-600",
    bgBadgeFrom: "from-amber-300",
    bgBadgeTo: "to-yellow-500",
  },
  {
    name: "MidnightAura",
    gradientFrom: "from-slate-800",
    gradientTo: "to-blue-700",
    accent: "text-slate-700",
    bgBadgeFrom: "from-slate-600",
    bgBadgeTo: "to-blue-600",
  },
];

export const demoCards: ProfileCard[] = [
  {
    id: "scc",
    name: "SCC Infotech LLP",
    role: "Software company · IT",

    avatar: "https://review.sccinfotech.com/scc.png",
    email: "sccinfotech@gmail.com",
    phone: "+91 11223 45678",
    websiteLabel: "sccinfotech.com",
    websiteHref: "https://sccinfotech.com",
    socials: [
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
      {
        label: "WhatsApp",
        href: "https://wa.me/911122345678",
        icon: "whatsapp",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/sccinfotech",
        icon: "twitter",
      },
    ],
    shareLink: "/c/demo",
    theme: themes[0],
    bio: "We build custom web and mobile apps.\nTrusted by 200+ clients.",
  },
  {
    id: "jane",
    name: "Jane Patel",
    role: "Brand Strategist",
    avatar: "https://i.pravatar.cc/150?img=47",
    email: "jane.patel@example.com",
    phone: "+91 99876 11223",
    websiteLabel: "janepatel.me",
    websiteHref: "https://example.com/jane",
    socials: [
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      {
        label: "WhatsApp",
        href: "https://wa.me/919987611223",
        icon: "whatsapp",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/janepatel",
        icon: "twitter",
      },
    ],
    shareLink: "/c/jane",
    theme: themes[1],
    bio: "Brand strategist focused on clarity & growth.\nHelps startups find their voice.",
  },
  {
    id: "rahul",
    name: "Rahul Sharma",
    role: "Sales Manager",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "rahul@example.com",
    phone: "+91 88123 44556",
    websiteLabel: "rahulsharma.in",
    websiteHref: "https://example.com/rahul",
    socials: [
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
      {
        label: "WhatsApp",
        href: "https://wa.me/918812344556",
        icon: "whatsapp",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/rahulsharma",
        icon: "twitter",
      },
    ],
    shareLink: "/c/rahul",
    theme: themes[2],
    bio: "Customer-first sales leader with 8+ years experience.\nOpen to partnerships and consults.",
  },
  {
    id: "ramesh",
    name: "Ramesh Patel",
    role: "Traditional Mithai Maker",
    avatar: "https://i.pravatar.cc/150?img=52",
    email: "ramesh.patel@example.com",
    phone: "+91 98765 43210",
    websiteLabel: "rameshmithai.in",
    websiteHref: "https://example.com/ramesh",
    socials: [
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
      { label: "Twitter", href: "https://twitter.com/ramesh", icon: "twitter" },
    ],
    shareLink: "/c/ramesh",
    theme: themes[9],
    bio: "Traditional mithai maker since 1995.\nSpecializes in authentic Gujarati sweets.",
  },
  {
    id: "hetal",
    name: "હેત દેસાઈ",
    role: "ટેક્સટાઇલ ડિઝાઇનર",
    avatar: "https://i.pravatar.cc/150?img=56",
    email: "hetal.desai@example.com",
    phone: "+૯૧ ૯૧૨૩૪ ૫૫૬૭૮",
    websiteLabel: "hetalcrafts.in",
    websiteHref: "https://example.com/hetal",
    socials: [
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      {
        label: "WhatsApp",
        href: "https://wa.me/919123455678",
        icon: "whatsapp",
      },
    ],
    shareLink: "/c/hetal",
    theme: themes[7],
    bio: "સમકાલીન સ્પર્શ સાથે હાથથી બનાવેલા કાપડ,\nગુજરાતના સ્થાનિક કારીગરો સાથે મળીને તૈયાર કરીએ છીએ.",
  },
  {
    id: "mahesh",
    name: "महेश ठक्कर",
    role: "शास्त्रीय लोक कलाकार",
    avatar:
      "https://www.shutterstock.com/image-photo/udaipur-rajasthan-india-02022021-folk-260nw-2157282731.jpg",
    email: "mahesh.thakkar@example.com",
    phone: "+९१ ९०१२३ ४५६७८",
    websiteLabel: "mahesharts.in",
    websiteHref: "https://example.com/mahesh",
    socials: [
      { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      {
        label: "Twitter",
        href: "https://twitter.com/maheshthakkar",
        icon: "twitter",
      },
    ],
    shareLink: "/c/mahesh",
    theme: themes[8],
    bio: "भारतीय शास्त्रीय एवं लोक परंपराओं से जुड़े कलाकार\nआपके सांस्कृतिक उत्सवों और कार्यशालाओं के लिए एक यादगार अनुभव।",
  },
];
