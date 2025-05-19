import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
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
    colorVariant: "solid",
    size: "sm",
    label: "Loading...",
    showValueLabel: true,
  },
};

export const SuccessGradientMd = () => {
  return (
    <div>
      <Progress
        color="success"
        value={30}
        colorVariant="gradient"
        size="md"
        label="Success in progress"
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="success"
        value={50}
        colorVariant="gradient"
        size="md"
        label="Success in progress"
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="success"
        value={70}
        colorVariant="gradient"
        size="md"
        label="Success in progress"
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="success"
        value={90}
        colorVariant="gradient"
        size="md"
        label="Success in progress"
        showValueLabel
        className="w-[500px]"
      />
    </div>
  );
};

export const Success_Gradient_Md: Story = {
  render: () => <SuccessGradientMd />,
};

export const LoadingMonoSm: Story = {
  args: {
    value: 40,
    className: "w-[500px]",
    color: "loading",
    colorVariant: "solid",
    size: "sm",
    label: "Loading small",
    showValueLabel: false,
  },
};

export const LoadingGradientMd = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 400);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Progress
      color="loading"
      value={value}
      colorVariant="gradient"
      size="md"
      label="Loading content..."
      showValueLabel
      className="w-[500px]"
    />
  );
};

export const Loading_Gradient_Md: Story = {
  render: () => <LoadingGradientMd />,
};

export const LoadingGradientStack = () => {
  return (
    <div>
      <Progress
        color="loading"
        value={30}
        colorVariant="gradient"
        size="md"
        label="Loading content..."
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="loading"
        value={50}
        colorVariant="gradient"
        size="md"
        label="Loading content..."
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="loading"
        value={70}
        colorVariant="gradient"
        size="md"
        label="Loading content..."
        showValueLabel
        className="w-[500px]"
      />
      <Progress
        color="loading"
        value={90}
        colorVariant="gradient"
        size="md"
        label="Loading content..."
        showValueLabel
        className="w-[500px]"
      />
    </div>
  );
};

export const Loading_Gradient_Stack: Story = {
  render: () => <LoadingGradientStack />,
};
