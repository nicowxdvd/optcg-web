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
});
