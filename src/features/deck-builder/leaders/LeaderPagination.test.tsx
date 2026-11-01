import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LeaderPagination from "./LeaderPagination";

describe("LeaderPagination", () => {
  it("no renderiza con una sola página", () => {
    const { container } = render(<LeaderPagination page={1} totalPages={1} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("en la primera página deshabilita Anterior y enlaza Siguiente", () => {
    render(<LeaderPagination page={1} totalPages={3} />);

    expect(screen.getByText("Anterior")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute("href", "/deck-builder?page=2");
    expect(screen.getByText("Página 1 de 3")).toBeInTheDocument();
  });

  it("en la última página deshabilita Siguiente y enlaza Anterior", () => {
    render(<LeaderPagination page={3} totalPages={3} />);

    expect(screen.getByText("Siguiente")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute("href", "/deck-builder?page=2");
  });

  it("conserva q y color en los enlaces", () => {
    render(<LeaderPagination page={2} totalPages={3} q="luffy" color="Red" />);

    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute("href", "/deck-builder?q=luffy&color=Red&page=1");
    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute("href", "/deck-builder?q=luffy&color=Red&page=3");
  });
});
