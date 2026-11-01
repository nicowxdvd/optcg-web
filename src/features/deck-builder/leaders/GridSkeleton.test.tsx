import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GridSkeleton from "./GridSkeleton";

describe("GridSkeleton", () => {
  it("renderiza 20 placeholders", () => {
    const { container } = render(<GridSkeleton />);

    expect(container.firstElementChild?.children).toHaveLength(20);
  });
});
