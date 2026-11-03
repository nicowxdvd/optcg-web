import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeCard } from "@/test/fixtures";
import type { Card } from "@/types/card";
import type { Paginated } from "@/types/leader";
import { getCards } from "../cards/cards";
import { DeckProvider } from "../deck/DeckContext";
import CardCatalog from "./CardCatalog";

vi.mock("../cards/cards", () => ({ getCards: vi.fn() }));

const get = vi.mocked(getCards);

const wrapper = ({ children }: { children: ReactNode }) => <DeckProvider>{children}</DeckProvider>;

const pageOf = (items: Card[], overrides: Partial<Paginated<Card>> = {}): Paginated<Card> => ({ items, total: items.length, page: 1, totalPages: 1, ...overrides });

const nami = () => makeCard({ externalId: "c2", cardCode: "OP01-003", name: "Nami" });

describe("CardCatalog", () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue(pageOf([makeCard()]));
  });

  it("pide las cartas del color recibido", async () => {
    render(<CardCatalog color="Red/Green" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });

    expect(get).toHaveBeenCalledWith({ color: "Red/Green", page: 1, q: "" });
  });

  it("muestra el skeleton mientras carga", () => {
    get.mockReturnValue(new Promise(() => {}));

    const { container } = render(<CardCatalog color="Red" />, { wrapper });

    expect(container.lastElementChild?.children).toHaveLength(20);
  });

  it("muestra la imagen de cada carta", async () => {
    get.mockResolvedValue(pageOf([makeCard(), nami()]));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByRole("img", { name: "Zoro (OP01-002)" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Nami (OP01-003)" })).toBeInTheDocument();
  });

  it("cuenta una carta en singular", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByText("1 carta")).toBeInTheDocument();
  });

  it("cuenta varias cartas en plural", async () => {
    get.mockResolvedValue(pageOf([makeCard(), nami()]));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByText("2 cartas")).toBeInTheDocument();
  });

  it("avisa si no hay cartas", async () => {
    get.mockResolvedValue(pageOf([]));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByText("No hay cartas para este líder.")).toBeInTheDocument();
  });

  it("muestra error si falla la carga", async () => {
    get.mockRejectedValue(new Error("fallo"));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByText("No se pudieron cargar las cartas.")).toBeInTheDocument();
  });

  it("oculta la paginación con una sola página", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });

    expect(screen.queryByRole("navigation", { name: "Paginación" })).not.toBeInTheDocument();
  });

  it("muestra la página actual y el total", async () => {
    get.mockResolvedValue(pageOf([makeCard()], { totalPages: 3 }));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByText("Página 1 de 3")).toBeInTheDocument();
  });

  it("deshabilita Anterior en la primera página", async () => {
    get.mockResolvedValue(pageOf([makeCard()], { totalPages: 3 }));

    render(<CardCatalog color="Red" />, { wrapper });

    expect(await screen.findByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeEnabled();
  });

  it("avanza a la página siguiente", async () => {
    get.mockImplementation(async ({ page }) => pageOf([makeCard()], { page: page ?? 1, totalPages: 3 }));

    render(<CardCatalog color="Red" />, { wrapper });

    fireEvent.click(await screen.findByRole("button", { name: "Siguiente" }));

    expect(await screen.findByText("Página 2 de 3")).toBeInTheDocument();
    expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 2, q: "" });
  });

  it("vuelve a la página anterior", async () => {
    get.mockImplementation(async ({ page }) => pageOf([makeCard()], { page: page ?? 1, totalPages: 3 }));

    render(<CardCatalog color="Red" />, { wrapper });

    fireEvent.click(await screen.findByRole("button", { name: "Siguiente" }));
    fireEvent.click(await screen.findByRole("button", { name: "Anterior" }));

    expect(await screen.findByText("Página 1 de 3")).toBeInTheDocument();
    expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "" });
  });

  it("deshabilita Siguiente en la última página", async () => {
    get.mockImplementation(async ({ page }) => pageOf([makeCard()], { page: page ?? 1, totalPages: 2 }));

    render(<CardCatalog color="Red" />, { wrapper });

    fireEvent.click(await screen.findByRole("button", { name: "Siguiente" }));

    await screen.findByText("Página 2 de 2");

    expect(screen.getByRole("button", { name: "Siguiente" })).toBeDisabled();
  });

  it("muestra los filtros", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });

    expect(screen.getByRole("searchbox", { name: "Buscar carta" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Tipo" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Coste" })).toBeInTheDocument();
  });

  it("pide las cartas filtradas por tipo", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "EVENT" } });

    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "", type: "EVENT" }));
  });

  it("pide las cartas filtradas por coste", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("combobox", { name: "Coste" }), { target: { value: "0" } });

    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "", cost: 0 }));
  });

  it("pide las cartas filtradas por texto tras el debounce", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar carta" }), { target: { value: "  nami " } });

    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "nami" }));
  });

  it("combina varios filtros", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "STAGE" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Coste" }), { target: { value: "3" } });

    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "", type: "STAGE", cost: 3 }));
  });

  it("vuelve a la primera página al cambiar un filtro", async () => {
    get.mockImplementation(async ({ page }) => pageOf([makeCard()], { page: page ?? 1, totalPages: 3 }));

    render(<CardCatalog color="Red" />, { wrapper });

    fireEvent.click(await screen.findByRole("button", { name: "Siguiente" }));
    await screen.findByText("Página 2 de 3");

    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "EVENT" } });

    expect(await screen.findByText("Página 1 de 3")).toBeInTheDocument();
    expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "", type: "EVENT" });
  });

  it("avisa si ningún resultado coincide con los filtros", async () => {
    get.mockResolvedValueOnce(pageOf([makeCard()]));
    get.mockResolvedValue(pageOf([]));

    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "EVENT" } });

    expect(await screen.findByText("No hay cartas con estos filtros.")).toBeInTheDocument();
    expect(screen.queryByText("No hay cartas para este líder.")).not.toBeInTheDocument();
  });

  it("mantiene los filtros visibles cuando no hay resultados", async () => {
    get.mockResolvedValue(pageOf([]));

    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByText("No hay cartas para este líder.");

    expect(screen.getByRole("combobox", { name: "Tipo" })).toBeInTheDocument();
  });

  it("mantiene los filtros visibles cuando falla la carga", async () => {
    get.mockRejectedValue(new Error("fallo"));

    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByText("No se pudieron cargar las cartas.");

    expect(screen.getByRole("combobox", { name: "Tipo" })).toBeInTheDocument();
  });

  it("Limpiar quita los filtros y vuelve a pedir sin ellos", async () => {
    render(<CardCatalog color="Red" />, { wrapper });

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });
    fireEvent.change(screen.getByRole("combobox", { name: "Tipo" }), { target: { value: "EVENT" } });
    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "", type: "EVENT" }));

    fireEvent.click(screen.getByRole("button", { name: "Limpiar (1)" }));

    await waitFor(() => expect(get).toHaveBeenLastCalledWith({ color: "Red", page: 1, q: "" }));
    expect(screen.getByRole("combobox", { name: "Tipo" })).toHaveValue("");
  });

  it("descarta la respuesta de un color anterior", async () => {
    let resolveRed!: (value: Paginated<Card>) => void;

    get.mockReturnValueOnce(new Promise<Paginated<Card>>(resolve => { resolveRed = resolve; }));
    get.mockResolvedValueOnce(pageOf([nami()]));

    const { rerender } = render(<CardCatalog color="Red" />, { wrapper });

    rerender(<CardCatalog color="Green" />);

    await screen.findByRole("img", { name: "Nami (OP01-003)" });
    await act(async () => { resolveRed(pageOf([makeCard()])); });

    expect(screen.queryByRole("img", { name: "Zoro (OP01-002)" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Nami (OP01-003)" })).toBeInTheDocument();
  });

  it("descarta el error de un color anterior", async () => {
    let rejectRed!: (reason: unknown) => void;

    get.mockReturnValueOnce(new Promise<Paginated<Card>>((_, reject) => { rejectRed = reject; }));
    get.mockResolvedValueOnce(pageOf([nami()]));

    const { rerender } = render(<CardCatalog color="Red" />, { wrapper });

    rerender(<CardCatalog color="Green" />);

    await screen.findByRole("img", { name: "Nami (OP01-003)" });
    await act(async () => { rejectRed(new Error("fallo")); });

    expect(screen.queryByText("No se pudieron cargar las cartas.")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Nami (OP01-003)" })).toBeInTheDocument();
  });
});
