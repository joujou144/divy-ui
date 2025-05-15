import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  cloneElement,
  ComponentProps,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const modalStyles = cva(
  "relative transform overflow-hidden rounded-lg shadow-xl transition-all",
  {
    variants: {
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
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
    backdrop: "darken",
  },
});

export interface ModalProps extends ComponentProps<"div"> {
  children: ReactNode;
  isOpen: boolean;
  ariaLabel?: string;
  backdrop?: "darken" | "blur";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  handleOpenChange: (open: boolean) => void;
}

export const TempModal = forwardRef<HTMLDivElement, ModalProps>(
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
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [modalClosing, setModalClosing] = useState(false);
    const localRef = useRef<HTMLDivElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDivElement>) ?? localRef;

    const handleClose = () => {
      handleOpenChange(false);
    };

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
        setShouldRender(true);
        setModalClosing(false);
      } else {
        setModalClosing(true);
        const timeoutId = setTimeout(() => {
          setShouldRender(false);
          setModalClosing(false);
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

    if (!shouldRender) return null;

    return (
      // Overlay
      <div className="relative z-10" onClick={handleClickOutside}>
        {/* Backdrop */}
        <div
          aria-hidden="true"
          className={cn(
            "transition-all",
            modalClosing
              ? "opacity-0 duration-300 ease-in"
              : "opacity-100 duration-300 ease-out",
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
                "bg-white duration-300",
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
                ×
              </button>
              {isValidElement(children) && children.type === ModalContent
                ? cloneElement(children as ReactElement<ModalContentProps>, {
                    onClose: handleClose,
                  })
                : children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TempModal.displayName = "TempModal";

type ModalContentProps = {
  className?: string;
  onClose?: () => void;
  children: ReactNode | ((onClose: () => void) => ReactNode);
};

export const ModalContent = ({
  className,
  children,
  onClose,
}: ModalContentProps) => (
  <div className={cn("w-[92%] px-1 py-4 mx-auto", className)}>
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
