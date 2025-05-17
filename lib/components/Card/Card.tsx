import { cn } from "@/lib/utils/shared";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, KeyboardEvent, ReactNode } from "react";

const cardStyles = cva(
  "relative w-full transition-all duration-200 overflow-hidden",
  {
    variants: {
      radius: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
      },
      isHoverable: {
        true: "hover:shadow-lg",
        false: "",
      },
      isClickable: {
        true: "cursor-pointer",
        false: "",
      },
      isFooterBlurred: {
        true: "backdrop-blur-md",
        false: "",
      },
    },
    defaultVariants: {
      radius: "lg",
      isHoverable: false,
      isClickable: false,
      isFooterBlurred: false,
    },
  }
);

interface CardProps extends ComponentProps<"div"> {
  radius?: "sm" | "md" | "lg";
  isHoverable?: boolean;
  isClickable?: boolean;
  isFooterBlurred?: boolean;
  children: ReactNode;
  ariaLabel?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      radius,
      ariaLabel,
      onClick,
      isHoverable,
      isClickable,
      isFooterBlurred,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isClickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.(e as any);
      }
    };

    return (
      <div
        ref={ref}
        role={isClickable ? "button" : "group"}
        tabIndex={isClickable ? 0 : undefined}
        aria-pressed={isClickable ? false : undefined}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        className={cn(
          cardStyles({ radius, isHoverable, isClickable, isFooterBlurred }),

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="heading" aria-level={2} className={cn(className)} {...props} />
);

export const CardBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    role="region"
    aria-label="Card content"
    className={cn(className)}
    {...props}
  />
);

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="contentinfo" className={cn(className)} {...props} />
);
