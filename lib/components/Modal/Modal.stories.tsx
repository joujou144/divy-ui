import { Button } from "@/lib/components/Button/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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

const ModalExample = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent onClose={() => setIsOpen(false)}>
          <ModalTitle className="text-xl">Example Modal</ModalTitle>
          <ModalBody className="text-sm">
            <p>
              This is a sample modal. You can test different sizes, backdrop
              styles, and dismiss behaviors using Storybook controls.
            </p>
          </ModalBody>
          <ModalFooter className="flex justify-between items-center gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
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
