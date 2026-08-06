import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DualIphone3DModel } from "./DualIphone3DModel";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
}

const fullMilestones: Milestone[] = [
  {
    year: "2023",
    title: "Started at HCMUTE",
    subtitle: "B.Eng. in Information Technology",
  },
  {
    year: "2024",
    title: "10.0 in DSA",
    subtitle: "Academic Excellence",
  },
  {
    year: "Mid 2025",
    title: "Full-Stack Development",
    subtitle: "React • TypeScript • Node.js",
  },
  {
    year: "Late 2025",
    title: "Deploy Uniquizz",
    subtitle: "Handle 50+ Concurrent Users",
  },
  {
    year: "Early 2026",
    title: "Phoenix Vision",
    subtitle: "Computer Vision + IoT",
  },
];

export const InteractiveHorizontalTimeline: React.FC = () => {
  // animStep:
  // 0 = Initial preview (3 nodes, phone visible)
  // 1 = Phone glides left off-screen, timeline glides left to 100% width
  // 2 = Green line extends across to 5 nodes
  // 3 = Circular node dots 3, 4, 5 reveal sequentially
  // 4 = Year labels (Mid 2025, Late 2025, Early 2026) reveal FIRST above nodes
  // 5 = Title & Subtitle text contents reveal AFTER below nodes
  const [animStep, setAnimStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger ONLY when section enters center of viewport (45% threshold)
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.45, rootMargin: "0px 0px -10% 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExpand = () => {
    // Step 1: Phone slides left & timeline expands to 100% width
    setAnimStep(1);

    // Step 2: Green line extends across to 5 nodes after slide completes
    setTimeout(() => {
      setAnimStep(2);
    }, 650);

    // Step 3: Circular node dots 3, 4, 5 reveal sequentially
    setTimeout(() => {
      setAnimStep(3);
    }, 1300);

    // Step 4: Year labels (Mid 2025, Late 2025, Early 2026) reveal FIRST above nodes
    setTimeout(() => {
      setAnimStep(4);
    }, 1900);

    // Step 5: Title & Subtitle text contents reveal AFTER below nodes
    setTimeout(() => {
      setAnimStep(5);
    }, 2500);
  };

  const handleCollapse = () => {
    // Step 4: Hide Title & Subtitle contents first
    setAnimStep(4);

    // Step 3: Hide Year labels
    setTimeout(() => {
      setAnimStep(3);
    }, 300);

    // Step 2: Hide circular node dots
    setTimeout(() => {
      setAnimStep(2);
    }, 650);

    // Step 1: Shrink green line back to 3 nodes length
    setTimeout(() => {
      setAnimStep(1);
    }, 1100);

    // Step 0: Slide phone model back into view on left and reset to Node 1 preview state
    setTimeout(() => {
      setAnimStep(0);
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 50);
    }, 1700);
  };

  const isExpanded = animStep > 0;

  return (
    <div
      ref={containerRef}
      className="w-full relative transition-all duration-700 cubic-bezier(0.16,1,0.3,1) py-4"
    >
      {/* Top Bar: Collapse View Button (Always visible on top right when expanded) */}
      <div
        className={`absolute -top-20 sm:-top-24 md:-top-28 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isExpanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={handleCollapse}
          className="collapse-view-animated-btn shadow-2xl relative z-[100]"
          aria-label="Collapse View"
        >
          <div className="svg-wrapper">
            <ArrowLeft className="w-4 h-4 text-[#8DFF5A] stroke-[2.8]" />
          </div>
          <span>Collapse View</span>
        </button>
      </div>

      {/* Main Track Wrapper: Inner container has overflow-hidden to prevent scrollviews without clipping top button */}
      <div className="flex items-center w-full relative transition-all duration-700 cubic-bezier(0.16,1,0.3,1) overflow-hidden">
        {/* STEP 1: Left 3D iPhone Model */}
        <div
          className={`transition-all duration-700 cubic-bezier(0.16,1,0.3,1) shrink-0 select-none ${
            animStep >= 1
              ? "-translate-x-full opacity-0 pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden"
              : "translate-x-0 opacity-100 w-full lg:w-[35%] min-w-[280px] lg:mr-6 relative"
          }`}
        >
          <div className="w-full min-h-[460px] sm:min-h-[540px] flex items-center justify-center lg:justify-start relative">
            <DualIphone3DModel
              screenImageFront="/fbUTE.png"
              screenImageBack="/screenMapUTE.png"
            />
          </div>
        </div>

        {/* STEP 2, 3, 4, 5: Timeline Container */}
        <div
          className={`transition-all duration-700 cubic-bezier(0.16,1,0.3,1) flex-1 w-full overflow-hidden ${
            animStep >= 1 ? "w-full" : "w-full lg:w-[63%]"
          }`}
        >
          {animStep === 0 ? (
            /* ================= INITIAL PREVIEW STATE (Node 1 always visible, Nodes 2 & 3 reveal at center of viewport) ================= */
            <div className="w-full relative flex flex-col transition-all duration-700 ease-in-out overflow-hidden">
              {/* Row 1: Years */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-3 w-full">
                {/* Year 1 (2023) - ALWAYS VISIBLE */}
                <div className="text-center opacity-100 translate-y-0 transition-all duration-700">
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    2023
                  </span>
                </div>

                {/* Year 2 (2024) - Reveals ONLY when centered in viewport */}
                <div
                  className={`text-center transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    2024
                  </span>
                </div>

                {/* Spacer Year */}
                <div
                  className={`text-center transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: "650ms" }}
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-transparent select-none">
                    &nbsp;
                  </span>
                </div>
              </div>

              {/* Row 2: Connecting Line & Node Dots */}
              <div className="relative w-full h-10 flex items-center mb-4">
                {/* Green Progress Line: Extends from Node 1 to Node 3 when centered in viewport */}
                <div className="absolute left-[16.66%] right-[16.66%] top-1/2 -translate-y-1/2 h-[3px] bg-[#8DFF5A]/30 rounded-full z-0 overflow-hidden">
                  <div
                    className={`h-full bg-[#8DFF5A] rounded-full shadow-[0_0_14px_#8DFF5A] transition-all duration-1000 ease-out ${
                      isVisible ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                    style={{ transitionDelay: "150ms" }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full relative z-10">
                  {/* Node 1 Dot - ALWAYS VISIBLE */}
                  <div className="flex items-center justify-center opacity-100 scale-100 translate-y-0 transition-all duration-700">
                    <div className="w-8 h-8 rounded-full bg-[#8DFF5A] shadow-[0_0_18px_#8DFF5A] border-2 border-black" />
                  </div>

                  {/* Node 2 Dot - Reveals ONLY when centered in viewport */}
                  <div
                    className={`flex items-center justify-center transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-4"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8DFF5A] shadow-[0_0_18px_#8DFF5A] border-2 border-black" />
                  </div>

                  {/* Node 3 Dot: Explore More Circular Dot */}
                  <div
                    className={`flex items-center justify-center transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-4"
                    }`}
                    style={{ transitionDelay: "700ms" }}
                  >
                    <div
                      onClick={handleExpand}
                      className="w-8 h-8 rounded-full bg-[#8DFF5A] shadow-[0_0_22px_#8DFF5A] border-2 border-black flex items-center justify-center cursor-pointer group"
                      aria-label="Explore More Timeline"
                    >
                      <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Titles & Subtitles */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
                {/* Node 1 Text - ALWAYS VISIBLE */}
                <div className="text-center px-1 space-y-1 flex flex-col items-center opacity-100 translate-y-0 transition-all duration-700">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug whitespace-nowrap">
                    Started at HCMUTE
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed whitespace-nowrap">
                    B.Eng. in Information Technology
                  </p>
                </div>

                {/* Node 2 Text - Reveals ONLY when centered in viewport */}
                <div
                  className={`text-center px-1 space-y-1 flex flex-col items-center transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "450ms" }}
                >
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug whitespace-nowrap">
                    10.0 in DSA
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed whitespace-nowrap">
                    Academic Excellence
                  </p>
                </div>

                {/* Node 3 Text - ANIMATED TRIPLE CHEVRON ARROW BUTTON (EXACT STYLED CODE, NO BORDER / NO BACKGROUND) */}
                <div
                  className={`text-center px-1 space-y-1 flex flex-col items-center transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "750ms" }}
                >
                  <button
                    onClick={handleExpand}
                    className="explore-more-animated-btn mt-0.5 whitespace-nowrap text-sm sm:text-base font-bold"
                    aria-label="Explore More Timeline"
                  >
                    <span>Explore More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                      <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5" />
                      <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5" />
                      <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ================= EXPANDED DISCRETE STEP STATE MACHINE ================= */
            <div className="w-full relative flex flex-col transition-all duration-700 cubic-bezier(0.16,1,0.3,1) py-2 overflow-hidden">
              {/* Row 1: Years */}
              <div className="grid grid-cols-5 gap-2 mb-3 w-full">
                {fullMilestones.map((item, idx) => {
                  const isNewItem = idx >= 2;
                  const showYear = !isNewItem || animStep >= 4;
                  return (
                    <div
                      key={`year-${item.year}`}
                      className={`text-center transition-all duration-500 ease-out ${
                        showYear
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{
                        transitionDelay: isNewItem ? `${(idx - 2) * 150}ms` : "0ms",
                      }}
                    >
                      <span className="text-xs sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Connecting Line & Node Dots */}
              <div className="relative w-full h-10 flex items-center mb-4">
                <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[3px] bg-[#8DFF5A]/30 rounded-full z-0 overflow-hidden">
                  <div
                    className={`h-full bg-[#8DFF5A] rounded-full shadow-[0_0_16px_#8DFF5A] transition-all duration-700 ease-out ${
                      animStep >= 2 ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-5 gap-2 w-full relative z-10">
                  {fullMilestones.map((item, idx) => {
                    const isNewDot = idx >= 2;
                    const showDot = !isNewDot || animStep >= 3;
                    return (
                      <div
                        key={`dot-${item.year}`}
                        className={`flex items-center justify-center transition-all duration-500 ease-out transform ${
                          showDot
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-50 translate-y-4"
                        }`}
                        style={{
                          transitionDelay: isNewDot ? `${(idx - 2) * 150}ms` : "0ms",
                        }}
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8DFF5A] shadow-[0_0_18px_#8DFF5A] border-2 border-black cursor-pointer" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Titles & Subtitles */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full">
                {fullMilestones.map((item, idx) => {
                  const isNewDesc = idx >= 2;
                  const showDesc = !isNewDesc || animStep >= 5;
                  return (
                    <div
                      key={`desc-${item.year}`}
                      className={`text-center px-0.5 sm:px-1 space-y-1 flex flex-col items-center transition-all duration-500 ease-out transform ${
                        showDesc
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: isNewDesc ? `${(idx - 2) * 150}ms` : "0ms",
                      }}
                    >
                      <h4 className="text-xs sm:text-sm md:text-base font-bold text-white leading-snug break-words">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-normal leading-relaxed break-words">
                        {item.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
