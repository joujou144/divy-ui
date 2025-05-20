import { cn } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, useRef } from "react";

const inputStyles = cva(
  [
    "px-3",
    "pt-5",
    "pb-1",
    "h-14",
    "peer",
    "w-full",
    "text-sm",
    "font-light",
    "transition-all",
    "duration-200",
    "outline-none",
    "disabled:opacity-70",
    "disabled:text-opacity-60",
    "placeholder:text-gray-tint-400",
    "placeholder:text-sm",
    "placeholder:font-light",
  ],
  {
    variants: {
      variant: {
        flat: "bg-gray-100 hover:bg-gray-200 hover:focus-within:bg-gray-100 focus:border-transparent hover:disabled:bg-gray-100",
        bordered:
          "bg-transparent ring-2 ring-gray-200 focus-within:ring-gray-500 hover:ring-gray-400 hover:focus-within:ring-gray-500 hover:disabled:ring-gray-200 ",
      },
      radius: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "flat",
      radius: "md",
    },
  }
);

const labelStyles = cva([
  "absolute",
  "left-3",
  "transition-all",
  "duration-150",
  "bg-transparent",
  "text-gray-500",
  "peer-disabled:opacity-70",
  "pointer-events-none",
  "peer-focus:text-xs",
  "peer-focus:top-2",
  "peer-[:not(:placeholder-shown)]:top-2",
  "peer-[:not(:placeholder-shown)]:text-xs",
]);

interface InputProps extends ComponentProps<"input"> {
  variant?: "flat" | "bordered";
  radius?: "sm" | "md" | "lg";
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, radius, variant, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="relative flex flex-col items-start">
        <input
          ref={mergeRefs(localRef, ref)}
          className={cn(inputStyles({ variant, radius }), className)}
          placeholder=" " // Empty placeholder to trigger :not(:placeholder-shown)
          {...props}
        />
        {label && (
          <label
            className={cn(
              labelStyles(),
              props.placeholder ? "top-2 text-xs" : "top-[1.25em] text-sm"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
