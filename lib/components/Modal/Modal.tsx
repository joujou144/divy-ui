import { ModalBackdrop } from "@/lib/components/Modal/ModalBackdrop";
import {
  useModal,
  type UseModalOptions,
} from "@/lib/components/Modal/useModal";
import { forwardRef, type ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "./ModalProvider";

interface ModalProps extends UseModalOptions {
  children: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const { children, ...otherProps } = props;
  const context = useModal({ ...otherProps, ref });
  const [renderModal, setRenderModal] = useState(context.isOpen);

  // Animation exit timing
  useEffect(() => {
    if (context.isOpen) {
      setRenderModal(true);
    } else {
      const timeout = setTimeout(() => setRenderModal(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [context.isOpen]);

  // Block scroll when modal is open
  useEffect(() => {
    if (context.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [context.isOpen]);

  if (!renderModal) return null;

  return ReactDOM.createPortal(
    <ModalProvider value={context}>
      <ModalBackdrop>{children}</ModalBackdrop>
    </ModalProvider>,
    document.body
  );
});

Modal.displayName = "Modal";
