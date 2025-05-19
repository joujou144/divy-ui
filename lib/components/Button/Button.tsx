import { cn, createRipple } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, ReactNode, useRef } from "react";

const buttonStyles = cva(
  [
    "w-full",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "transition-all",
    "duration-200",
    "overflow-visible",
    "border-[2px]",
  ],
  {
    variants: {
      color: {
        default: ["bg-neutral-300", "text-gray-tint-600", "border-stone-200"],
        secondary: [
          "bg-purple-tint-200",
          "text-gray-tint-600 border-purple-tint-200",
        ],
        success: ["bg-leaf-600", "text-stone-100 border-leaf-600"],
        danger: ["bg-orange-tint-300", "text-stone-100 border-orange-tint-300"],
      },
      variant: {
        solid: "border-transparent",
        flat: "",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent transition-colors",
      },
      size: {
        sm: "px-3.5 py-1.5 font-light text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-2.5 text-base",
      },
      radius: {
        full: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      isLoading: {
        true: "flex items-center justify-center gap-2.5 opacity-80",
        false: "",
      },
      withIcon: {
        true: "flex items-center justify-center gap-1.5 pr-5",
        false: "",
      },
    },
    compoundVariants: [
      // solid hover state
      {
        variant: "solid",
        className: "hover:bg-opacity-80 hover:border-transparent",
      },
      // outline states
      {
        variant: "outline",
        color: "default",
        className:
          "text-gray-tint-400 border-gray-tint-400 hover:bg-stone-300 hover:border-stone-100 hover:text-gray-tint-500",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "text-purple-300 border-purple-tint-200 hover:bg-purple-tint-200 hover:text-gray-tint-600",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "text-leaf-600 border-leaf-600 hover:bg-leaf-600 hover:text-stone-100",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "text-orange-tint-300 border-orange-tint-300 hover:bg-orange-tint-300 hover:text-stone-100",
      },

      // ghost states
      {
        variant: "ghost",
        color: "default",
        className:
          "text-gray-tint-400 hover:bg-stone-300 hover:border-stone-200 hover:text-gray-tint-500",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-purple-300 hover:bg-purple-tint-200 hover:text-gray-tint-600",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-leaf-600 hover:bg-leaf-600 hover:text-stone-100",
      },
      {
        variant: "ghost",
        color: "danger",
        className:
          "font-medium text-orange-tint-300 hover:bg-orange-tint-300 hover:text-stone-100",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "default",
      radius: "lg",
      isLoading: false,
    },
  }
);

interface ButtonProps extends ComponentProps<"button"> {
  color?: "default" | "secondary" | "success" | "danger";
  isLoading?: boolean;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "flat" | "ghost";
  radius?: "full" | "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color,
      icon,
      isLoading,
      radius,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const withIcon = Boolean(icon);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
      <button
        ref={mergeRefs(buttonRef, ref)}
        disabled={isLoading}
        className={cn(
          "relative overflow-hidden",
          buttonStyles({ color, variant, size, radius, isLoading, withIcon }),
          className
        )}
        onPointerDown={(e) => {
          if (buttonRef.current) {
            createRipple(e, buttonRef.current);
          }
        }}
        onClick={(e) => {
          setTimeout(() => {
            props.onClick?.(e);
          }, 50);
        }}
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
);
