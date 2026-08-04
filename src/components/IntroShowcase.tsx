import React, { useState, useEffect } from "react";
import { Iphone3DModel } from "./Iphone3DModel";
import { MacbookLoader } from "./MacbookLoader";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

interface IntroShowcaseProps {
  onEnterPortfolio: () => void;
  onMidTransition?: () => void;
}

export function IntroShowcase({ onEnterPortfolio, onMidTransition }: IntroShowcaseProps) {
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showTextSequence, setShowTextSequence] = useState(false);

  // Trigger sequential text fade-down after 3D model finishes loading
  useEffect(() => {
    if (isModelLoaded) {
      const timer = setTimeout(() => {
        setShowTextSequence(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModelLoaded]);

  // Lock body scroll while Intro Showcase is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleStartTransition = () => {
    if (isSlidingUp) return;

    // Phase 1 (t = 0ms): Unified slide UP for phone, text, and background curtain
    setIsSlidingUp(true);

    // Phase 2 (t = 500ms): At mid-screen point, trigger portfolio hero section fade in
    setTimeout(() => {
      onMidTransition?.();
    }, 500);

    // Phase 3 (t = 1400ms): Intro showcase finishes sliding off top of screen, unmount completely
    setTimeout(() => {
      document.body.style.overflow = "";
      onEnterPortfolio();
    }, 1400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#07070a] text-white select-none transition-transform duration-[1400ms] cubic-bezier(0.16,1,0.3,1) transform ${
        isSlidingUp ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Full-Screen Macbook Isometric Loading Overlay */}
      <div
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07070a] transition-opacity duration-700 ${
          isModelLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src="/bgintro.avif"
          alt="Loading Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
        />
        <div className="relative z-10">
          <MacbookLoader />
        </div>
      </div>

      {/* Background Images Layer (Attached to container, rolls up in 100% sync with elements) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Background: Fill screen */}
        <img
          src="/bgintro.avif"
          alt="Intro Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Bottom-Aligned Overlay Background Loop */}
        <div className="absolute inset-x-0 bottom-[-2%] flex items-end justify-center pointer-events-none">
          <img
            src="/bgintro2.avif"
            alt="Intro Bottom Graphic"
            className="w-[82%] max-w-[1050px] h-auto object-contain pointer-events-none select-none opacity-95"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-6 sm:pt-10 max-w-5xl mx-auto w-full">
        {/* Hero Title & Subtitle (Slides UP smoothly) */}
        <div
          className={`relative z-30 transition-all duration-[1200ms] cubic-bezier(0.16,1,0.3,1) transform ${
            isSlidingUp ? "opacity-20 -translate-y-[80vh]" : "opacity-100 translate-y-0"
          }`}
        >
          {/* 1. Main Title ("Ideas Into Software.") */}
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none mb-4 sm:mb-6 transition-all duration-700 delay-100 transform ${
              showTextSequence ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Software.</span>
          </h1>

          {/* 2. Subtitle Description */}
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base text-white/70 font-normal leading-relaxed mb-8 px-4 transition-all duration-700 delay-300 transform ${
              showTextSequence ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            Exploring the intersection of software engineering, artificial intelligence, and thoughtful product design through projects built for real users.
          </p>

          {/* 3. CTA Interactive Button */}
          <div
            className={`flex items-center justify-center gap-4 relative z-30 transition-all duration-700 delay-500 transform ${
              showTextSequence ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            <button
              onClick={handleStartTransition}
              className="group relative z-30 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-emerald-400 hover:text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] cursor-pointer active:scale-95"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3D iPhone 17 Pro Max Canvas Container & Gentle Tech Bubbles (Leads slide-up smoothly) */}
        <div
          className={`w-full max-w-4xl relative z-10 -mt-2 sm:-mt-4 flex items-center justify-center transition-all duration-[1400ms] cubic-bezier(0.16,1,0.3,1) transform ${
            isSlidingUp ? "-translate-y-[115vh] scale-95" : "translate-y-0 scale-100"
          }`}
        >
          {/* 1. React Bubble (Top Left - Smooth Fade/Slide) */}
          <div
            className={`absolute top-[18%] left-[14%] sm:left-[19%] md:left-[22%] z-20 pointer-events-none transition-all duration-1000 ease-out transform ${
              isModelLoaded
                ? "opacity-100 translate-y-0 scale-100 delay-300"
                : "opacity-0 translate-y-10 scale-90"
            }`}
          >
            <img
              src="/reactBubble.webp"
              alt="React Bubble"
              className="w-18 sm:w-26 md:w-28 h-auto object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-float-bubble-1"
            />
          </div>

          {/* 2. Node.js Bubble (Middle-Lower Left - Smooth Fade/Slide) */}
          <div
            className={`absolute top-[48%] left-[10%] sm:left-[14%] md:left-[17%] z-20 pointer-events-none transition-all duration-1000 ease-out transform ${
              isModelLoaded
                ? "opacity-100 translate-y-0 scale-100 delay-500"
                : "opacity-0 translate-y-10 scale-90"
            }`}
          >
            <img
              src="/nodejsBubble.webp"
              alt="NodeJS Bubble"
              className="w-18 sm:w-26 md:w-28 h-auto object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-float-bubble-2"
            />
          </div>

          {/* 3. Python Bubble (Top Right - Smooth Fade/Slide) */}
          <div
            className={`absolute top-[20%] right-[14%] sm:right-[19%] md:right-[22%] z-20 pointer-events-none transition-all duration-1000 ease-out transform ${
              isModelLoaded
                ? "opacity-100 translate-y-0 scale-100 delay-400"
                : "opacity-0 translate-y-10 scale-90"
            }`}
          >
            <img
              src="/pythonBubble.webp"
              alt="Python Bubble"
              className="w-18 sm:w-26 md:w-28 h-auto object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-float-bubble-3"
            />
          </div>

          {/* 4. DB Bubble (Middle-Lower Right - Smooth Fade/Slide) */}
          <div
            className={`absolute top-[50%] right-[10%] sm:right-[14%] md:right-[17%] z-20 pointer-events-none transition-all duration-1000 ease-out transform ${
              isModelLoaded
                ? "opacity-100 translate-y-0 scale-100 delay-600"
                : "opacity-0 translate-y-10 scale-90"
            }`}
          >
            <img
              src="/dbBubble.webp"
              alt="DB Bubble"
              className="w-18 sm:w-26 md:w-28 h-auto object-contain select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-float-bubble-4"
            />
          </div>

          <Iphone3DModel
            screenImage="/phone-screen.png"
            isZoomedIn={isSlidingUp}
            onZoomComplete={() => { }}
            onModelLoaded={() => setIsModelLoaded(true)}
            className="w-full"
          />
        </div>
      </main>

      {/* Bottom Scroll Cue Indicator */}
      <footer className="relative z-20 pb-6 text-center">
        <button
          onClick={handleStartTransition}
          className={`inline-flex flex-col items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-all duration-500 cursor-pointer ${
            isSlidingUp ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <span>Click to launch experience</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </button>
      </footer>
    </div>
  );
}
