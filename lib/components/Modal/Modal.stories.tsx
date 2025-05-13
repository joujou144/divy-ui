import { Button } from "@/lib/components/Button/Button";
import { useDisclosure } from "@/lib/components/Modal/useDisclosure";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    backdrop: {
      control: { type: "select" },
      options: ["darken", "blur"],
    },
    isDismissable: {
      control: "boolean",
    },
    isKeyboardDismissDisabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalExample = () => {
  const { isOpen, onOpenModal, handleOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpenModal}>Open Modal</Button>

      <Modal isOpen={isOpen} handleOpenChange={handleOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalTitle>Example Modal</ModalTitle>
              <ModalBody>
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections.
              </ModalBody>
              <ModalFooter className="flex justify-between gap-4 items-center">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    size: "md",
    backdrop: "darken",
    isDismissable: true,
    isKeyboardDismissDisabled: false,
    ariaLabel: "Example modal",
  },
};
