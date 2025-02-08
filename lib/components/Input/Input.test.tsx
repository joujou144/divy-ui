import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { Input } from "./Input";

// Mock cn utility to have class names in tests
vi.mock("@/lib/utils", () => ({
  cn: (...inputs: string[]) => inputs.filter(Boolean).join(" "),
}));

describe(`Component ${Input.name}`, () => {
  // default props
  it("should rednder default props correctly", () => {
    const { container } = render(<Input type="text" label="Username" />);
    const input = container.querySelector("input");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "px-3",
      "pt-5",
      "pb-1",
      "h-14",
      "peer",
      "w-full",
      "text-sm",
      "font-light",
      "transition-all",
      "duration-200",
      "outline-none",
      "disabled:opacity-70",
      "disabled:text-opacity-60",
      "placeholder:text-gray-tint-400",
      "placeholder:text-sm",
      "placeholder:font-light"
    );
  });

  // style variants
  it("renders different style variants correctly", () => {
    const variants = ["flat", "bordered"] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <Input label="Username" type="text" variant={variant} />
      );
      const input = container.querySelector("input");

      expect(input).toBeInTheDocument();
      expect(input).toHaveClass(
        variant === "flat"
          ? "bg-gray-100 hover:bg-gray-tint-200 hover:focus-within:bg-gray-100 focus:border-transparent hover:disabled:bg-gray-100"
          : "bg-transparent ring-2 ring-gray-tint-200 focus-within:ring-gray-tint-500 hover:ring-gray-tint-400 hover:focus-within:ring-gray-tint-500 hover:disabled:ring-gray-tint-200 "
      );
    });
  });

  // radius variants
  it("renders different radius sizes correctly", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { container } = render(
        <Input label="Email" type="text" radius={size} />
      );
      const input = container.querySelector("input");

      expect(input).toBeInTheDocument();
      expect(input).toHaveClass(
        size === "md"
          ? "rounded-lg"
          : size === "lg"
          ? "rounded-xl"
          : "rounded-md"
      );
    });
  });

  // Tests for functionality and props of the label
  describe("Label functionality", () => {
    it("should not render when label prop is not provided", () => {
      render(<Input label="Username" type="text" />);
      const label = screen.queryByRole("label");

      expect(label).not.toBeInTheDocument();
    });

    it("should render label with correct text when label prop is provided", () => {
      render(<Input label="Username" type="text" />);
      const label = screen.getByText("Username");

      expect(label).toBeInTheDocument();
      expect(label?.tagName.toLowerCase()).toBe("label");
    });

    it("should render label with default center position with no placeholder", () => {
      render(<Input label="Username" type="text" />);
      const label = screen.getByText("Username");

      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("top-[1.25em]", "text-sm");
    });

    it("should render label styles correctly when label prop is provided", () => {
      render(<Input label="Email" type="text" />);
      const label = screen.getByText("Email");

      expect(label).toHaveClass(
        "absolute",
        "left-3",
        "transition-all",
        "duration-150",
        "bg-transparent",
        "text-gray-500",
        "peer-disabled:opacity-70",
        "pointer-events-none",
        "peer-focus:text-xs",
        "peer-focus:top-2",
        "peer-[:not(:placeholder-shown)]:top-2",
        "peer-[:not(:placeholder-shown)]:text-xs"
      );
    });

    it("should render label with top position when placeholder is provided", () => {
      render(
        <Input label="Username" type="text" placeholder="Your username" />
      );
      const label = screen.getByText("Username");

      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("top-2", "text-xs");
    });
  });
});
