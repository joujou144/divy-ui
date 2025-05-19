import { cn } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, useRef } from "react";

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
    const localRef = useRef<HTMLDivElement | null>(null);

    return (
      <div
        ref={mergeRefs(localRef, ref)}
        role="separator"
        aria-orientation={orientation}
        className={cn(dividerStyles({ orientation }), className)}
        {...props}
      />
    );
  }
);
