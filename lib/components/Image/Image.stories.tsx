import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "/images/nike.jpg",
    alt: "Default Image",
    width: 300,
  },
};

export const Zoomed: Story = {
  args: {
    src: "/images/neonpink-leaves.jpg",
    alt: "Zoomed Image",
    isZoomed: true,
    width: 300,
    height: 300,
  },
};

export const WithFallback: Story = {
  args: {
    src: "/images/french-bulldog.png",
    fallbackSrc: "/images/broken-image.svg",
    alt: "Fallback demo",
    width: 300,
    height: 200,
  },
};
