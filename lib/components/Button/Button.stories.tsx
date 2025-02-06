import type { Meta, StoryObj } from "@storybook/react";
import { FilledSendIcon } from "../icons";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    children: "Button",
    variant: "solid",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    isLoading: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button",
    icon: <FilledSendIcon />,
  },
};

export const GhostWithIcon: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    icon: <FilledSendIcon />,
  },
};
