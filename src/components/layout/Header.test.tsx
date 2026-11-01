import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header", () => {
  it("muestra logo, navegación, redes y selector de tema", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /OPlayTCG/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Biblioteca" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cambiar tema" })).toBeInTheDocument();
  });
});
