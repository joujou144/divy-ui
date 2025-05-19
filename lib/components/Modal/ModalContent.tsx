import { useModalContext } from "@/lib/components/Modal/ModalProvider";
import { cn } from "@/lib/utils/shared";
import { mergeRefs, useViewportSize } from "@react-aria/utils";
import { cva } from "class-variance-authority";
import { forwardRef, type ReactNode, useEffect } from "react";

const modalStyles = cva(
  "relative overflow-hidden py-5 transform rounded-lg shadow-xl transition-all",
  {
    variants: {
      size: {
        xs: "max-w-sm",
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-xl",
        xl: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

interface ModalContentProps {
  children: ReactNode | ((onClose: () => void) => ReactNode);
  ariaLabel?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (props, ref) => {
    const { children, ariaLabel, className, size, ...otherProps } = props;

    const { isOpen, dialogRef, closeButtonRef, handleKeyDown, handleClose } =
      useModalContext();
    const viewport = useViewportSize();

    // Focus on open
    useEffect(() => {
      if (isOpen && dialogRef.current) {
        dialogRef.current.focus();
      }
    }, [isOpen]);

    return (
      <div className="fixed inset-0 z-20 w-screen">
        <div
          data-slot="wrapper"
          // set the height dynamically to avoid keyboard covering the bottom modal
          style={
            {
              "--visual-viewport-height": `${viewport.height}px`,
            } as React.CSSProperties
          }
          className={`flex min-h-[--visual-viewport-height] items-end justify-center p-4 sm:items-center sm:p-0`}
        >
          <div
            ref={mergeRefs(dialogRef, ref)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-label={ariaLabel}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className={cn(
              "relative bg-white overflow-hidden py-5 px-6 shadow-xl transition-all rounded-lg",
              modalStyles({ size }),
              isOpen ? "animate-fadeOut" : "animate-fadeIn",
              className
            )}
            {...otherProps}
          >
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="z-50 absolute text-stone-500 duration-300 hover:bg-stone-100 cursor-pointer top-1.5 right-1.5 rounded-full w-7 h-7 text-xl font-light focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            {typeof children === "function" ? children(handleClose!) : children}
          </div>
        </div>
      </div>
    );
  }
);
