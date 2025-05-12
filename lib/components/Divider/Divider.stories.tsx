import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex items-center text-sm">
      <span>Docs</span>
      <Divider {...args} />
      <span>Installation</span>
    </div>
  ),
};
