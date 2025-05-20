import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "box-border",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-70",
    "disabled:text-opacity-80",
    "transition-all",
    "duration-200",
    "font-medium",
  ],
  {
    variants: {
      color: {
        default: ["bg-gray-300", "text-gray-700"],
        secondary: ["bg-violet-500", "text-white"],
        success: ["bg-leaf-600", "text-white"],
        danger: ["bg-brick-500", "text-white"],
      },
      variant: {
        solid: "",
        light: "",
        outline: "bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        sm: "px-3.5 py-2 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-2.5 text-base",
      },
      radius: {
        full: "rounded-full",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
      },
      isLoading: {
        true: "flex items-center justify-center gap-2.5 opacity-80",
        false: "",
      },
      withIcon: {
        true: "flex items-center justify-center gap-1.5 pr-5",
        false: "",
      },
    },
    compoundVariants: [
      // solid hover state
      {
        variant: "solid",
        className: "hover:bg-opacity-85",
      },

      // light states
      {
        variant: "light",
        color: "default",
        className: "bg-slate-100 text-gray-700 hover:bg-slate-200",
      },
      {
        variant: "light",
        color: "secondary",
        className: "bg-violet-100 text-violet-800 hover:bg-purple-200",
      },
      {
        variant: "light",
        color: "success",
        className: "bg-leaf-100 text-emerald-500 hover:bg-green-100",
      },
      {
        variant: "light",
        color: "danger",
        className: "bg-brick-200 text-rose-600 hover:bg-brick-200",
      },
      // outline states
      {
        variant: "outline",
        color: "default",
        className:
          "ring-1 hover:ring-2 ring-slate-300 hover:bg-slate-50 hover:ring-slate-400 text-gray-500",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "ring-1 hover:ring-2 ring-violet-400 text-violet-600 hover:ring-violet-500 hover:bg-violet-50",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "ring-1 hover:ring-2 text-emerald-500 ring-leaf-500 hover:ring-leaf-550 hover:bg-green-50",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "ring-1 hover:ring-2 ring-rose-300 text-rose-500 hover:bg-brick-50 hover:ring-rose-400",
      },

      // ghost states
      {
        variant: "ghost",
        color: "default",
        className: "hover:bg-slate-100",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "text-violet-800 hover:bg-purple-50 ",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-emerald-500 hover:bg-green-50",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "text-rose-500 hover:bg-brick-50",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "default",
      radius: "md",
      isLoading: false,
    },
  }
);
