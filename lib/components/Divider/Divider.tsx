import { cn } from "@/lib/utils/shared";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

const dividerStyles = cva("shrink-0 bg-stone-300", {
  variants: {
    orientation: {
      horizontal: "h-px w-full my-4",
      vertical: "w-px mx-4 h-6",
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
