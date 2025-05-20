import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { Card } from "./Card";

// Mock cn utility to include class names in tests
vi.mock("@/lib/utils/shared", async () => {
  const actual = await vi.importActual<any>("@/lib/utils/shared");
  return {
    ...actual,
    cn: (...inputs: string[]) => inputs.filter(Boolean).join(" "),
  };
});

describe(`Component ${Card.name}`, () => {
  it("should render with default props", () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByText("Default Card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "relative w-full transition-all duration-200 overflow-hidden rounded-2xl"
    );
  });

  it("should apply correct radius variant", () => {
    render(<Card radius="sm">Small Radius</Card>);
    expect(screen.getByText("Small Radius")).toHaveClass("rounded-lg");
  });

  it("should render with hoverable and clickable styles", () => {
    render(
      <Card isHoverable isClickable>
        Interactive Card
      </Card>
    );
    const card = screen.getByText("Interactive Card");
    expect(card).toHaveClass("hover:shadow-lg cursor-pointer");
    expect(card).toHaveAttribute("role", "button");
    expect(card).toHaveAttribute("tabindex", "0");
    // expect(card).toHaveAttribute("aria-pressed", "false");
  });

  it("should render with aria-label when provided", () => {
    render(<Card ariaLabel="test label">Labeled Card</Card>);
    const card = screen.getByLabelText("test label");
    expect(card).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Card isClickable onClick={handleClick}>
        Clickable Card
      </Card>
    );
    fireEvent.click(screen.getByText("Clickable Card"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("should call onClick when pressing Enter or Space", () => {
    const handleClick = vi.fn();
    render(
      <Card isClickable onClick={handleClick}>
        Key Card
      </Card>
    );
    const card = screen.getByText("Key Card");

    fireEvent.keyDown(card, { key: "Enter" });
    fireEvent.keyDown(card, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("should not be focusable or clickable by keyboard if isClickable is false", () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Non-clickable Card</Card>);
    const card = screen.getByText("Non-clickable Card");
    fireEvent.keyDown(card, { key: "Enter" });
    fireEvent.click(card);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
