import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api";
import { makeLeader } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render";
import LeaderGrid from "./LeaderGrid";
import { getLeaders } from "./leaders";

vi.mock("./leaders", () => ({ getLeaders: vi.fn() }));

const getLeadersMock = vi.mocked(getLeaders);

async function renderGrid(params: Record<string, string | string[] | undefined> = {}) {
  const ui = await LeaderGrid({ searchParams: Promise.resolve(params) });

  return renderWithProviders(ui);
}

describe("LeaderGrid", () => {
  beforeEach(() => {
    getLeadersMock.mockReset();
  });

  it("muestra las cartas y el total en plural", async () => {
    getLeadersMock.mockResolvedValue({
      items      : [makeLeader({ externalId: "a", name: "Uno", cardCode: "A" }), makeLeader({ externalId: "b", name: "Dos", cardCode: "B" })],
      total      : 2,
      page       : 1,
      totalPages : 1,
    });

    await renderGrid();

    expect(screen.getByText("2 cartas")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Uno (A)" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Dos (B)" })).toBeInTheDocument();
  });

  it("usa singular con una carta", async () => {
    getLeadersMock.mockResolvedValue({ items: [makeLeader()], total: 1, page: 1, totalPages: 1 });

    await renderGrid();

    expect(screen.getByText("1 carta")).toBeInTheDocument();
  });

  it("pasa filtros a getLeaders y toma el primer valor de arrays", async () => {
    getLeadersMock.mockResolvedValue({ items: [makeLeader()], total: 1, page: 1, totalPages: 1 });

    await renderGrid({ q: ["luffy", "zoro"], color: "Red", page: "2" });

    expect(getLeadersMock).toHaveBeenCalledWith({ q: "luffy", color: "Red", page: "2" });
  });

  it("muestra la paginación cuando hay varias páginas", async () => {
    getLeadersMock.mockResolvedValue({ items: [makeLeader()], total: 40, page: 1, totalPages: 2 });

    await renderGrid({ q: "luffy" });

    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute("href", "/deck-builder?q=luffy&page=2");
  });

  it("avisa cuando no hay resultados", async () => {
    getLeadersMock.mockResolvedValue({ items: [], total: 0, page: 1, totalPages: 0 });

    await renderGrid();

    expect(screen.getByText("No hay líderes con esos filtros.")).toBeInTheDocument();
  });

  it("muestra error si la API falla con ApiError", async () => {
    getLeadersMock.mockRejectedValue(new ApiError(500, null));

    await renderGrid();

    expect(screen.getByText("No se pudieron cargar los líderes.")).toBeInTheDocument();
  });

  it("propaga errores que no son ApiError", async () => {
    getLeadersMock.mockRejectedValue(new TypeError("red caída"));

    await expect(renderGrid()).rejects.toThrow("red caída");
  });
});
