import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const dividerStyles = cva("shrink-0 bg-stone-300", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

interface DividerProps extends ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(dividerStyles({ orientation }), className)}
        {...props}
      />
    );
  }
);
