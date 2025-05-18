import { useDOMRef } from "@/lib/utils/hooks";
import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";

interface ModalContextProps {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  isDismissable: boolean;
  isKeyboardDismissDisabled: boolean;
  handleClose: () => void;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  dialogRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  closeButtonRef: RefObject<HTMLButtonElement>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

interface ModalProviderProps {
  children: ReactNode;
  isOpen: boolean;
  isDismissable: boolean;
  isKeyboardDismissDisabled: boolean;
  handleOpenChange: (open: boolean) => void;
  dialogRef?: RefObject<HTMLDivElement>;
  overlayRef?: RefObject<HTMLDivElement>;
  closeButtonRef?: RefObject<HTMLButtonElement>;
}

export const ModalProvider = ({
  children,
  isOpen,
  isDismissable,
  isKeyboardDismissDisabled,
  handleOpenChange,
}: ModalProviderProps) => {
  const dialogRef = useDOMRef<HTMLDivElement>();
  const overlayRef = useDOMRef<HTMLDivElement>();
  const closeButtonRef = useDOMRef<HTMLButtonElement>();

  //   const dialogRef = useDOMRef(mergeRefs(internalDialogRef, externalDialogRef));
  //   const overlayRef = useDOMRef(
  //     mergeRefs(internalOverlayRef, externalOverlayRef)
  //   );
  //   const closeButtonRef = useDOMRef(
  //     mergeRefs(internalCloseButtonRef, externalCloseButtonRef)
  //   );

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
      if (isKeyboardDismissDisabled && e.key === "Escape") {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape" && isDismissable) {
        handleClose();
      }
    },
    [isKeyboardDismissDisabled, isDismissable, handleClose]
  );

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        handleOpenChange,
        isDismissable,
        isKeyboardDismissDisabled,
        handleClose,
        handleClickOutside,
        handleKeyDown,
        dialogRef,
        overlayRef,
        closeButtonRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
