import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0";

    const variants = {
      primary:
        "bg-terracotta text-white shadow-sm hover:shadow-lg hover:shadow-terracotta/20 hover:brightness-105 active:brightness-95",
      secondary:
        "bg-caramel text-white shadow-sm hover:shadow-lg hover:shadow-caramel/20 hover:brightness-105 active:brightness-95",
      accent:
        "bg-peach text-espresso shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95",
      outline:
        "border border-espresso/20 text-espresso hover:border-terracotta/40 hover:bg-espresso/[0.04] hover:shadow-sm",
      ghost:
        "text-espresso hover:bg-espresso/[0.05] hover:text-terracotta",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
