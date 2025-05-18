import { useDOMRef } from "@/lib/utils/shared";
import { Ref, useCallback } from "react";
import type { ModalContextProps } from "./ModalProvider";

export interface UseModalOptions {
  isOpen: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  handleOpenChange: (open: boolean) => void;
  ref?: Ref<HTMLDivElement>;
}

export function useModal(props: UseModalOptions): ModalContextProps {
  const {
    isOpen,
    isDismissable = true,
    isKeyboardDismissDisabled = false,
    handleOpenChange,
  } = props;

  const dialogRef = useDOMRef<HTMLDivElement>(props.ref);
  const overlayRef = useDOMRef<HTMLDivElement>();
  const closeButtonRef = useDOMRef<HTMLButtonElement>();

  const handleClose = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const handleClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDismissable || !dialogRef.current) return;
      if (!dialogRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [isDismissable, dialogRef, handleClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        if (isKeyboardDismissDisabled) {
          e.preventDefault();
          return;
        }
        if (isDismissable) {
          handleClose();
        }
      }
    },
    [isKeyboardDismissDisabled, isDismissable, handleClose]
  );

  return {
    isOpen,
    isDismissable,
    isKeyboardDismissDisabled,
    handleOpenChange,
    handleClose,
    handleClickOutside,
    handleKeyDown,
    dialogRef,
    overlayRef,
    closeButtonRef,
  };
}
