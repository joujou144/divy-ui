import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { forwardRef, ImgHTMLAttributes } from "react";

const containerStyles = cva("inline-block overflow-hidden", {
  variants: {
    radius: {
      md: "rounded-xl",
      lg: "rounded-2xl",
    },
  },
  defaultVariants: {
    radius: "lg",
  },
});

const imageStyles = cva(
  "object-cover w-full h-full transition-transform duration-300",
  {
    variants: {
      isZoomed: {
        true: "hover:scale-110",
        false: "",
      },
    },
    defaultVariants: {
      isZoomed: false,
    },
  }
);

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  isZoomed?: boolean;
  radius?: "md" | "lg";
  width?: number;
  height?: number;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, isZoomed, radius, ...props }, ref) => {
    return (
      <div className={cn(containerStyles({ radius }))}>
        <img
          ref={ref}
          className={cn(imageStyles({ isZoomed }), className)}
          {...props}
        />
      </div>
    );
  }
);
