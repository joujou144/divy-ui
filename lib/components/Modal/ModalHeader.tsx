import { useDOMRef } from "@/lib/utils/hooks";
import { cn } from "@/lib/utils/shared";
import { HTMLPolymorphicProps } from "@/lib/utils/types";
import { forwardRef, ReactNode } from "react";

export interface ModalHeaderProps extends HTMLPolymorphicProps<"header"> {
  children: ReactNode;
  className?: string;
}

export const ModalHeader = forwardRef<HTMLHeadingElement, ModalHeaderProps>(
  (props, ref) => {
    const { as, children, className, ...otherProps } = props;
    const domRef = useDOMRef(ref);

    const Component = as || "header";

    return (
      <Component
        role="heading"
        aria-level={2}
        ref={domRef}
        className={cn("font-semibold", className)}
        {...otherProps}
      >
        {children}
      </Component>
    );
  }
);

ModalHeader.displayName = "ModalHeader";
