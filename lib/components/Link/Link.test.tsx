import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

// Mock icon to avoid dependency issues
vi.mock("@/components/icons", () => ({
  LinkIcon: () => <svg data-testid="link-icon" />,
}));

describe("Component: Link", () => {
  it("renders with default props", () => {
    render(<Link href="/test">Test Link</Link>);
    const link = screen.getByRole("link", { name: /test link/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders as external link with correct target and rel", () => {
    render(
      <Link href="https://example.com" isExternal>
        External Link
      </Link>
    );
    const link = screen.getByRole("link", { name: /external link/i });

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the default link icon when showLinkIcon is true", () => {
    render(
      <Link href="/icon" showLinkIcon>
        With Icon
      </Link>
    );
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
  });

  it("renders a custom icon when provided", () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(
      <Link href="/custom" showLinkIcon customIcon={<CustomIcon />}>
        Custom Icon Link
      </Link>
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("merges custom className correctly", () => {
    const { container } = render(
      <Link href="/custom-class" className="text-red-500">
        Custom Class
      </Link>
    );
    expect(container.firstChild).toHaveClass("text-red-500");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Link href="/click" onClick={handleClick}>
        Clickable Link
      </Link>
    );
    await user.click(screen.getByText("Clickable Link"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
