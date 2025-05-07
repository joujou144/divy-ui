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
    src: "/images/speaker.jpg",
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
  },
};

// export const Rounded: Story = {
//   args: {
//     src: "/images/neonpink-leaves.jpg",
//     alt: "Rounded Image",
//     isZoomed: true,
//     width: 300,
//     radius: "full",
//   },
// };
