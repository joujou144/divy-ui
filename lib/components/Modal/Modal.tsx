import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from "react";

const modalStyles = cva(
  "max-w-full w-full h-auto rounded-xl border-none py-5 shadow-lg",
  {
    variants: {
      size: {
        xs: "w-[345px] h-[590px]",
        sm: "w-[400px] h-[510px]",
        md: "w-[460px] h-[490px]",
        lg: "w-[550px] h-[420px]",
        xl: "max-w-[670px] h-[390px]",
      },
      backdrop: {
        darken: "backdrop:bg-black/50",
        blur: "backdrop:bg-black/30 backdrop:backdrop-blur-sm",
      },
    },
    defaultVariants: {
      size: "md",
      backdrop: "darken",
    },
  }
);
export interface ModalProps extends ComponentProps<"dialog"> {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  backdrop?: "darken" | "blur";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  ariaLabel?: string;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
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
    const localRef = useRef<HTMLDialogElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDialogElement>) ?? localRef;

    useEffect(() => {
      const dialog = modalRef.current;
      if (!dialog) return;

      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }, [isOpen]);

    const handleClose = useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

    const handleClickOutside = (e: MouseEvent<HTMLDialogElement>) => {
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

    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
      if (isKeyboardDismissDisabled && e.key === "Escape") {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape" && isDismissable) {
        handleClose();
      }
    };

    return (
      <dialog
        ref={modalRef}
        onClick={handleClickOutside}
        onKeyDown={handleKeyDown}
        aria-modal="true"
        aria-label={ariaLabel}
        role="dialog"
        className={cn(
          "z-40 overflow-auto",
          isOpen ? "animate-modalOpen" : "animate-modalClose",
          modalStyles({ size, backdrop }),
          className
        )}
        {...props}
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute cursor-pointer z-50 right-1.5 -top-3.5 w-7 h-7 text-xl font-light rounded-full text-gray-500 hover:bg-stone-100 transition-all duration-200 focus:outline-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        {isValidElement(children) && children.type === ModalContent
          ? cloneElement(children as ReactElement<ModalContentProps>, {
              onClose: handleClose,
            })
          : children}
      </dialog>
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
  <div
    className={cn("w-[92%] h-full px-2 mx-auto overflow-y-scroll", className)}
  >
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
