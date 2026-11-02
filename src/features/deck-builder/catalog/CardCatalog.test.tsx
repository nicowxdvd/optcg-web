import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeCard } from "@/test/fixtures";
import type { Card } from "@/types/card";
import type { Paginated } from "@/types/leader";
import { getCards } from "../cards/cards";
import CardCatalog from "./CardCatalog";

vi.mock("../cards/cards", () => ({ getCards: vi.fn() }));

const get = vi.mocked(getCards);

const pageOf = (items: Card[], overrides: Partial<Paginated<Card>> = {}): Paginated<Card> => ({ items, total: items.length, page: 1, totalPages: 1, ...overrides });

const nami = () => makeCard({ externalId: "c2", cardCode: "OP01-003", name: "Nami" });

describe("CardCatalog", () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue(pageOf([makeCard()]));
  });

  it("pide las cartas del color recibido", async () => {
    render(<CardCatalog color="Red/Green" />);

    await screen.findByRole("img", { name: "Zoro (OP01-002)" });

    expect(get).toHaveBeenCalledWith({ color: "Red/Green", page: 1 });
  });

  it("muestra el skeleton mientras carga", () => {
    get.mockReturnValue(new Promise(() => {}));

    const { container } = render(<CardCatalog color="Red" />);

    expect(container.firstElementChild?.children).toHaveLength(20);
  });

  it("muestra la imagen de cada carta", async () => {
    get.mockResolvedValue(pageOf([makeCard(), nami()]));

    render(<CardCatalog color="Red" />);

    expect(await screen.findByRole("img", { name: "Zoro (OP01-002)" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Nami (OP01-003)" })).toBeInTheDocument();
  });

  it("cuenta una carta en singular", async () => {
    render(<CardCatalog color="Red" />);

    expect(await screen.findByText("1 carta")).toBeInTheDocument();
  });

  it("cuenta varias cartas en plural", async () => {
    get.mockResolvedValue(pageOf([makeCard(), nami()]));

    render(<CardCatalog color="Red" />);

    expect(await screen.findByText("2 cartas")).toBeInTheDocument();
  });

  it("avisa si no hay cartas", async () => {
    get.mockResolvedValue(pageOf([]));

    render(<CardCatalog color="Red" />);

    expect(await screen.findByText("No hay cartas para este líder.")).toBeInTheDocument();
  });

  it("muestra error si falla la carga", async () => {
    get.mockRejectedValue(new Error("fallo"));

    render(<CardCatalog color="Red" />);

    expect(await screen.findByText("No se pudieron cargar las cartas.")).toBeInTheDocument();
  });
});
