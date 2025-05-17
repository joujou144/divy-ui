import { cn } from "@/lib/utils/shared";
import { ComponentProps } from "react";

export const ModalFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="contentinfo" className={cn("pt-6", className)} {...props} />
);
