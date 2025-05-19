import { SpinnerIcon } from "@/lib/components/icons";
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
    "border-[2px]",
    "hover:border-transparent",
  ],
  {
    variants: {
      color: {
        default: ["bg-neutral-300", "text-gray-800"],
        secondary: ["bg-indigo-600", "text-stone-100"],
        success: ["bg-leaf-550", "text-gray-800"],
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
        className: "bg-indigo-200 text-indigo-900",
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
          "text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-stone-100",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "text-leaf-600 border-leaf-600 hover:bg-leaf-550 hover:text-gray-800",
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
        className: "text-indigo-800 hover:bg-indigo-600 hover:text-stone-100",
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
  radius?: "full" | "sm" | "md" | "lg";
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
        <span className="relative inline-flex items-center justify-center w-full h-full overflow-visible gap-1.5">
          {isLoading ? <SpinnerIcon /> : icon}
          {children}
        </span>
      </button>
    );
  }
);
