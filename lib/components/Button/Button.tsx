import { cn, createRipple } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, ReactNode, useRef } from "react";

const buttonStyles = cva(
  [
    "w-full",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-70",
    "disabled:text-opacity-80",
    "transition-all",
    "duration-200",
    "overflow-visible",
    "border-[2px]",
    "hover:border-transparent",
  ],
  {
    variants: {
      color: {
        default: ["bg-neutral-300 text-gray-800"],
        secondary: ["bg-azure-600", "text-stone-100"],
        success: ["bg-leaf-600", "text-gray-800"],
        danger: ["bg-rose-500", "text-stone-100"],
      },
      variant: {
        solid: "border-transparent",
        light: "border-transparent  hover:opacity-80",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent",
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
      // light states
      {
        variant: "light",
        color: "default",
        className: "bg-neutral-200",
      },
      {
        variant: "light",
        color: "secondary",
        className: "bg-blue-200 text-azure-700",
      },
      {
        variant: "light",
        color: "success",
        className: "bg-leaf-250 text-green-900",
      },
      {
        variant: "light",
        color: "danger",
        className: "bg-brick-200 text-brick-900",
      },
      // outline states
      {
        variant: "outline",
        color: "default",
        className: "border-stone-400 text-gray-600 hover:bg-neutral-300",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "text-azure-600 border-azure-600 hover:bg-azure-600 hover:text-stone-100",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "text-leaf-600 border-leaf-600 hover:bg-leaf-600 hover:text-gray-800",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-stone-100",
      },

      // ghost states
      {
        variant: "ghost",
        color: "default",
        className: "hover:bg-neutral-300",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "text-azure-600 hover:bg-azure-600 hover:text-stone-100",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-leaf-600 hover:bg-leaf-600 hover:text-stone-100",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "text-rose-600 hover:bg-rose-500 hover:text-stone-100",
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
  variant?: "solid" | "outline" | "light" | "ghost";
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
