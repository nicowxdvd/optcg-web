import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { makeCard, makeLeader } from "@/test/fixtures";
import { DeckProvider, useDeck } from "./DeckContext";

const wrapper = ({ children }: { children: ReactNode }) => <DeckProvider>{children}</DeckProvider>;

function setup() {
  return renderHook(() => useDeck(), { wrapper });
}

describe("DeckContext", () => {
  it("empieza vacío", () => {
    const { result } = setup();

    expect(result.current.leader).toBeNull();
    expect(result.current.name).toBe("");
    expect(result.current.cards).toEqual({});
  });

  it("setLeader fija el líder y vacía las cartas", () => {
    const { result } = setup();
    const leader     = makeLeader();

    act(() => result.current.setLeader(leader));
    act(() => result.current.addCard(makeCard()));
    expect(Object.keys(result.current.cards)).toHaveLength(1);

    act(() => result.current.setLeader(makeLeader({ cardCode: "OP02-001" })));
    expect(result.current.leader?.cardCode).toBe("OP02-001");
    expect(result.current.cards).toEqual({});
  });

  it("setName cambia el nombre", () => {
    const { result } = setup();

    act(() => result.current.setName("Mi mazo"));

    expect(result.current.name).toBe("Mi mazo");
  });

  describe("addCard", () => {
    it("no agrega sin líder", () => {
      const { result } = setup();

      act(() => result.current.addCard(makeCard()));

      expect(result.current.cards).toEqual({});
    });

    it("agrega y suma copias", () => {
      const { result } = setup();
      const card       = makeCard();

      act(() => result.current.setLeader(makeLeader()));
      act(() => result.current.addCard(card));
      act(() => result.current.addCard(card));

      expect(result.current.cards[card.cardCode]).toEqual({ card, qty: 2 });
    });

    it("rechaza cartas de otro color", () => {
      const { result } = setup();

      act(() => result.current.setLeader(makeLeader({ color: "Red" })));
      act(() => result.current.addCard(makeCard({ color: "Blue" })));

      expect(result.current.cards).toEqual({});
    });

    it("acepta color compartido con líder multicolor", () => {
      const { result } = setup();

      act(() => result.current.setLeader(makeLeader({ color: "Red/Green" })));
      act(() => result.current.addCard(makeCard({ color: "Green" })));

      expect(Object.keys(result.current.cards)).toHaveLength(1);
    });

    it("limita a 4 copias", () => {
      const { result } = setup();
      const card       = makeCard();

      act(() => result.current.setLeader(makeLeader()));

      for (let i = 0; i < 6; i++)
        act(() => result.current.addCard(card));

      expect(result.current.cards[card.cardCode].qty).toBe(4);
    });

    it("limita el mazo a 50 cartas", () => {
      const { result } = setup();

      act(() => result.current.setLeader(makeLeader()));

      for (let i = 0; i < 13; i++)
        for (let j = 0; j < 4; j++)
          act(() => result.current.addCard(makeCard({ cardCode: `C-${i}` })));

      const total = Object.values(result.current.cards).reduce((sum, { qty }) => sum + qty, 0);

      expect(total).toBe(50);
    });
  });

  describe("removeCard", () => {
    it("ignora cartas que no están", () => {
      const { result } = setup();

      act(() => result.current.setLeader(makeLeader()));
      act(() => result.current.removeCard("NOPE"));

      expect(result.current.cards).toEqual({});
    });

    it("resta una copia", () => {
      const { result } = setup();
      const card       = makeCard();

      act(() => result.current.setLeader(makeLeader()));
      act(() => result.current.addCard(card));
      act(() => result.current.addCard(card));
      act(() => result.current.removeCard(card.cardCode));

      expect(result.current.cards[card.cardCode].qty).toBe(1);
    });

    it("elimina la entrada al llegar a cero", () => {
      const { result } = setup();
      const card       = makeCard();

      act(() => result.current.setLeader(makeLeader()));
      act(() => result.current.addCard(card));
      act(() => result.current.removeCard(card.cardCode));

      expect(result.current.cards).toEqual({});
    });
  });

  it("clear vacía las cartas y conserva líder", () => {
    const { result } = setup();
    const leader     = makeLeader();

    act(() => result.current.setLeader(leader));
    act(() => result.current.addCard(makeCard()));
    act(() => result.current.clear());

    expect(result.current.cards).toEqual({});
    expect(result.current.leader).toBe(leader);
  });

  it("load reemplaza todo el estado", () => {
    const { result } = setup();
    const state      = { leader: makeLeader(), name: "Cargado", cards: { A: { card: makeCard({ cardCode: "A" }), qty: 2 } } };

    act(() => result.current.load(state));

    expect(result.current.leader).toBe(state.leader);
    expect(result.current.name).toBe("Cargado");
    expect(result.current.cards).toBe(state.cards);
  });

  it("lanza error fuera del provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useDeck())).toThrow("useDeck debe usarse dentro de DeckProvider");

    spy.mockRestore();
  });
});
