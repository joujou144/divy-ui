import { buttonStyles } from "@/lib/components/Button";
import { SpinnerIcon } from "@/lib/components/icons";
import { cn, createRipple } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { ComponentProps, forwardRef, ReactNode, useRef } from "react";

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
