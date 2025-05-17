import { cn } from "@/lib/utils/shared";
import { ComponentProps } from "react";

export const ModalBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="document" className={cn("pt-6", className)} {...props} />
);
