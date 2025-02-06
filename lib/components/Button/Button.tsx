import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

const buttonStyles = cva(
  [
    "w-full",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "transition-all",
    "duration-200",
  ],
  {
    variants: {
      color: {
        primary: ["bg-stone-200", "text-gray-tint-600"],
        secondary: ["bg-purple-tint-200", "text-gray-tint-600"],
        success: ["bg-green-regular", "text-stone-100"],
        danger: ["bg-orange-tint-300", "text-stone-100"],
      },
      variant: {
        solid: "border-none",
        outline: "border-[2px]",
        ghost: "transition-colors",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      radius: {
        full: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
      },

      isLoading: {
        true: "flex items-center justify-center gap-2 opacity-80",
        false: "",
      },
      withIcon: {
        true: "flex items-center justify-center gap-2",
        false: "",
      },
    },
    compoundVariants: [
      // solid hover state
      {
        variant: "solid",
        className: "hover:bg-opacity-80",
      },
      // outline states
      {
        variant: "outline",
        color: "primary",
        className:
          "bg-transparent font-medium text-gray-tint-400 border-gray-tint-400 hover:bg-stone-300 hover:border-stone-100 hover:text-gray-tint-500",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "bg-transparent font-medium text-purple-300 border-purple-tint-200 hover:bg-purple-tint-200 hover:text-gray-tint-600",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "bg-transparent font-medium text-green-regular border-green-regular hover:bg-green-regular hover:text-stone-100",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "bg-transparent font-medium text-orange-tint-300 border-orange-tint-300 hover:bg-orange-tint-300 hover:text-stone-100",
      },

      // ghost states
      {
        variant: "ghost",
        color: "primary",
        className:
          "bg-transparent font-medium text-gray-tint-400 hover:bg-stone-300 hover:text-gray-tint-500",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "bg-transparent font-medium text-purple-300 hover:bg-purple-tint-200 hover:text-gray-tint-600",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "bg-transparent font-medium text-green-regular hover:bg-green-regular hover:text-stone-100",
      },
      {
        variant: "ghost",
        color: "danger",
        className:
          "bg-transparent font-medium text-orange-tint-300 hover:bg-orange-tint-300 hover:text-stone-100",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "sm",
      color: "secondary",
      radius: "md",
      isLoading: false,
    },
  }
);

interface ButtonProps extends ComponentProps<"button"> {
  color?: "primary" | "secondary" | "success" | "danger";
  isLoading?: boolean;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
  radius?: "full" | "sm" | "md";
}

export function Button({
  children,
  className,
  color,
  icon,
  isLoading,
  radius,
  variant,
  size,
  ...props
}: ButtonProps) {
  const withIcon = Boolean(icon);
  return (
    <button
      className={cn(
        buttonStyles({ color, variant, size, radius, isLoading, withIcon }),
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
          {children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
