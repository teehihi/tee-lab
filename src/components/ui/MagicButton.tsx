import React from "react";
import { cn } from "../../lib/utils";

export const MagicButton = ({
  title,
  icon,
  position = "right",
  handleClick,
  className,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  className?: string;
  otherClasses?: string;
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none",
        className
      )}
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#3b82f6_50%,#10b981_100%)]" />

      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6 text-xs font-semibold font-mono text-white backdrop-blur-3xl gap-2",
          otherClasses
        )}
      >
        {position === "left" && icon}
        <span>{title}</span>
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
