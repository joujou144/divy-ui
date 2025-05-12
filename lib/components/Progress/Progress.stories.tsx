import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  component: Progress,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const SuccessMonoSm: Story = {
  args: {
    value: 60,
    className: "w-[500px]",
    color: "success",
    colorVariant: "mono",
    size: "sm",
    label: "Loading...",
    showValueLabel: true,
  },
};

export const SuccessGradientMd: Story = {
  args: {
    value: 80,
    className: "w-[500px]",
    color: "success",
    colorVariant: "gradient",
    size: "md",
    label: "Success in progress...",
    showValueLabel: true,
  },
};

export const LoadingMonoSm: Story = {
  args: {
    value: 40,
    className: "w-[500px]",
    color: "loading",
    colorVariant: "mono",
    size: "sm",
    label: "Loading small",
    showValueLabel: false,
  },
};

export const LoadingGradientMd: Story = {
  args: {
    value: 90,
    className: "w-[500px]",
    color: "loading",
    colorVariant: "gradient",
    size: "md",
    label: "Loading content...",
    showValueLabel: true,
  },
};
