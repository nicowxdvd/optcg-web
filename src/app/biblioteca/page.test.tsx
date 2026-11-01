import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BibliotecaPage from "./page";

describe("BibliotecaPage", () => {
  it("renderiza el placeholder", () => {
    render(<BibliotecaPage />);

    expect(screen.getByRole("heading", { name: "..." })).toBeInTheDocument();
  });
});
