import React, { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="mouse-glow pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={glowRef}
        className="mouse-glow-inner absolute top-0 left-0 w-[60rem] h-[60rem] -ml-[30rem] -mt-[30rem] rounded-full pointer-events-none opacity-40 will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(20, 184, 166, 0.04) 40%, transparent 70%)",
          transform: "translate3d(50vw, 30vh, 0)",
        }}
      />
    </div>
  );
}

export function InteractiveGrid({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<Map<string, { x: number; y: number; vx: number; vy: number }>>(new Map());
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const gridSize = 50;

    const initDots = () => {
      dotsRef.current.clear();
      for (let x = 0; x < width + gridSize; x += gridSize) {
        for (let y = 0; y < height + gridSize; y += gridSize) {
          dotsRef.current.set(`${x},${y}`, { x, y, vx: 0, vy: 0 });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;

      dotsRef.current.forEach((dot, key) => {
        const [gx, gy] = key.split(",").map(Number);
        
        let dx = dot.x - (mousePosRef.current?.x || -1000);
        let dy = dot.y - (mousePosRef.current?.y || -1000);
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180 && mousePosRef.current) {
          const force = (180 - dist) / 180;
          dot.vx += (dx / dist) * force * 1.2;
          dot.vy += (dy / dist) * force * 1.2;
        }

        // Spring return to original position
        dot.vx += (gx - dot.x) * 0.05;
        dot.vy += (gy - dot.y) * 0.05;
        dot.vx *= 0.82;
        dot.vy *= 0.82;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        ctx.fillStyle = dist < 180 ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.06)";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dist < 180 ? 2 : 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`interactive-grid fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <button
      type="button"
      className={`p-2 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-colors ${className}`}
      aria-label="Theme mode"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
    </button>
  );
}

export function ShimmerText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-extrabold ${className}`}>
      {children}
    </span>
  );
}
