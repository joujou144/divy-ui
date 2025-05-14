import { Button } from "@/lib/components/Button/Button";
import { createRipple } from "@/lib/components/Button/createRipple";
import { useDisclosure } from "@/lib/components/Modal/useDisclosure";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProps,
  ModalTitle,
  NewModal,
} from "./NewModal";

const meta: Meta<typeof NewModal> = {
  component: NewModal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
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
type Story = StoryObj<typeof NewModal>;

const ModalExample = (args: ModalProps) => {
  const { isOpen, onOpenModal, handleOpenChange } = useDisclosure();
  const testButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        color="success"
        onClick={() => {
          console.log("open");

          //   setTimeout(() => {
          //     onOpenModal();
          //   }, 75); // 5
          onOpenModal();
        }}
        className="w-30"
      >
        Open Modal
      </Button>

      <Button
        ref={testButtonRef}
        onClick={(e) => {
          console.log("clicked");
          if (testButtonRef.current) {
            createRipple(e, testButtonRef.current);
          }
        }}
        className="w-30"
      >
        Test ripple
      </Button>

      <NewModal
        {...args}
        isOpen={isOpen}
        handleOpenChange={handleOpenChange}
        className=""
      >
        <ModalContent className="flex flex-col justify-end">
          {(onClose) => (
            <>
              <ModalTitle>Example Modal</ModalTitle>
              <ModalBody className="flex flex-col gap-2 font-light tracking-wide">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>

                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between gap-5">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NewModal>
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
