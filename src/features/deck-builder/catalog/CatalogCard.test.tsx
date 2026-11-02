import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import CatalogCard from "./CatalogCard";

const card = makeCard();

const ADD_NAME = "Añadir Zoro (OP01-002) al mazo";

function renderCard(qty = 0, others: { card: ReturnType<typeof makeCard>; qty: number }[] = []) {
  const entries = qty > 0 ? [{ card, qty }, ...others] : others;

  return renderWithProviders(<CatalogCard card={card} />, deckStateOf(entries, { leader: makeLeader() }));
}

describe("CatalogCard", () => {
  it("muestra la imagen de la carta", () => {
    renderCard();

    expect(screen.getByRole("img", { name: "Zoro (OP01-002)" })).toBeInTheDocument();
  });

  it("no muestra el badge si la carta no está en el mazo", () => {
    renderCard();

    expect(screen.queryByText(/^×/)).not.toBeInTheDocument();
  });

  it("muestra las copias que ya hay en el mazo", () => {
    renderCard(2);

    expect(screen.getByText("×2")).toBeInTheDocument();
  });

  it("añade la carta al mazo al hacer click", async () => {
    renderCard();

    await userEvent.click(screen.getByRole("button", { name: ADD_NAME }));

    expect(screen.getByText("×1")).toBeInTheDocument();
  });

  it("suma una copia en cada click", async () => {
    renderCard(2);

    await userEvent.click(screen.getByRole("button", { name: ADD_NAME }));

    expect(screen.getByText("×3")).toBeInTheDocument();
  });

  it("deshabilita el botón al llegar a 4 copias", () => {
    renderCard(4);

    expect(screen.getByRole("button", { name: ADD_NAME })).toBeDisabled();
  });

  it("deshabilita el botón con el mazo lleno", () => {
    const others = Array.from({ length: 12 }, (_, i) => ({ card: makeCard({ cardCode: `C-${i}` }), qty: 4 }));

    renderCard(2, others);

    expect(screen.getByRole("button", { name: ADD_NAME })).toBeDisabled();
  });

  it("no añade la carta si su color no es el del líder", async () => {
    renderWithProviders(<CatalogCard card={makeCard({ color: "Blue" })} />, deckStateOf([], { leader: makeLeader({ color: "Red" }) }));

    await userEvent.click(screen.getByRole("button", { name: ADD_NAME }));

    expect(screen.queryByText(/^×/)).not.toBeInTheDocument();
  });
});
