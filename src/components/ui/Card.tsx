import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  hoverable?: boolean;
}

export function Card({
  className,
  elevated = false,
  hoverable = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl border border-espresso/[0.08] p-6 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hoverable ? "hover:-translate-y-1 hover:shadow-lg hover:border-terracotta/20" : "",
        elevated ? "shadow-md hover:shadow-xl" : "shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
