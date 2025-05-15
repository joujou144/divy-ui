import { Button } from "@/lib/components/Button/Button";
import { useDisclosure } from "@/lib/components/Modal";
import { Meta, StoryObj } from "@storybook/react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTitle,
  TempModal,
} from "./TempModal";

const meta: Meta<typeof TempModal> = {
  component: TempModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TempModal>;

const ModalExample = () => {
  const { isOpen, onOpenModal, handleOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onClick={onOpenModal}
        className="absolute top-2 left-2 w-30"
      >
        Open Temp Modal
      </Button>

      <TempModal isOpen={isOpen} handleOpenChange={handleOpenChange}>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalTitle>Temp Modal</ModalTitle>
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
      </TempModal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalExample />,
};
