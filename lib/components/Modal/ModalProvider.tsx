import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";

export interface ModalContextProps {
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

export const ModalProvider = ({
  value,
  children,
}: {
  value: ModalContextProps;
  children: ReactNode;
}) => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

/* This is the hook used in internal modal components like ModalContent
 */
export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
