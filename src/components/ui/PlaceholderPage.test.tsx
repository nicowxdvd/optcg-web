import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlaceholderPage from "./PlaceholderPage";

describe("PlaceholderPage", () => {
  it("muestra el título", () => {
    render(<PlaceholderPage title="Hola" />);

    expect(screen.getByRole("heading", { name: "Hola" })).toBeInTheDocument();
    expect(screen.queryByText("desc")).not.toBeInTheDocument();
  });

  it("muestra la descripción si existe", () => {
    render(<PlaceholderPage title="Hola" description="desc" />);

    expect(screen.getByText("desc")).toBeInTheDocument();
  });
});
