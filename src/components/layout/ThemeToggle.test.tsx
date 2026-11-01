import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it("pasa a claro cuando no hay tema definido y lo guarda", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Cambiar tema" }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("vuelve a oscuro desde claro", () => {
    document.documentElement.dataset.theme = "light";
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Cambiar tema" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
