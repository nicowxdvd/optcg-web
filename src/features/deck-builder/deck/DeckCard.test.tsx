import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { deckStateOf, renderWithProviders } from "@/test/render";
import DeckCard from "./DeckCard";
import DeckList from "./DeckList";

const card = makeCard();

function renderCard(qty: number, others: { card: ReturnType<typeof makeCard>; qty: number }[] = []) {
  const entry = { card, qty };

  return renderWithProviders(
    <ul><DeckCard entry={entry} /></ul>,
    deckStateOf([entry, ...others], { leader: makeLeader() }),
  );
}

describe("DeckCard", () => {
  it("muestra imagen, nombre y cantidad", () => {
    renderCard(2);

    expect(screen.getByRole("img", { name: "Zoro (OP01-002)" })).toBeInTheDocument();
    expect(screen.getByText("×2")).toBeInTheDocument();
  });

  it("sin copias extra no dibuja capas", () => {
    const { container } = renderCard(1);

    expect(container.querySelectorAll("span[aria-hidden]")).toHaveLength(0);
  });

  it.each([[2, 1], [3, 2], [4, 2]])("con %i copias dibuja %i capas", (qty, layers) => {
    const { container } = renderCard(qty);

    expect(container.querySelectorAll("span[aria-hidden]")).toHaveLength(layers);
  });

  it("quita una copia al pulsar menos", async () => {
    renderWithProviders(<DeckList />, deckStateOf([{ card, qty: 2 }], { leader: makeLeader() }));

    await userEvent.click(screen.getByRole("button", { name: "Quitar una copia de Zoro" }));

    expect(screen.getByText("×1")).toBeInTheDocument();
  });

  it("añade una copia al pulsar más", async () => {
    renderWithProviders(<DeckList />, deckStateOf([{ card, qty: 2 }], { leader: makeLeader() }));

    await userEvent.click(screen.getByRole("button", { name: "Añadir una copia de Zoro" }));

    expect(screen.getByText("×3")).toBeInTheDocument();
  });

  it("deshabilita añadir al llegar a 4 copias", () => {
    renderCard(4);

    expect(screen.getByRole("button", { name: "Añadir una copia de Zoro" })).toBeDisabled();
  });

  it("deshabilita añadir con el mazo lleno", () => {
    const others = Array.from({ length: 12 }, (_, i) => ({ card: makeCard({ cardCode: `C-${i}` }), qty: 4 }));

    renderCard(2, others);

    expect(screen.getByRole("button", { name: "Añadir una copia de Zoro" })).toBeDisabled();
  });
});
