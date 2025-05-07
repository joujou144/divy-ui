import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Image } from "./Image";

// Mock the cn utility to simplify classNames in tests
vi.mock("@/lib/utils", () => ({
  cn: (...inputs: string[]) => inputs.filter(Boolean).join(" "),
}));

describe(`Component: ${Image.name}`, () => {
  it("renders with required props", () => {
    render(<Image alt="Test Image" src="test.jpg" width={300} height={200} />);
    const img = screen.getByAltText("Test Image") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("test.jpg");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("applies zoom class when isZoomed is true", () => {
    render(
      <Image
        alt="Zoom Image"
        src="zoom.jpg"
        isZoomed
        width={300}
        height={200}
      />
    );
    const img = screen.getByAltText("Zoom Image");
    expect(img.className).toMatch(/hover:scale-110/);
  });

  it("applies rounded-xl class for md radius", () => {
    render(
      <Image
        alt="Rounded MD"
        src="rounded.jpg"
        radius="md"
        width={300}
        height={200}
      />
    );
    const wrapper = imgWrapper();
    expect(wrapper.className).toContain("rounded-xl");
  });

  it("applies rounded-2xl class for lg radius (default)", () => {
    render(
      <Image alt="Rounded LG" src="rounded-lg.jpg" width={300} height={200} />
    );
    const wrapper = imgWrapper();
    expect(wrapper.className).toContain("rounded-2xl");
  });

  it("uses fallbackSrc when image fails to load", () => {
    render(
      <Image
        alt="Broken"
        src="broken.jpg"
        fallbackSrc="fallback.jpg"
        width={300}
        height={200}
      />
    );
    const img = screen.getByAltText("Broken") as HTMLImageElement;

    // Simulate image load error
    fireEvent.error(img);

    expect(img.src).toContain("fallback.jpg");
  });
});

function imgWrapper(): HTMLDivElement {
  // Assumes <img /> is wrapped in a single container div
  const img = screen.getByRole("img");
  return img.parentElement as HTMLDivElement;
}
