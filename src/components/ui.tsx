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

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="hero-stat-card p-3 sm:p-4 border-[var(--line)] bg-[color-mix(in_oklch,var(--card)_92%,transparent)]">
      <p className="text-xl sm:text-2xl font-black text-[var(--foreground)]">{value}</p>
      <span className="text-[0.68rem] text-[var(--muted-foreground)] font-medium uppercase tracking-wider">{label}</span>
    </Card>
  );
}
