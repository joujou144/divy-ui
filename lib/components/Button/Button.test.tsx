import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import { Button } from "./Button";

// Mock the cn utility to have class names in tests
vi.mock("@/lib/utils", () => ({
  cn: (...inputs: string[]) => inputs.filter(Boolean).join(" "),
}));

describe(`Component: ${Button.name}`, () => {
  // default props
  it("renders with default props", () => {
    const { container } = render(<Button>Test Button</Button>);

    expect(container.firstChild).toHaveClass(
      "w-full",
      "focus:outline-none",
      "disabled:cursor-not-allowed",
      "transition-all",
      "duration-200",
      "border-[2px]",
      "hover:border-transparent",
      "bg-neutral-300",
      "text-gray-800",
      "border-transparent",
      "px-4",
      "py-2",
      "text-sm",
      "rounded-lg"
    );
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  // color variants
  it("renders different color variants correctly", () => {
    const colors = ["default", "secondary", "success", "danger"] as const;

    colors.forEach((color) => {
      const { container } = render(
        <Button color={color}>Button {color}</Button>
      );

      // check if appropriate color classes are applied
      expect(container.firstChild).toHaveClass(
        color === "default"
          ? "bg-neutral-300 text-gray-800"
          : color === "secondary"
          ? "bg-indigo-600 text-stone-100"
          : color === "success"
          ? "bg-leaf-550 text-gray-800"
          : "bg-rose-500 text-stone-100"
      );
    });
  });

  // size variants
  it("renders different size variants correctly", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>Button {size}</Button>);

      // check if appropriate size classes are applied
      expect(container.firstChild).toHaveClass(
        size === "sm"
          ? "px-3.5 py-1.5 font-light text-xs"
          : size === "md"
          ? "px-4 py-2 text-sm"
          : "px-6 py-2.5 text-base"
      );
    });
  });

  // style variants
  it("renders different style variants correctly", () => {
    const variants = ["solid", "outline", "light", "ghost"] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <Button variant={variant}>Button {variant}</Button>
      );

      // check if appropriate variant classes are applied
      expect(container.firstChild).toHaveClass(
        variant === "solid"
          ? "border-transparent"
          : variant === "light"
          ? "border-transparent hover:opacity-80"
          : variant === "outline"
          ? "bg-transparent"
          : "border-transparent bg-transparent"
      );
    });
  });

  // radius variants
  it("renders different radius options correctly", () => {
    const radiusOptions = ["full", "sm", "md", "lg"] as const;

    radiusOptions.forEach((radius) => {
      const { container } = render(
        <Button radius={radius}>Button {radius}</Button>
      );

      // check if appropriate radius sizes are applied
      expect(container.firstChild).toHaveClass(
        radius === "full"
          ? "rounded-full"
          : radius === "sm"
          ? "rounded-sm"
          : radius === "md"
          ? "rounded-md"
          : "rounded-lg"
      );
    });
  });

  // loading state
  it("renders in loading state correctly", () => {
    const { container } = render(<Button isLoading>Loading Button</Button>);

    // check svg loading spinner is present
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "flex items-center justify-center gap-2.5 opacity-80"
    );
    expect(container.firstChild).toBeDisabled();
  });

  // with icon
  it("renders with icon correctly", () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    const { container } = render(
      <Button icon={<TestIcon />}>Button with Icon</Button>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "flex items-center justify-center gap-1.5 pr-5"
    );
  });

  // custom className
  it("applies custom className correctly", () => {
    const { container } = render(
      <Button className="custom-class">Custom Button</Button>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  // handles click events
  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable Button</Button>);
    await user.click(screen.getByText("Clickable Button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // no trigger in disabled state
  it("should not trigger click when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    await user.click(screen.getByText("Disabled Button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // no trigger in loading state
  it("should not trigger click when loading", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} isLoading>
        Loading Button
      </Button>
    );
    await user.click(screen.getByText("Loading Button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
