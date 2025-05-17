import { cn } from "@/lib/utils/shared";
import { ComponentProps } from "react";

export const ModalTitle = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    role="heading"
    aria-level={2}
    className={cn("font-semibold", className)}
    {...props}
  />
);
