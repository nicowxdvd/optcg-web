import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeCard } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import ClearDeckButton from "./ClearDeckButton";
import DeckList from "./DeckList";

describe("ClearDeckButton", () => {
  it("no renderiza con mazo vacío", () => {
    renderWithProviders(<ClearDeckButton />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("limpia las cartas al hacer clic", async () => {
    renderWithProviders(<><ClearDeckButton /><DeckList /></>, deckStateOf([{ card: makeCard(), qty: 1 }]));

    expect(screen.getByRole("img", { name: "Zoro (OP01-002)" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Limpiar todo" }));

    expect(screen.queryByRole("button", { name: "Limpiar todo" })).not.toBeInTheDocument();
    expect(screen.getByText(/Aún no hay cartas/)).toBeInTheDocument();
  });
});
