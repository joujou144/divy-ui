import { cn, useDOMRef } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
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
    const localRef = useDOMRef<HTMLDivElement>();

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isClickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        localRef.current?.click();
      }
    };

    return (
      <div
        ref={mergeRefs(localRef, ref)}
        role={isClickable ? "button" : "div"}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onClick={isClickable ? onClick : undefined}
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
