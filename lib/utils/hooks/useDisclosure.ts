import { useCallback, useState } from "react";

type UseDisclosureProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (isOpen: boolean) => void;
};

export function useDisclosure({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpen,
  onClose,
  onChange,
}: UseDisclosureProps = {}) {
  const isControlled = isOpenProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = isControlled ? isOpenProp! : uncontrolledOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }

      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }

      onChange?.(open);
    },
    [isControlled, onOpen, onClose, onChange]
  );

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
    },
    [setOpen]
  );

  return { isOpen, onOpenModal, handleOpenChange };
}
