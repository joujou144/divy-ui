import { Button } from "@/lib/components/Button/Button";
import { ModalBody } from "@/lib/components/Modal/ModalBody";
import { ModalFooter } from "@/lib/components/Modal/ModalFooter";
import { ModalHeader } from "@/lib/components/Modal/ModalHeader";
import { useDisclosure } from "@/lib/utils/hooks";
import { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalContent } from "./Modal";

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalExample = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* User's button to trigger opening the modal */}
      <Button size="sm" onClick={onOpen} className="absolute top-2 left-2 w-30">
        Open Modal
      </Button>

      <Modal isOpen={isOpen} handleOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Temp Modal</ModalHeader>
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
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("cancel here");
                    onClose;
                  }}
                >
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
  render: () => <ModalExample />,
};
