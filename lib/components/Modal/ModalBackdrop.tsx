import { useModalContext } from "@/lib/components/Modal/ModalProvider";
import { cn } from "@/lib/utils/shared";
import { mergeRefs } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";

const backdropStyles = cva("fixed inset-0", {
  variants: {
    backdrop: {
      darken: "bg-black/30",
      blur: "bg-black/20 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    backdrop: "blur",
  },
});

export interface ModalBackdropProps {
  children: ReactNode;
  className?: string;
}

export const ModalBackdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(
  (props, ref) => {
    const { children, ...otherProps } = props;
    const { isOpen, handleClickOutside, overlayRef } = useModalContext();

    return (
      <div
        aria-hidden="true"
        ref={mergeRefs(overlayRef, ref)}
        onClick={handleClickOutside}
        className={cn(
          "fixed inset-0 transition-all z-10",
          isOpen ? "animate-backdropEnter" : "animate-backdropExit",
          backdropStyles({ backdrop: "blur" })
        )}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
