import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckViolations from "./DeckViolations";

describe("DeckViolations", () => {
  it("lista violaciones de un mazo vacío", () => {
    renderWithProviders(<DeckViolations />);

    expect(screen.getByText("Elige un Líder.")).toBeInTheDocument();
    expect(screen.getByText("El mazo tiene 0/50 cartas.")).toBeInTheDocument();
  });

  it("no renderiza nada con mazo válido", () => {
    const entries = [
      ...Array.from({ length: 12 }, (_, i) => ({ card: makeCard({ cardCode: `C-${i}` }), qty: 4 })),
      { card: makeCard({ cardCode: "C-X" }), qty: 2 },
    ];

    renderWithProviders(<DeckViolations />, deckStateOf(entries, { leader: makeLeader() }));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
