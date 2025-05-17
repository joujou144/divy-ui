import { cn } from "@/lib/utils/shared";
import { cva } from "class-variance-authority";
import React, {
  cloneElement,
  ComponentProps,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

const modalStyles = cva(
  "relative overflow-hidden py-5 transform rounded-lg shadow-xl transition-all",
  {
    variants: {
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm h-40",
        md: "max-w-md h-[490px]",
        lg: "max-w-lg",
        xl: "max-w-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

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

export interface ModalProps extends ComponentProps<"div"> {
  children: ReactElement;
  isOpen: boolean;
  ariaLabel?: string;
  backdrop?: "darken" | "blur";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  handleOpenChange: (open: boolean) => void;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      isOpen,
      size,
      className,
      ariaLabel,
      backdrop,
      handleOpenChange,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      ...props
    },
    ref
  ) => {
    const [renderModal, setRenderModal] = useState(isOpen);
    const [modalClosing, setModalClosing] = useState(false);
    const localRef = useRef<HTMLDivElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDivElement>) ?? localRef;

    const handleClose = useCallback(() => {
      console.log("handle close called");
      handleOpenChange(false);
    }, [handleOpenChange]);

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!modalRef.current || !isDismissable) return;

      if (!modalRef.current.contains(e.target as Node)) handleClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isKeyboardDismissDisabled && e.key === "Escape") {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape" && isDismissable) {
        handleClose();
      }
    };

    useEffect(() => {
      if (isOpen) {
        setRenderModal(true);
        setModalClosing(false);
      } else {
        setModalClosing(true);
        const timeoutId = setTimeout(() => {
          setRenderModal(false);
        }, 350);

        return () => clearTimeout(timeoutId);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && modalRef.current) modalRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    if (!renderModal) return null;

    return ReactDOM.createPortal(
      // Overlay
      <div className="relative z-10" onClick={handleClickOutside}>
        {/* Backdrop */}
        <div
          aria-hidden="true"
          className={cn(
            "transition-all",
            modalClosing ? "animate-backdropExit" : "animate-backdropEnter",
            backdropStyles({ backdrop })
          )}
        />
        {/* Centering container */}
        <div className="fixed inset-0 z-10 w-screen">
          {/* Large screens: center center; Mobile: bottom center */}
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            {/* Modal Box Container */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-label={ariaLabel}
              tabIndex={-1}
              ref={modalRef}
              onKeyDown={handleKeyDown}
              className={cn(
                "bg-white",
                modalClosing ? "animate-fadeIn" : "animate-fadeOut",
                className,
                modalStyles({ size })
              )}
              {...props}
            >
              <button
                onClick={handleClose}
                className="z-50 absolute text-stone-500 duration-300 hover:bg-stone-100 cursor-pointer top-1.5 right-1.5 rounded-full w-7 h-7 text-xl font-light focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
              {isValidElement(children) && children.type === ModalContent
                ? cloneElement(children as ReactElement<ModalContentProps>, {
                    onClose: handleClose,
                  })
                : children}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

type ModalContentProps = {
  className?: string;
  children: ReactNode | ((onClose: () => void) => ReactNode);
  onClose?: () => void;
};

export const ModalContent = ({
  className,
  children,
  onClose,
}: ModalContentProps) => (
  <div className={cn("h-full w-[92%] mx-auto px-1 overflow-y-auto", className)}>
    {typeof children === "function" ? children(onClose!) : children}
  </div>
);

export const ModalTitle = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    role="heading"
    aria-level={2}
    className={cn("font-semibold", className)}
    {...props}
  />
);

export const ModalBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="document" className={cn("pt-6", className)} {...props} />
);

export const ModalFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div role="contentinfo" className={cn("pt-6", className)} {...props} />
);
