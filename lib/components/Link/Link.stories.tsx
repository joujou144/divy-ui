import { LinkIcon } from "@/lib/components/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Internal Link",
    href: "/about",
  },
};

export const External: Story = {
  args: {
    children: "External Link",
    href: "https://github.com/joujou144/divy-ui",
    isExternal: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "External Link with Icon",
    href: "https://github.com/joujou144/divy-ui",
    isExternal: true,
    showLinkIcon: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: "External Link with Custom Icon",
    href: "https://github.com/joujou144/divy-ui",
    isExternal: true,
    showLinkIcon: true,
    customIcon: <LinkIcon className="text-green-500" />,
  },
};
