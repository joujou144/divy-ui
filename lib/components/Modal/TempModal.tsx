import { ModalBackdrop } from "@/lib/components/Modal/ModalBackdrop";
import {
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "./ModalProvider";

interface ModalProps {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  children: ReactNode;
  dialogRef?: RefObject<HTMLDivElement>;
  overlayRef?: RefObject<HTMLDivElement>;
  closeButtonRef?: RefObject<HTMLButtonElement>;
}

export const TempModal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      handleOpenChange,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      children,
      dialogRef,
      overlayRef,
      closeButtonRef,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [renderModal, setRenderModal] = useState(isOpen);

    // Animation exit timing
    useEffect(() => {
      if (isOpen) {
        setRenderModal(true);
      } else {
        const timeout = setTimeout(() => setRenderModal(false), 350);
        return () => clearTimeout(timeout);
      }
    }, [isOpen]);

    // Prevent scroll when open
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
      <ModalProvider
        isOpen={isOpen}
        handleOpenChange={handleOpenChange}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        dialogRef={dialogRef ?? (ref as any)}
        overlayRef={overlayRef}
        closeButtonRef={closeButtonRef}
      >
        <ModalBackdrop>{children}</ModalBackdrop>
      </ModalProvider>,
      document.body
    );
  }
);

TempModal.displayName = "TempModal";
