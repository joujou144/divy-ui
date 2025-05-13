import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from "react";

const modalSizes = cva("max-w-full w-full h-auto rounded-xl border-none p-0", {
  variants: {
    size: {
      xs: "w-[200px] h-[400px]",
      sm: "w-[300px] h-[300px]",
      md: "w-[400px] h-[auto]",
      lg: "w-[500px] h-[auto]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ModalProps extends ComponentProps<"dialog"> {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  backdrop?: "darken" | "blur";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  ariaLabel?: string;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      children,
      isOpen,
      onClose,
      size,
      className,
      backdrop = "darken",
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
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.close();
      }
    }, [isOpen, modalRef]);

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
        onClose?.();
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
      if (isKeyboardDismissDisabled && e.key === "Escape") {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape" && isDismissable) {
        onClose?.();
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
          modalSizes({ size }),
          "z-50",
          backdrop === "blur"
            ? "backdrop:bg-black/30 backdrop:backdrop-blur-sm"
            : "backdrop:bg-black/50",
          "overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </dialog>
    );
  }
);

Modal.displayName = "Modal";

export const ModalContent = ({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}) => (
  <div className={cn("relative flex flex-col gap-4 p-6 w-full", className)}>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-lg"
        aria-label="Close modal"
      >
        ×
      </button>
    )}
    {children}
  </div>
);

export const ModalTitle = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    role="heading"
    aria-level={2}
    className={cn("text-xl font-semibold", className)}
    {...props}
  />
);

export const ModalBody = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    role="document"
    className={cn("text-sm text-gray-700", className)}
    {...props}
  />
);

export const ModalFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    role="contentinfo"
    className={cn("flex justify-end gap-2 pt-4", className)}
    {...props}
  />
);
