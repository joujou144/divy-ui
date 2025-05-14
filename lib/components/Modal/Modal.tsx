import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  ComponentProps,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

const modalStyles = cva(
  "relative max-w-full w-full h-auto rounded-xl py-5 shadow-lg transition-all bg-white",
  {
    variants: {
      size: {
        xs: "w-[345px] h-[590px]",
        sm: "w-[400px] h-[510px]",
        md: "w-[460px] h-[490px]",
        lg: "w-[550px] h-[420px]",
        xl: "max-w-[670px] h-[390px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const backdropStyles = cva("duration-300", {
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
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  backdrop?: "darken" | "blur";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  ariaLabel?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      isOpen,
      handleOpenChange,
      size,
      className,
      backdrop,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDivElement>) ?? localRef;
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setIsAnimatingOut(false);
      } else {
        setIsAnimatingOut(true);
        const timeoutId = setTimeout(() => {
          setIsAnimatingOut(false);
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }, [isOpen]);

    const handleClose = () => {
      handleOpenChange(false);
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
      const dialog = modalRef.current;
      if (!dialog || !isDismissable) return;

      const rect = dialog.getBoundingClientRect();
      const isClickInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isClickInside) {
        handleClose();
      }
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

    if (!isOpen && !isAnimatingOut) return null;

    return (
      // Backdrop
      <div
        className={cn(
          "fixed flex justify-center items-center inset-0 transition-opacity",
          isOpen
            ? "animate-modalOpen"
            : isAnimatingOut
            ? "animate-modalClose"
            : "",
          backdropStyles({ backdrop })
        )}
      >
        {/* Modal */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          ref={modalRef}
          tabIndex={-1}
          onClick={handleClickOutside}
          onKeyDown={handleKeyDown}
          className={cn(
            "z-40 overflow-y-auto",
            isAnimatingOut
              ? "animate-modalClose"
              : isOpen
              ? "animate-modalOpen"
              : "",
            modalStyles({ size }),
            className
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
    );
  }
);

Modal.displayName = "Modal";

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
  <div className={cn("w-[92%] h-full px-2 mx-auto", className)}>
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
