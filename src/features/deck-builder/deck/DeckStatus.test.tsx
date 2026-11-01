import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckStatus from "./DeckStatus";

describe("DeckStatus", () => {
  it("mazo vacío es inválido con 0/50", () => {
    renderWithProviders(<DeckStatus />);

    expect(screen.getByText("0/50")).toBeInTheDocument();
    expect(screen.getByText("Mazo inválido")).toBeInTheDocument();
  });

  it("mazo completo es válido", () => {
    const entries = [
      ...Array.from({ length: 12 }, (_, i) => ({ card: makeCard({ cardCode: `C-${i}` }), qty: 4 })),
      { card: makeCard({ cardCode: "C-X" }), qty: 2 },
    ];

    renderWithProviders(<DeckStatus />, deckStateOf(entries, { leader: makeLeader() }));

    expect(screen.getByText("50/50")).toBeInTheDocument();
    expect(screen.getByText("Mazo válido")).toBeInTheDocument();
  });
});
