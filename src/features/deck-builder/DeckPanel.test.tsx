import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckPanel from "./DeckPanel";

describe("DeckPanel", () => {
  it("compone toolbar, acciones, estado, slot y lista", () => {
    renderWithProviders(<DeckPanel />, deckStateOf([{ card: makeCard(), qty: 1 }], { leader: makeLeader() }));

    expect(screen.getByRole("textbox", { name: "Nombre del mazo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar mazo" })).toBeInTheDocument();
    expect(screen.getByText("1/50")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Limpiar todo" })).toBeInTheDocument();
    expect(screen.getByText("El mazo tiene 1/50 cartas.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quitar líder Luffy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PERSONAJES · 1" })).toBeInTheDocument();
  });
});
