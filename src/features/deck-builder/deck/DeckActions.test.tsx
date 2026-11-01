import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckActions from "./DeckActions";

describe("DeckActions", () => {
  it("sin líder deshabilita guardar, compartir y artes", () => {
    renderWithProviders(<DeckActions />);

    expect(screen.getByRole("button", { name: "Guardar mazo" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Compartir" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Artes" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Importar / Exportar" })).toBeEnabled();
  });

  it("con líder habilita artes", () => {
    renderWithProviders(<DeckActions />, deckStateOf([], { leader: makeLeader() }));

    expect(screen.getByRole("button", { name: "Artes" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Guardar mazo" })).toBeDisabled();
  });

  it("con mazo válido habilita guardar", () => {
    const entries = [
      ...Array.from({ length: 12 }, (_, i) => ({ card: makeCard({ cardCode: `C-${i}` }), qty: 4 })),
      { card: makeCard({ cardCode: "C-X" }), qty: 2 },
    ];

    renderWithProviders(<DeckActions />, deckStateOf(entries, { leader: makeLeader() }));

    expect(screen.getByRole("button", { name: "Guardar mazo" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Compartir" })).toBeDisabled();
  });
});
