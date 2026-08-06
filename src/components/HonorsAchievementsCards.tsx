import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementCardData {
  id: string;
  title: string;
  badge: string;
  description: string;
  images: string[];
  initialDelayMs: number; // Staggered start delay for async carousel
  slideIntervalMs: number; // Staggered interval for async carousel
}

const achievementsCardsData: AchievementCardData[] = [
  {
    id: "hackathon",
    title: "HCMUTE Open Hackathon 2025",
    badge: "Outstanding Team Award",
    description:
      "Recognized for delivering an innovative solution at the HCMUTE Open Hackathon 2025, competing among university teams across multiple disciplines.",
    images: [
      "/uteHackathon/585414959_846803521332300_7234295774788760532_n (1).webp",
      "/uteHackathon/585915464_846801601332492_5060789366056943701_n (1).webp",
      "/uteHackathon/586361700_846804211332231_121506387420572198_n (1).webp",
    ],
    initialDelayMs: 0,
    slideIntervalMs: 3600,
  },
  {
    id: "projects",
    title: "Production Projects",
    badge: "5+ Production Deployments",
    description:
      "Successfully deployed real-world applications including XeNow, Uniquizz, Apex Chaos, Corava Maris, and Phoenix Vision...",
    images: [
      "/project/Apex-Chaos.webp",
      "/project/CoravaMaris.webp",
      "/project/Uniquiz.webp",
      "/project/XeNow.webp",
      "/project/MovieDoubleT.webp",
    ],
    initialDelayMs: 1400,
    slideIntervalMs: 4300,
  },
  {
    id: "promptToPlay",
    title: "VNG Prompt To Play 2026",
    badge: "Top 28 Finalist Teams",
    description:
      "Selected as one of the Top 28 finalist teams in VNGGames Prompt To Play 2026, building an AI-powered puzzle game within a 24-hour game jam.",
    images: [
      "/promptToPlay/1.webp",
      "/promptToPlay/2.webp",
      "/promptToPlay/3.webp",
      "/promptToPlay/4.webp",
      "/promptToPlay/5.webp",
    ],
    initialDelayMs: 2800,
    slideIntervalMs: 3900,
  },
];

interface CardItemProps {
  card: AchievementCardData;
  index: number;
}

const SingleAchievementCard: React.FC<CardItemProps> = ({ card, index }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isActive, setIsActive] = useState(false); // Mobile tap toggle state

  // Asynchronous carousel slide timer with staggered initial delay
  useEffect(() => {
    if (card.images.length <= 1) return;

    let intervalTimer: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % card.images.length);

      intervalTimer = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % card.images.length);
      }, card.slideIntervalMs);
    }, card.initialDelayMs);

    return () => {
      clearTimeout(startTimeout);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [card.images.length, card.initialDelayMs, card.slideIntervalMs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: index * 0.25, // Staggered entrance animation: 0s, 0.25s, 0.5s
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => setIsActive((prev) => !prev)}
      className={`achievements-stacked-card group relative w-full cursor-pointer ${
        isActive ? "is-active" : ""
      }`}
    >
      {/* STRICT 16:9 ASPECT RATIO CONTAINER */}
      <div className="achievements-stacked-card-content relative w-full aspect-[16/9] rounded-3xl bg-[#121318] border border-white/12 shadow-2xl">
        
        {/* INNER IMAGE & OVERLAY CONTAINER */}
        <div className="relative z-10 w-full h-full rounded-[22px] overflow-hidden">
          {/* Background Image Carousel (Framer Motion AnimatePresence Silk-Smooth Crossfade) */}
          <div className="relative w-full h-full bg-[#0d0e12]">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIdx}
                src={card.images[currentIdx]}
                alt={`${card.title} screenshot ${currentIdx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </AnimatePresence>
          </div>

          {/* CENTERED CAROUSEL PAGINATION DOTS (Positioned at BOTTOM-CENTER) */}
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl pointer-events-none transition-opacity duration-300 ${
              isActive ? "opacity-0" : "group-hover:opacity-0"
            }`}
          >
            {card.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIdx
                    ? "w-4 bg-[#8DFF5A] shadow-[0_0_8px_#8DFF5A]"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Hover / Tap Overlay with Info */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/35 backdrop-blur-md transition-all duration-500 ease-out p-4 sm:p-5 flex flex-col justify-end z-20 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div
              className={`transition-all duration-500 ease-out space-y-2 ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8DFF5A]/10 border border-[#8DFF5A]/30 text-[#8DFF5A] text-[10px] sm:text-xs font-mono font-bold w-fit shadow-[0_0_12px_rgba(141,255,90,0.15)]">
                <span>★</span>
                <span>{card.badge}</span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                {card.description}
              </p>

              {/* Image pagination dots inside hover overlay */}
              <div className="flex items-center gap-1.5 pt-1">
                {card.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentIdx
                        ? "w-4 bg-[#8DFF5A] shadow-[0_0_8px_#8DFF5A]"
                        : "w-1 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export const HonorsAchievementsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full py-4">
      {achievementsCardsData.map((card, idx) => (
        <SingleAchievementCard
          key={card.id}
          card={card}
          index={idx}
        />
      ))}
    </div>
  );
};
