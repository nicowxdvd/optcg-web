import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import DeckToolbar from "./DeckToolbar";

describe("DeckToolbar", () => {
  it("muestra el input con placeholder y límite", () => {
    renderWithProviders(<DeckToolbar />);

    const input = screen.getByRole("textbox", { name: "Nombre del mazo" });

    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Mazo sin título");
    expect(input).toHaveAttribute("maxlength", "60");
  });

  it("actualiza el nombre al escribir", async () => {
    renderWithProviders(<DeckToolbar />);

    const input = screen.getByRole("textbox", { name: "Nombre del mazo" });

    await userEvent.type(input, "Mi mazo");

    expect(input).toHaveValue("Mi mazo");
  });
});
