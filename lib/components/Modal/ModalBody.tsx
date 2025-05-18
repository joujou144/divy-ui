import { cn, useDOMRef } from "@/lib/utils/shared";
import { type HTMLPolymorphicProps } from "@/lib/utils/types";
import { forwardRef, ReactNode } from "react";

export interface ModalBodyProps extends HTMLPolymorphicProps<"div"> {
  children: ReactNode;
  className?: string;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (props, ref) => {
    const { as, className, children, ...otherProps } = props;
    const domRef = useDOMRef(ref);

    const Component = as || "div";

    return (
      <Component ref={domRef} className={cn("pt-6", className)} {...otherProps}>
        {children}
      </Component>
    );
  }
);

ModalBody.displayName = "ModalBody";
