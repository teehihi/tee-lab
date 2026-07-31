import { cn } from "../lib/utils";

export function Button({ as: Comp = "button", className, variant = "primary", ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-full px-4 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-[var(--foreground)] text-[var(--background)] hover:opacity-85",
        variant === "outline" &&
          "border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]",
        variant === "ghost" && "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }) {
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

export function Badge({ className, ...props }) {
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

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <span>{description}</span> : null}
    </div>
  );
}

export function Stat({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
