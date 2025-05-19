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
    <div className="flex items-center gap-4 justify-center">
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
    <div className="flex items-center gap-4 justify-center">
      <Button variant="outline">outline</Button>
      <Button variant="outline" color="secondary">
        outline
      </Button>
      <Button variant="outline" color="success">
        outline
      </Button>
      <Button variant="outline" color="danger">
        outline
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
      <Button className="">Default</Button>
      <Button className="" variant="outline">
        Outline
      </Button>
      <Button className="" variant="light">
        Light
      </Button>
      <Button className="" variant="ghost">
        Ghost
      </Button>
    </div>
  );
};

export const Variant_Default: Story = {
  render: () => <VariantButtonsDefault />,
};

const VariantButtonsSecondary = () => {
  return (
    <div className="flex gap-4 justify-between">
      <Button color="secondary">Solid</Button>
      <Button color="secondary" variant="outline">
        Outline
      </Button>
      <Button color="secondary" variant="light">
        Light
      </Button>
      <Button color="secondary" variant="ghost">
        Ghost
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
      <Button color="success">Solid</Button>
      <Button color="success" variant="outline">
        Outline
      </Button>
      <Button color="success" variant="light">
        Light
      </Button>
      <Button color="success" variant="ghost">
        Ghost
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
      <Button color="danger">Solid</Button>
      <Button color="danger" variant="outline">
        Outline
      </Button>
      <Button color="danger" variant="light">
        Light
      </Button>
      <Button color="danger" variant="ghost">
        Ghost
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
