import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NavLinks from "./NavLinks";

let pathname = "/";

vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("NavLinks", () => {
  beforeEach(() => {
    pathname = "/";
  });

  it("muestra los tres enlaces sin ninguno activo en la home", () => {
    render(<NavLinks />);

    expect(screen.getByRole("link", { name: "Biblioteca" })).toHaveAttribute("href", "/biblioteca");
    expect(screen.getByRole("link", { name: "Ranking" })).toHaveAttribute("href", "/ranking");
    expect(screen.getByRole("link", { name: "Deck Builder" })).toHaveAttribute("href", "/deck-builder");
    expect(document.querySelector("[aria-current]")).toBeNull();
  });

  it("marca activo el enlace de la ruta exacta", () => {
    pathname = "/ranking";
    render(<NavLinks />);

    expect(screen.getByRole("link", { name: "Ranking" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Biblioteca" })).not.toHaveAttribute("aria-current");
  });

  it("marca activo el enlace en subrutas", () => {
    pathname = "/deck-builder/nuevo";
    render(<NavLinks />);

    expect(screen.getByRole("link", { name: "Deck Builder" })).toHaveAttribute("aria-current", "page");
  });
});
