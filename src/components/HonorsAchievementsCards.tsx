import React, { useState, useEffect } from "react";

interface AchievementCardData {
  id: string;
  title: string;
  badge: string;
  description: string;
  images: string[];
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
  },
  {
    id: "projects",
    title: "Production Projects",
    badge: "5+ Production Deployments",
    description:
      "Successfully deployed real-world applications including XeNow, Uniquizz, Apex Chaos, Corava Maris, and Phoenix Vision.",
    images: [
      "/project/Apex-Chaos.webp",
      "/project/CoravaMaris.webp",
      "/project/Uniquiz.webp",
      "/project/XeNow.webp",
      "/project/MovieDoubleT.webp",
    ],
  },
  {
    id: "promptToPlay",
    title: "🎮 VNG Prompt To Play 2026",
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
  },
];

interface CardItemProps {
  card: AchievementCardData;
}

const SingleAchievementCard: React.FC<CardItemProps> = ({ card }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto carousel slide every 3.0 seconds
  useEffect(() => {
    if (card.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % card.images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [card.images.length]);

  return (
    <div className="achievements-stacked-card group relative w-full">
      {/* STRICT 16:9 ASPECT RATIO CONTAINER */}
      <div className="achievements-stacked-card-content relative w-full aspect-[16/9] rounded-3xl bg-[#121318] border border-white/12 shadow-2xl">
        
        {/* INNER IMAGE & OVERLAY CONTAINER */}
        <div className="relative z-10 w-full h-full rounded-[22px] overflow-hidden">
          {/* Background Image Carousel */}
          <div className="absolute inset-0 w-full h-full bg-[#0d0e12]">
            {card.images.map((imgSrc, idx) => {
              const isActive = idx === currentIdx;
              return (
                <img
                  key={imgSrc}
                  src={imgSrc}
                  alt={`${card.title} screenshot ${idx + 1}`}
                  style={{ zIndex: isActive ? 10 : 1 }}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out transform ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                  loading="lazy"
                />
              );
            })}
          </div>

          {/* CENTERED CAROUSEL PAGINATION DOTS (Positioned at BOTTOM-CENTER) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
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

          {/* Hover Overlay with Info (ONLY VISIBLE ON HOVER) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/35 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-4 sm:p-5 flex flex-col justify-end z-20">
            <div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out space-y-2">
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
    </div>
  );
};

export const HonorsAchievementsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full py-4">
      {achievementsCardsData.map((card) => (
        <SingleAchievementCard key={card.id} card={card} />
      ))}
    </div>
  );
};
