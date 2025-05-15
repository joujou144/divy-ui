import { ComponentProps, forwardRef, ReactNode, useRef } from "react";

export interface ModalProps extends ComponentProps<"div"> {
  children: ReactNode;
  //   size?: "xs" | "sm" | "md" | "lg" | "xl";
  //   backdrop?: "darken" | "blur";
  //   isDismissable?: boolean;
  //   isKeyboardDismissDisabled?: boolean;
  isOpen: boolean;
  //   handleOpenChange: (open: boolean) => void;
  ariaLabel?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, isOpen, ariaLabel, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDivElement>) ?? localRef;

    return (
      <div ref={modalRef} {...props}>
        {children}
      </div>
    );
  }
);
