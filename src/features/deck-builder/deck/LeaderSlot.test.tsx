import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import LeaderSlot from "./LeaderSlot";

describe("LeaderSlot", () => {
  it("pide elegir líder si no hay", () => {
    renderWithProviders(<LeaderSlot />);

    expect(screen.getByText("Elige un Líder.")).toBeInTheDocument();
  });

  it("muestra el líder y lo quita al hacer clic", async () => {
    renderWithProviders(<LeaderSlot />, deckStateOf([], { leader: makeLeader() }));

    expect(screen.getByRole("img", { name: "Luffy (OP01-001)" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Quitar líder Luffy" }));

    expect(screen.getByText("Elige un Líder.")).toBeInTheDocument();
  });
});
