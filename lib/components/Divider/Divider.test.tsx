import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Divider } from "./Divider";

// Mock cn for class merging clarity (optional)
vi.mock("@/lib/utils/shared", () => ({
  cn: (...inputs: string[]) => inputs.filter(Boolean).join(" "),
}));

describe(`Component: ${Divider.name}`, () => {
  it("renders with default props (horizontal)", () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild as HTMLDivElement;

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
    expect(divider).toHaveClass(
      "shrink-0",
      "bg-stone-300",
      "h-px",
      "w-full",
      "my-4"
    );
  });

  it("renders with vertical orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const divider = container.firstChild as HTMLDivElement;

    expect(divider).toHaveAttribute("aria-orientation", "vertical");
    expect(divider).toHaveClass(
      "shrink-0",
      "bg-stone-300",
      "w-px",
      "mx-4",
      "h-6"
    );
  });

  it("merges custom className", () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards ref to the div", () => {
    const ref = vi.fn();
    render(<Divider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Divider />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
