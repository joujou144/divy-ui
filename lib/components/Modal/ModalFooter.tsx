import { cn, useDOMRef } from "@/lib/utils/shared";
import { HTMLPolymorphicProps } from "@/lib/utils/types";
import { forwardRef, ReactNode } from "react";

export interface ModalFooterProps extends HTMLPolymorphicProps<"div"> {
  children: ReactNode;
  className?: string;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  (props, ref) => {
    const { as, children, className, ...otherProps } = props;
    const domRef = useDOMRef(ref);

    const Component = as || "header";

    return (
      <Component
        role="contentinfo"
        ref={domRef}
        className={cn("pt-6", className)}
        {...otherProps}
      >
        {children}
      </Component>
    );
  }
);
