import { useControlledState } from "@react-stately/utils";
import { useCallback } from "react";

type UseDisclosureProps = {
  isOpen?: boolean; // controlled mode
  defaultOpen?: boolean; // uncontrolled mode
  onChange?: (isOpen: boolean) => void;
};

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { isOpen: isOpenProp, defaultOpen = false, onChange } = props;

  const [isOpen, setIsOpen] = useControlledState(
    isOpenProp,
    defaultOpen,
    onChange
  );

  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const onOpenChange = useCallback(
    (open: boolean) => setIsOpen(open),
    [setIsOpen]
  );

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  };
}
