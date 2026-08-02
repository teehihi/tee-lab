import React, { useRef, useState, useEffect } from "react";

interface Macbook3DModelProps {
  screenImage: string;
  className?: string;
}

export function Macbook3DModel({ screenImage, className = "" }: Macbook3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 10, y: -12 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 10;
    let targetY = -12;
    let currentX = 10;
    let currentY = -12;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      targetY = mouseX * 22; // Smooth Y rotation (-22deg to +22deg)
      targetX = -mouseY * 18 + 6; // Smooth X rotation (-12deg to +24deg)
    };

    const updatePhysics = () => {
      time += 0.025;
      if (!isHovered) {
        // Floating levitation physics
        targetX = 8 + Math.sin(time * 0.7) * 3.5;
        targetY = Math.cos(time * 0.5) * 5.5;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      setRotate({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`macbook-3d-scene relative w-full flex items-center justify-center py-8 select-none ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full transform scale-110 opacity-60 pointer-events-none" />

      {/* 3D Macbook Container */}
      <div
        className="macbook-chassis-3d relative transition-transform ease-out duration-75 cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(0deg)`,
        }}
      >
        {/* ================= MACBOOK DISPLAY SCREEN LID ================= */}
        <div
          className="macbook-screen-frame relative rounded-t-[1.4rem] rounded-b-[0.4rem] bg-[#1a1b1f] border-[3px] border-[#2e2f36] shadow-2xl overflow-hidden"
          style={{
            width: "min(92vw, 560px)",
            height: "min(58vw, 345px)",
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Top Notch & Camera Lens */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-32 h-4 bg-[#0d0e11] rounded-b-md flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#18191d] border border-[#2a2b31] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="w-1 h-1 rounded-full bg-[#151619]" />
          </div>

          {/* Screen Content Display Container */}
          <div className="relative w-full h-full p-2.5 bg-[#090a0c] flex items-center justify-center overflow-hidden">
            <img
              src={screenImage}
              alt="Macbook Display Content"
              className="w-full h-full object-cover object-top rounded-lg border border-white/10 shadow-inner"
            />

            {/* Screen Glass Reflection & Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none" />

            {/* Subtle Screen Bezel Shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none rounded-lg" />
          </div>

          {/* Bottom Screen Bezel Bar */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[#121316] flex items-center justify-center border-t border-white/5">
            <span className="text-[9px] font-semibold tracking-[0.2em] text-gray-500 uppercase opacity-75">
              MacBook Pro
            </span>
          </div>
        </div>

        {/* ================= MACBOOK HINGE & BASE CHASSIS ================= */}
        <div
          className="macbook-keyboard-deck relative -mt-1 rounded-b-[1.4rem] bg-gradient-to-b from-[#26272d] via-[#1b1c20] to-[#111215] border-t-2 border-[#3c3d46]"
          style={{
            width: "min(98vw, 590px)",
            height: "min(30vw, 175px)",
            marginLeft: "-15px",
            transformOrigin: "top center",
            transform: "rotateX(72deg) translateY(-10px)",
            transformStyle: "preserve-3d",
            boxShadow:
              "0 50px 100px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Keyboard Recessed Well */}
          <div className="mx-auto mt-3.5 w-[88%] h-[56%] rounded-lg bg-[#0c0d0f] p-2 border border-white/10 shadow-inner flex flex-col justify-between">
            {/* Simulation of Keycaps & Function Row */}
            <div className="w-full h-full bg-[#15161a] rounded flex flex-col justify-around p-1 space-y-0.5 opacity-90">
              <div className="w-full h-1 bg-[#202128] rounded-sm" />
              <div className="w-full h-1 bg-[#202128] rounded-sm" />
              <div className="w-full h-1 bg-[#202128] rounded-sm" />
              <div className="w-full h-1 bg-[#202128] rounded-sm" />
              <div className="w-full h-1.5 bg-[#25262e] rounded-sm flex justify-center">
                <div className="w-1/3 h-full bg-[#32333d] rounded-sm" />
              </div>
            </div>
          </div>

          {/* Trackpad */}
          <div className="mx-auto mt-2.5 w-36 h-11 rounded-lg bg-[#16171b] border border-white/10 shadow-sm" />

          {/* Front Opening Notch Lip */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#3d3e48] rounded-t-sm" />
        </div>

        {/* Floor Drop Shadow */}
        <div
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-5/6 h-12 bg-black/80 blur-2xl rounded-full pointer-events-none"
          style={{ transform: "rotateX(90deg)" }}
        />
      </div>
    </div>
  );
}
