import { useCallback, useState } from "react";

export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpenModal = useCallback(() => setIsOpen(true), []);
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);
  // const handleOpenChange = useCallback(() => {
  //   setIsOpen(false);
  // }, []);

  return { isOpen, onOpenModal, handleOpenChange };
}
