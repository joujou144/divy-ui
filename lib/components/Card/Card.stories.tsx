import { Button } from "@/lib/components/Button/Button";
import { Divider } from "@/lib/components/Divider/Divider";
import { Image } from "@/lib/components/Image/Image";
import { Link } from "@/lib/components/Link/Link";
import { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardFooter, CardHeader } from "./Card";

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card
      className="max-w-[400px] border"
      role="group"
      aria-label="User profile card"
    >
      <CardHeader
        className="flex gap-3 px-4 pt-4"
        role="heading"
        aria-level={2}
      >
        <Image
          alt="small-img"
          height={40}
          radius="md"
          src="/images/asap.jpg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">DivyUI</p>
          <p className="text-sm text-stone-500">divy-ui.vercel.app</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody
        role="region"
        aria-label="Card content"
        className="px-4 text-stone-400 font-light"
      >
        <p>Minimalist UI components to elevate your frontend workflow.</p>
      </CardBody>
      <Divider />
      <CardFooter role="contentinfo" className="px-4 pb-4">
        <Link
          isExternal
          showLinkIcon
          href="https://github.com/joujou144/divy-ui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  ),
};

export const HoverableClickable: StoryObj<typeof Card> = {
  render: () => (
    <Card
      isHoverable
      isClickable
      className="border px-4 py-5"
      radius="lg"
      role="button"
      tabIndex={0}
      aria-pressed="false"
      aria-label="Music playlist card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      <CardHeader className="" role="heading" aria-level={2}>
        <p className="text-xs uppercase font-medium">Dope Playlist</p>
        <small className="text-gray-500">12 Tracks</small>
        <h4 className="font-semibold text-lg">Frontend Vibes</h4>
      </CardHeader>

      <CardBody
        className="overflow-visible flex pt-2"
        role="region"
        aria-label="Playlist image"
      >
        <Image
          alt="Card background"
          className="object-fit rounded-xl"
          src="/images/music.jpg"
          width={270}
        />
      </CardBody>
    </Card>
  ),
};

export const FooterBlurred: StoryObj<typeof Card> = {
  render: () => (
    <Card
      isFooterBlurred
      className="border-none relative w-[220px]"
      radius="lg"
      role="group"
      aria-label="Product availability card"
    >
      <Image
        alt="sneakers"
        className="object-cover"
        height={220}
        src="/images/sneakers.jpg"
        width={220}
      />
      <CardFooter
        className="px-3 flex justify-between items-center border-white/40 border overflow-hidden py-2 absolute bg-white/10 rounded-2xl right-1.5 left-1.5 rect backdrop-blur-sm bottom-3 shadow-sm z-10"
        role="contentinfo"
      >
        <p className="text-xs text-white/80 w-1/2">Available soon.</p>
        <Button
          className="text-xs text-white bg-black/20 w-1/2"
          color="primary"
          radius="full"
          size="sm"
          variant="solid"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  ),
};
