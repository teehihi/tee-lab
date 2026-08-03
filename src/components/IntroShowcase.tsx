import React, { useState, useEffect } from "react";
import { Iphone3DModel } from "./Iphone3DModel";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

interface IntroShowcaseProps {
  onEnterPortfolio: () => void;
}

export function IntroShowcase({ onEnterPortfolio }: IntroShowcaseProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Lock body scroll while Intro Showcase is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleStartTransition = () => {
    if (isZooming) return;
    setIsZooming(true);

    // After zoom animation completes, fade out the showcase screen and reveal portfolio
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        document.body.style.overflow = "";
        onEnterPortfolio();
      }, 600);
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#07070a] text-white transition-opacity duration-700 select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Background: Fill screen */}
        <img
          src="/bgintro.avif"
          alt="Intro Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Centered Overlay Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/bgintro2.avif"
            alt="Intro Center Graphic"
            className="w-[65%] max-w-[850px] h-auto object-contain pointer-events-none select-none opacity-85"
          />
        </div>
      </div>

      {/* Top Floating Navbar / Skip Button */}
      <header className="relative z-20 flex items-center justify-end px-6 pt-6 sm:px-12 max-w-7xl mx-auto w-full">
        <button
          onClick={handleStartTransition}
          className="text-xs font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 cursor-pointer"
        >
          Skip Intro <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-6 sm:pt-10 max-w-5xl mx-auto w-full">
        {/* Hero Title & Subtitle */}
        <div
          className={`transition-all duration-700 transform ${
            isZooming ? "opacity-0 -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* Main Title ("The Art of Software.") */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none mb-4 sm:mb-6">
            The Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Software.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/70 font-normal leading-relaxed mb-8 px-4">
            Step into an immersive showcase of intelligent AI applications, scalable full-stack platforms, and high-performance interactive software crafted by Nguyen Nhat Thien.
          </p>

          {/* CTA Interactive Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleStartTransition}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-emerald-400 hover:text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] cursor-pointer active:scale-95"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3D iPhone 17 Pro Max Canvas Container */}
        <div className="w-full max-w-4xl relative -mt-4 sm:-mt-8 flex items-center justify-center">
          <Iphone3DModel
            screenImage="/phone-screen.png"
            isZoomedIn={isZooming}
            onZoomComplete={() => {}}
            className="w-full"
          />
        </div>
      </main>

      {/* Bottom Scroll Cue Indicator */}
      <footer className="relative z-20 pb-6 text-center">
        <button
          onClick={handleStartTransition}
          className={`inline-flex flex-col items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-all cursor-pointer ${
            isZooming ? "opacity-0" : "opacity-100"
          }`}
        >
          <span>Click to launch experience</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </button>
      </footer>
    </div>
  );
}
