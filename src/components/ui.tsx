import React from "react";
import { cn } from "../lib/utils";

export function Button({
  as: Comp = "button",
  className,
  variant = "primary",
  children,
  ...props
}: {
  as?: any;
  className?: string;
  variant?: "primary" | "outline" | "ghost" | "secondary";
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold font-mono tracking-wide transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 hover:brightness-110 hover:shadow-emerald-500/40",
        variant === "outline" &&
          "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-emerald-500/40 backdrop-blur-md",
        variant === "secondary" &&
          "bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25",
        variant === "ghost" &&
          "text-gray-300 hover:text-white hover:bg-white/5",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Card({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[#0c121e]/80 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-300",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2 mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>{eyebrow.toUpperCase()}</span>
      </div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-gray-400 text-sm max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
      <strong className="block text-2xl font-extrabold text-white font-mono tracking-tight text-gradient-emerald">
        {value}
      </strong>
      <span className="block text-xs font-mono text-gray-400">{label}</span>
    </div>
  );
}
