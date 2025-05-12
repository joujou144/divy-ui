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
    className: "my-4",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-6 mx-4",
  },
  render: (args) => (
    <div className="flex items-center text-sm">
      <span>Item 1</span>
      <Divider {...args} />
      <span>Item 2</span>
    </div>
  ),
};
