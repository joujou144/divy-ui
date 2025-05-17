import { cn } from "@/lib/utils/shared";
import { cva } from "class-variance-authority";
import { forwardRef, ImgHTMLAttributes, SyntheticEvent, useState } from "react";

const containerStyles = cva("inline-block overflow-hidden", {
  variants: {
    radius: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
    },
  },
  defaultVariants: {
    radius: "lg",
  },
});

const imageStyles = cva(
  "block object-cover w-full h-full transition-transform duration-300",
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
  radius?: "sm" | "md" | "lg";
  width?: number | string;
  height?: number | string;
  fallbackSrc?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      isZoomed,
      radius,
      width,
      height,
      fallbackSrc,
      onError,
      loading = "lazy",
      ...props
    },
    ref
  ) => {
    const [src, setSrc] = useState(props.src);

    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc && src !== fallbackSrc) {
        setSrc(fallbackSrc);
      }

      if (onError) {
        onError(e);
      }
    };

    const sizeStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };

    return (
      <div className={cn(containerStyles({ radius }))} style={sizeStyle}>
        <img
          ref={ref}
          className={cn(imageStyles({ isZoomed }), className)}
          loading={loading}
          onError={handleError}
          {...props}
          src={src}
        />
      </div>
    );
  }
);
