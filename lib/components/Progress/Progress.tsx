import { cn } from "@/lib/utils/shared/classname";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

export interface ProgressProps extends ComponentProps<"div"> {
  color: "success" | "loading";
  colorVariant?: "mono" | "gradient";
  size?: "sm" | "md";
  showValueLabel?: boolean;
  value: number;
  label?: string;
}

const progressStyles = cva(
  "rounded-full transform transition-transform origin-left",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-3",
      },
      color: {
        success: "bg-leaf-600",
        loading: "bg-azure-600",
      },
    },
    defaultVariants: {
      size: "md",
      color: "loading",
    },
  }
);

const getGradientColor = (value: number, color: "success" | "loading") => {
  const palette = {
    success: [
      "bg-leaf-300", // ≤30%
      "bg-leaf-400", // 31–50%
      "bg-leaf-500", // 51–80%
      "bg-leaf-600", // >90%
    ],
    loading: [
      "bg-azure-300", // ≤30%
      "bg-azure-400", // 31–50%
      "bg-azure-500", // 51–80%
      "bg-azure-600", // >90%
    ],
  };

  if (value <= 30) return palette[color][0];
  if (value <= 50) return palette[color][1];
  if (value <= 80) return palette[color][2];
  return palette[color][3];
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      color = "loading",
      colorVariant = "mono",
      size = "md",
      showValueLabel = false,
      value,
      label,
      ...props
    },
    ref
  ) => {
    const fillColor =
      colorVariant === "mono"
        ? progressStyles({ size, color })
        : cn(progressStyles({ size }), getGradientColor(value, color));

    return (
      <div
        className={cn("w-full flex flex-col space-y-1.5", className)}
        {...props}
      >
        {showValueLabel && (
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>{label ?? `${value}%`}</p>
            {label && value ? (
              <p className="text-xs font-light text-gray-500">{value}%</p>
            ) : null}
          </div>
        )}

        <div
          className={cn("w-full bg-neutral-200 rounded-full overflow-hidden", {
            "h-1.5": size === "sm",
            "h-3": size === "md",
          })}
        >
          <div
            ref={ref}
            className={fillColor}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ transform: `scaleX(${value / 100})` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
