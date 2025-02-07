import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const FlatWithoutPlaceholder: Story = {
  args: {
    variant: "flat",
    type: "email",
    label: "Email",
  },
};

export const FlatWithPlaceholder: Story = {
  args: {
    variant: "flat",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const BorderedWithoutPlaceholder: Story = {
  args: {
    variant: "bordered",
    type: "email",
    label: "Email",
  },
};

export const BorderedWithPlaceholder: Story = {
  args: {
    variant: "bordered",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
};
