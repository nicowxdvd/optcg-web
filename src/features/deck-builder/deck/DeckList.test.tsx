import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckList from "./DeckList";

describe("DeckList", () => {
  it("muestra mensaje con mazo vacío", () => {
    renderWithProviders(<DeckList />);

    expect(screen.getByText(/Aún no hay cartas/)).toBeInTheDocument();
  });

  it("agrupa por tipo con totales y omite grupos vacíos", () => {
    const entries = [
      { card: makeCard({ cardCode: "A", name: "Pj", type: "CHARACTER" }), qty: 3 },
      { card: makeCard({ cardCode: "B", name: "Ev", type: "EVENT" }), qty: 2 },
    ];

    renderWithProviders(<DeckList />, deckStateOf(entries, { leader: makeLeader() }));

    expect(screen.getByRole("heading", { name: "PERSONAJES · 3" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "EVENTOS · 2" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /ESCENARIOS/ })).not.toBeInTheDocument();
  });

  it("muestra escenarios", () => {
    const entries = [{ card: makeCard({ cardCode: "S", type: "STAGE" }), qty: 1 }];

    renderWithProviders(<DeckList />, deckStateOf(entries, { leader: makeLeader() }));

    expect(screen.getByRole("heading", { name: "ESCENARIOS · 1" })).toBeInTheDocument();
  });

  it("ordena por coste, luego por nombre, tratando coste nulo como 0", () => {
    const entries = [
      { card: makeCard({ cardCode: "A", name: "Beta",  cost: 3 }), qty: 1 },
      { card: makeCard({ cardCode: "B", name: "Zeta",  cost: 1 }), qty: 1 },
      { card: makeCard({ cardCode: "C", name: "Alfa",  cost: 1 }), qty: 1 },
      { card: makeCard({ cardCode: "D", name: "Nulo",  cost: null }), qty: 1 },
    ];

    renderWithProviders(<DeckList />, deckStateOf(entries, { leader: makeLeader() }));

    const names = within(screen.getByRole("list")).getAllByRole("img").map(img => img.getAttribute("alt"));

    expect(names).toEqual(["Nulo (D)", "Alfa (C)", "Zeta (B)", "Beta (A)"]);
  });

  it.each([
    ["coste nulo primero", [null, 2]],
    ["coste nulo último",  [2, null]],
  ])("ordena con %s", (_, costs) => {
    const entries = costs.map((cost, i) => ({ card: makeCard({ cardCode: `K${i}`, name: `N${i}`, cost }), qty: 1 }));

    renderWithProviders(<DeckList />, deckStateOf(entries, { leader: makeLeader() }));

    const codes = within(screen.getByRole("list")).getAllByRole("img").map(img => img.getAttribute("alt"));

    expect(codes).toEqual(costs[0] === null ? ["N0 (K0)", "N1 (K1)"] : ["N1 (K1)", "N0 (K0)"]);
  });
});
