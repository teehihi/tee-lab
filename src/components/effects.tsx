import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const onMove = (event) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="mouse-glow" aria-hidden="true">
      <div
        ref={glowRef}
        className="mouse-glow-inner"
        style={{ transform: "translate3d(50vw, 50vh, 0)" }}
      />
    </div>
  );
}

function parseColor(color) {
  if (!color || color === "transparent") return { r: 0, g: 0, b: 0, a: 0 };

  const rgbaMatch = color.match(/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)/i);
  if (rgbaMatch) {
    return {
      r: Number.parseInt(rgbaMatch[1], 10),
      g: Number.parseInt(rgbaMatch[2], 10),
      b: Number.parseInt(rgbaMatch[3], 10),
      a: Number.parseFloat(rgbaMatch[4]),
    };
  }

  const rgbMatch = color.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1], 10),
      g: Number.parseInt(rgbMatch[2], 10),
      b: Number.parseInt(rgbMatch[3], 10),
      a: 1,
    };
  }

  let hex = color.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return {
    r: Number.parseInt(hex.slice(0, 2), 16) || 0,
    g: Number.parseInt(hex.slice(2, 4), 16) || 0,
    b: Number.parseInt(hex.slice(4, 6), 16) || 0,
    a: hex.length === 8 ? (Number.parseInt(hex.slice(6, 8), 16) || 255) / 255 : 1,
  };
}

export function InteractiveGrid({
  clickInteraction = true,
  clickForce = 0.72,
  motionSpeed = 0.62,
  cursorTrail = true,
  trailMode = "hover",
  trailLength = 0.16,
  trailColor = "#0073ff",
  backgroundColor = "transparent",
  gridColor,
  dotColor,
  hoverColor = "#0073ff",
  gridSize = 58,
  repulsionStrength = -0.62,
  radius = 300,
  dotSize = 1.35,
  gridThickness = 0.52,
  baseOpacity = 0.085,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const dotsRef = useRef(new Map());
  const mousePosRef = useRef(null);
  const rectRef = useRef({ left: 0, top: 0, width: 1, height: 1 });
  const trailPointsRef = useRef([]);
  const isMouseDownRef = useRef(false);
  const configRef = useRef({});
  const [mounted, setMounted] = useState(false);
  const [themeKey, setThemeKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeKey((key) => key + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    configRef.current = {
      backgroundColor,
      gridColor: gridColor ?? (isDark ? "#ffffff" : "#0f0f0f"),
      dotColor: dotColor ?? (isDark ? "#ffffff" : "#0f0f0f"),
      hoverColor,
      gridSize,
      repulsionStrength,
      radius,
      dotSize,
      gridThickness,
      baseOpacity,
      clickInteraction,
      clickForce,
      motionSpeed,
      cursorTrail,
      trailMode,
      trailLength,
      trailColor,
    };
  }, [
    backgroundColor,
    gridColor,
    dotColor,
    hoverColor,
    gridSize,
    repulsionStrength,
    radius,
    dotSize,
    gridThickness,
    baseOpacity,
    clickInteraction,
    clickForce,
    motionSpeed,
    cursorTrail,
    trailMode,
    trailLength,
    trailColor,
    themeKey,
  ]);

  useEffect(() => {
    if (!mounted) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    let width = 1;
    let height = 1;
    const maxDist = 400;

    const initDots = () => {
      dotsRef.current.clear();
      const currentGridSize = configRef.current.gridSize;
      for (let gx = -currentGridSize; gx < width + currentGridSize * 2; gx += currentGridSize) {
        for (let gy = -currentGridSize; gy < height + currentGridSize * 2; gy += currentGridSize) {
          dotsRef.current.set(`${gx},${gy}`, { x: gx, y: gy, vx: 0, vy: 0, size: 1 });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      rectRef.current = rect;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    };

    const hoverIntensity = (x, y) => {
      const mouse = mousePosRef.current;
      if (!mouse) return 0;
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > configRef.current.radius) return 0;
      return Math.pow(1 - dist / configRef.current.radius, 3.5);
    };

    const getCursorPush = (baseX, baseY) => {
      const mouse = mousePosRef.current;
      if (!mouse) return { x: 0, y: 0 };
      const mappedRepulsion =
        configRef.current.repulsionStrength <= 0
          ? configRef.current.repulsionStrength * 25
          : configRef.current.repulsionStrength * 90;
      const dx = baseX - mouse.x;
      const dy = baseY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (!dist) return { x: 0, y: 0 };
      const pushAmount = Math.pow(1 - Math.min(dist / maxDist, 1), 2) * mappedRepulsion;
      return { x: (dx / dist) * pushAmount, y: (dy / dist) * pushAmount };
    };

    const getClickPush = (baseX, baseY) => {
      if (!configRef.current.clickInteraction || !isMouseDownRef.current) return { x: 0, y: 0 };
      const mouse = mousePosRef.current;
      if (!mouse) return { x: 0, y: 0 };
      const dx = baseX - mouse.x;
      const dy = baseY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return { x: 0, y: 0 };
      const normalizedDist = Math.min(dist / maxDist, 1);
      const pushAmount = Math.pow(1 - normalizedDist, 2) * configRef.current.clickForce * 105;
      return {
        x: (dx / dist) * pushAmount,
        y: (dy / dist) * pushAmount,
      };
    };

    const draw = () => {
      const now = performance.now();
      const config = configRef.current;
      const bg = parseColor(config.backgroundColor);
      const grid = parseColor(config.gridColor);
      const dot = parseColor(config.dotColor);
      const hover = parseColor(config.hoverColor);
      const trail = parseColor(config.trailColor);
      const speed = Math.max(0, Math.min(1, config.motionSpeed));
      const springStiffness = 0.02 + speed * 0.06;
      const damping = 0.7 + speed * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${bg.a})`;
      ctx.fillRect(0, 0, width, height);

      dotsRef.current.forEach((point, key) => {
        const [gxStr, gyStr] = key.split(",");
        const gx = Number.parseInt(gxStr, 10);
        const gy = Number.parseInt(gyStr, 10);
        const rightDot = dotsRef.current.get(`${gx + config.gridSize},${gy}`);
        const bottomDot = dotsRef.current.get(`${gx},${gy + config.gridSize}`);
        const intensity = hoverIntensity(point.x, point.y);

        [rightDot, bottomDot].forEach((nextDot) => {
          if (!nextDot) return;
          const avgHover = (intensity + hoverIntensity(nextDot.x, nextDot.y)) / 2;
          const r = Math.round(grid.r + (hover.r - grid.r) * avgHover);
          const g = Math.round(grid.g + (hover.g - grid.g) * avgHover);
          const b = Math.round(grid.b + (hover.b - grid.b) * avgHover);
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextDot.x, nextDot.y);
          ctx.lineWidth = config.gridThickness + avgHover * 2;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${config.baseOpacity + (1 - config.baseOpacity) * avgHover})`;
          ctx.stroke();
        });
      });

      dotsRef.current.forEach((point, key) => {
        const [gxStr, gyStr] = key.split(",");
        const gx = Number.parseInt(gxStr, 10);
        const gy = Number.parseInt(gyStr, 10);
        const cursorPush = getCursorPush(gx, gy);
        const clickPush = getClickPush(gx, gy);
        const forceX = (gx + cursorPush.x + clickPush.x - point.x) * springStiffness;
        const forceY = (gy + cursorPush.y + clickPush.y - point.y) * springStiffness;
        point.vx = (point.vx + forceX) * damping;
        point.vy = (point.vy + forceY) * damping;
        point.x += point.vx;
        point.y += point.vy;

        const intensity = hoverIntensity(point.x, point.y);
        point.size += (config.dotSize + intensity * config.dotSize - point.size) * 0.15;
        const r = Math.round(dot.r + (hover.r - dot.r) * intensity);
        const g = Math.round(dot.g + (hover.g - dot.g) * intensity);
        const b = Math.round(dot.b + (hover.b - dot.b) * intensity);
        ctx.beginPath();
        ctx.arc(point.x, point.y, Math.max(config.dotSize * 0.5, point.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${config.baseOpacity + (1 - config.baseOpacity) * intensity})`;
        ctx.fill();
      });

      const effectiveTrailLength = Math.max(1, Math.round(config.trailLength * 50));
      if (config.cursorTrail && trailPointsRef.current.length > 1) {
        const maxAge = Math.max(200, effectiveTrailLength * 40);
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const validPoints = trailPointsRef.current.filter((point) => now - point.time <= maxAge);

        if (validPoints.length > 1) {
          ctx.moveTo(validPoints[0].x, validPoints[0].y);
          for (let i = 1; i < validPoints.length - 1; i++) {
            const xc = (validPoints[i].x + validPoints[i + 1].x) / 2;
            const yc = (validPoints[i].y + validPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(validPoints[i].x, validPoints[i].y, xc, yc);
          }
          ctx.lineTo(validPoints[validPoints.length - 1].x, validPoints[validPoints.length - 1].y);
        }

        const last = trailPointsRef.current.at(-1);
        const alpha = last ? Math.max(0, 1 - (now - last.time) / maxAge) : 0;
        ctx.strokeStyle = `rgba(${trail.r}, ${trail.g}, ${trail.b}, ${alpha * 0.9 * trail.a})`;
        ctx.stroke();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const updateMousePosition = (clientX, clientY) => {
      const rect = rectRef.current;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mousePosRef.current = { x, y };
        return { x, y };
      }
      mousePosRef.current = null;
      return null;
    };

    const pushTrailPoint = (x, y) => {
      const config = configRef.current;
      if (!config.cursorTrail || (config.trailMode === "click" && !isMouseDownRef.current)) return;
      const effectiveLength = Math.max(1, Math.round(config.trailLength * 100));
      trailPointsRef.current.push({ x, y, time: performance.now() });
      if (trailPointsRef.current.length > effectiveLength) {
        trailPointsRef.current.splice(0, trailPointsRef.current.length - effectiveLength);
      }
    };

    const handlePointerMove = (event) => {
      const point = updateMousePosition(event.clientX, event.clientY);
      if (point) {
        pushTrailPoint(point.x, point.y);
      }
    };

    const handlePointerDown = (event) => {
      isMouseDownRef.current = true;
      const point = updateMousePosition(event.clientX, event.clientY);
      if (point) {
        pushTrailPoint(point.x, point.y);
      }
    };

    const handlePointerUp = () => {
      isMouseDownRef.current = false;
      if (configRef.current.trailMode === "click") trailPointsRef.current = [];
    };

    resize();
    animationRef.current = requestAnimationFrame(draw);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [mounted]);

  if (!mounted) return null;

  return <canvas ref={canvasRef} className={`interactive-grid ${className}`} aria-hidden="true" />;
}

export function ClickEffects() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playClick = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = audioRef.current || new AudioContext();
        audioRef.current = ctx;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(520, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.025, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);
      } catch {
        // Audio is a small enhancement; ignore unsupported browsers.
      }
    };

    const onPointerDown = (event) => {
      document.documentElement.style.setProperty("--click-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--click-y", `${event.clientY}px`);
      document.documentElement.classList.remove("click-pulse-active");
      window.requestAnimationFrame(() => document.documentElement.classList.add("click-pulse-active"));
      playClick();
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return <div className="click-pulse" aria-hidden="true" />;
}

export function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("portfolio-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const apply = () => setTheme(nextTheme);

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-toggle-sun" aria-hidden="true" />
      <span className="theme-toggle-moon" aria-hidden="true" />
    </button>
  );
}

export function FluidGradientText({ text, viewBoxWidth = 1400, viewBoxHeight = 300 }) {
  const gradientRef = useRef(null);
  const rawXRef = useRef(viewBoxWidth / 2);
  const currentXRef = useRef(viewBoxWidth / 2);
  const rafRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      currentXRef.current += (rawXRef.current - currentXRef.current) * 0.14;
      if (gradientRef.current) gradientRef.current.setAttribute("x1", String(currentXRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawXRef.current = Math.max(0, Math.min(viewBoxWidth, ((event.clientX - rect.left) / rect.width) * viewBoxWidth));
  };

  return (
    <div
      className="fluid-gradient-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rawXRef.current = viewBoxWidth / 2;
      }}
    >
      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="2"
          fill="url(#portfolio-fluid-gradient)"
        >
          {text}
        </text>
        <defs>
          <linearGradient
            ref={gradientRef}
            id="portfolio-fluid-gradient"
            x1={viewBoxWidth / 2}
            y1="0"
            x2={viewBoxWidth / 2}
            y2={viewBoxHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.58" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ElectricBorder({
  children,
  color = "#ec4899",
  speed = 0.75,
  chaos = 0.08,
  borderRadius = 100,
  className = "",
  displacement = 60,
  borderOffset = 60,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    let raf = 0;
    let width = 1;
    let height = 1;

    const random = (x) => (Math.sin(x * 12.9898) * 43758.5453) % 1;
    const noise2D = (x, y) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    };
    const octavedNoise = (x, time, seed) => {
      let y = 0;
      let amplitude = 0.08;
      let frequency = 10;
      for (let i = 0; i < 10; i += 1) {
        y += amplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= 1.6;
        amplitude *= 0.7;
      }
      return y;
    };

    const getCornerPoint = (centerX, centerY, radius, startAngle, progress) => {
      const angle = startAngle + progress * (Math.PI / 2);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    };

    const getRoundedRectPoint = (t, left, top, rectWidth, rectHeight, radius) => {
      const straightWidth = Math.max(0, rectWidth - 2 * radius);
      const straightHeight = Math.max(0, rectHeight - 2 * radius);
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;
      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        return { x: left + radius + distance - accumulated, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(left + rectWidth - radius, top + radius, radius, -Math.PI / 2, (distance - accumulated) / cornerArc);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        return { x: left + rectWidth, y: top + radius + distance - accumulated };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(left + rectWidth - radius, top + rectHeight - radius, radius, 0, (distance - accumulated) / cornerArc);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        return { x: left + rectWidth - radius - (distance - accumulated), y: top + rectHeight };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(left + radius, top + rectHeight - radius, radius, Math.PI / 2, (distance - accumulated) / cornerArc);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        return { x: left, y: top + rectHeight - radius - (distance - accumulated) };
      }
      accumulated += straightHeight;

      return getCornerPoint(left + radius, top + radius, radius, Math.PI, (distance - accumulated) / cornerArc);
    };

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width + borderOffset * 2);
      height = Math.max(1, rect.height + borderOffset * 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (currentTime) => {
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const radius = Math.min(borderRadius, Math.min(borderWidth, borderHeight) / 2);
      const sampleCount = Math.max(120, Math.floor((2 * (borderWidth + borderHeight) + 2 * Math.PI * radius) / 2));

      ctx.beginPath();
      for (let i = 0; i <= sampleCount; i += 1) {
        const progress = i / sampleCount;
        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
        const displacedX = point.x + octavedNoise(progress * 8, timeRef.current, 0) * displacement;
        const displacedY = point.y + octavedNoise(progress * 8, timeRef.current, 1) * displacement;

        if (i === 0) ctx.moveTo(displacedX, displacedY);
        else ctx.lineTo(displacedX, displacedY);
      }

      ctx.closePath();
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [borderRadius, chaos, color, speed, displacement, borderOffset]);

  return (
    <div
      ref={containerRef}
      className={`electric-wrap ${className}`}
      style={{ "--electric-color": color, borderRadius }}
      data-slot="electric-border"
    >
      <canvas ref={canvasRef} className="electric-canvas" aria-hidden="true" />
      <div className="electric-glow" aria-hidden="true" />
      <div className="electric-content">{children}</div>
    </div>
  );
}

export function ShimmerText({ children, className = "" }) {
  const text = typeof children === "string" ? children : null;
  if (!text) return <span className={`shimmer-text ${className}`}>{children}</span>;

  return (
    <span className={`shimmering-letters ${className}`} aria-label={text}>
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} style={{ animationDelay: `${(index / text.length) * 1.4}s` }} aria-hidden="true">
          {char}
        </span>
      ))}
    </span>
  );
}

export function CircularStamp({ text = "BUILD PLAY INSPIRE" }) {
  const chars = `${text} • `.split("");
  return (
    <div className="circular-stamp" aria-hidden="true">
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} style={{ transform: `rotate(${(360 / chars.length) * index}deg)` }}>
          {char}
        </span>
      ))}
    </div>
  );
}
