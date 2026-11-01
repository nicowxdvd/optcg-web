import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CatalogPanel from "./CatalogPanel";

vi.mock("next/navigation", () => ({
  useRouter       : () => ({ replace: vi.fn() }),
  usePathname     : () => "/deck-builder",
  useSearchParams : () => new URLSearchParams(),
}));

vi.mock("./leaders/LeaderGrid", () => ({ default: () => <p>grilla</p> }));

describe("CatalogPanel", () => {
  it("compone encabezado, filtros y grilla", () => {
    render(<CatalogPanel searchParams={Promise.resolve({})} />);

    expect(screen.getByRole("heading", { name: "Elige un Líder para empezar a construir tu mazo." })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Buscar líder" })).toBeInTheDocument();
    expect(screen.getByText("grilla")).toBeInTheDocument();
  });
});
