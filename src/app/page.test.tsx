import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renderiza el contenedor vacío", () => {
    const { container } = render(<Home />);

    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
});
