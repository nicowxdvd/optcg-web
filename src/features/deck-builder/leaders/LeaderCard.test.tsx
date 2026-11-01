import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeLeader } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render";
import CardPreview from "../card-preview/CardPreview";
import LeaderSlot from "../deck/LeaderSlot";
import LeaderCard from "./LeaderCard";

const leader = makeLeader();

function setup() {
  renderWithProviders(<><LeaderCard leader={leader} /><CardPreview /><LeaderSlot /></>);

  return screen.getAllByRole("img", { name: "Luffy (OP01-001)" })[0].parentElement as HTMLElement;
}

describe("LeaderCard", () => {
  it("muestra la imagen del líder", () => {
    setup();

    expect(screen.getByRole("img", { name: "Luffy (OP01-001)" })).toBeInTheDocument();
  });

  it("muestra preview al entrar con mouse y la oculta al salir", () => {
    const card = setup();

    fireEvent.pointerEnter(card, { pointerType: "mouse" });
    expect(screen.getAllByRole("img", { name: "Luffy (OP01-001)" })).toHaveLength(2);

    fireEvent.pointerLeave(card);
    expect(screen.getAllByRole("img", { name: "Luffy (OP01-001)" })).toHaveLength(1);
  });

  it("no muestra preview con puntero táctil", () => {
    const card = setup();

    fireEvent.pointerEnter(card, { pointerType: "touch" });

    expect(screen.getAllByRole("img", { name: "Luffy (OP01-001)" })).toHaveLength(1);
  });

  it("elige el líder al hacer clic", () => {
    const card = setup();

    fireEvent.click(card);

    expect(screen.getByRole("button", { name: "Quitar líder Luffy" })).toBeInTheDocument();
  });
});
