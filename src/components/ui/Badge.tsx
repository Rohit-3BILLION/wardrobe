import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "terracotta" | "caramel" | "peach" | "outline";
  children: React.ReactNode;
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-espresso/[0.06] text-espresso/80 border-espresso/10",
    terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
    caramel: "bg-caramel/10 text-caramel border-caramel/20",
    peach: "bg-peach/20 text-espresso/90 border-peach/30",
    outline: "bg-transparent text-espresso/70 border-espresso/15",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
