import { render } from "@testing-library/react";
import { Button } from "./Button";

describe(`Component: ${Button.name}`, () => {
  it("should render", () => {
    const { container } = render(<Button>My first button</Button>);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="undefined px-3 py-2 bg-green-300 rounded-md"
        >
          My first button
        </button>
      </div>
    `);
  });
});
