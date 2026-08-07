import React from "react";
import { cn } from "../lib/utils";

export function Button({ as, className, variant = "primary", ...props }: { as?: React.ElementType; className?: string; variant?: string; [key: string]: any }) {
  const Comp = as || (props.href ? "a" : "button");
  return (
    <Comp
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-full px-5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative z-10",
        variant === "primary" && "bg-[var(--foreground)] text-[var(--background)] hover:opacity-85 shadow-sm",
        (variant === "secondary" || variant === "outline") &&
          "border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-emerald-500/50",
        variant === "ghost" && "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: { className?: string; [key: string]: any }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklch,var(--card)_88%,transparent)] shadow-sm backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: { className?: string; [key: string]: any }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--muted)] px-2 py-0.5 text-[0.68rem] font-medium text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  return (
    <div className={cn("section-header", className)}>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <span>{description}</span> : null}
    </div>
  );
}

function ShineBorder({
  borderWidth = 1,
  duration = 3.4,
  shineColor = "rgba(16, 185, 129, 0.45)",
  className = "",
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(transparent, transparent, ${shineColor}, transparent, transparent)`,
        backgroundSize: "300% 300%",
        animation: `shine ${duration}s linear infinite`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: `${borderWidth}px`,
      }}
      className={`pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] ${className}`}
    />
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 shadow-lg transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.04] hover:scale-[1.02] cursor-default">
      <ShineBorder duration={3.4} shineColor="rgba(16, 185, 129, 0.45)" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full rounded-[inherit] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <p className="relative z-10 text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-emerald-400 transition-colors leading-none mb-2">
        {value}
      </p>
      <span className="relative z-10 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors leading-tight">
        {label}
      </span>
    </div>
  );
}
