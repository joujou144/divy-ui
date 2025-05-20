import type { Meta, StoryObj } from "@storybook/react";
import { FilledSendIcon } from "../icons";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

const SolidButtons = () => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
};

export const Solid: Story = {
  render: () => <SolidButtons />,
};

const OutlineButtons = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button variant="outline">Default</Button>
      <Button variant="outline" color="secondary">
        Secondary
      </Button>
      <Button variant="outline" color="success">
        Success
      </Button>
      <Button variant="outline" color="danger">
        Error
      </Button>
    </div>
  );
};

export const Outline: Story = {
  render: () => <OutlineButtons />,
};

const VariantButtonsDefault = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="light">Light</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
};

export const Variant_Default: Story = {
  render: () => <VariantButtonsDefault />,
};

const VariantButtonsSecondary = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button color="secondary">Secondary</Button>
      <Button color="secondary" variant="outline">
        Secondary
      </Button>
      <Button color="secondary" variant="light">
        Secondary
      </Button>
      <Button color="secondary" variant="ghost">
        Secondary
      </Button>
    </div>
  );
};

export const Variant_Secondary: Story = {
  render: () => <VariantButtonsSecondary />,
};

const VariantButtonsSuccess = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button color="success">Success</Button>
      <Button color="success" variant="outline">
        Success
      </Button>
      <Button color="success" variant="light">
        Success
      </Button>
      <Button color="success" variant="ghost">
        Success
      </Button>
    </div>
  );
};

export const Variant_Success: Story = {
  render: () => <VariantButtonsSuccess />,
};

const VariantButtonsDanger = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button color="danger">Danger</Button>
      <Button color="danger" variant="outline">
        Danger
      </Button>
      <Button color="danger" variant="light">
        Danger
      </Button>
      <Button color="danger" variant="ghost">
        Danger
      </Button>
    </div>
  );
};

export const Variant_Danger: Story = {
  render: () => <VariantButtonsDanger />,
};

export const Solid_Sm: Story = {
  args: {
    children: "Cancel",
    variant: "solid",
    color: "default",
    size: "sm",
  },
};

export const Solid_Md: Story = {
  args: {
    children: "Medium",
    variant: "solid",
    color: "default",
    size: "md",
  },
};

export const Solid_Lg: Story = {
  args: {
    children: "Large",
    variant: "solid",
    color: "default",
    size: "lg",
  },
};

export const Outline_Sm: Story = {
  args: {
    children: "Small",
    variant: "outline",
    color: "secondary",
    size: "sm",
  },
};

export const Outline_Md: Story = {
  args: {
    children: "Medium",
    variant: "outline",
    color: "secondary",
    size: "md",
  },
};

export const Outline_Lg: Story = {
  args: {
    children: "Large",
    variant: "outline",
    color: "secondary",
    size: "lg",
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
    icon: <FilledSendIcon width={20} height={20} />,
    color: "success",
  },
};

export const GhostWithIcon: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    icon: <FilledSendIcon width={20} height={20} />,
    color: "danger",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};
