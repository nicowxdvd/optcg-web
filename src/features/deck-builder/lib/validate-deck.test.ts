import { describe, expect, it } from "vitest";
import type { Card } from "@/types/card";
import type { Leader } from "@/types/leader";
import { colorsOf, DECK_SIZE, MAX_COPIES, validateDeck } from "./validate-deck";

const leader = (color: string): Leader => ({
  externalId : "l1",
  cardCode   : "OP01-001",
  name       : "Lider",
  rarity     : "L",
  color,
  life       : 5,
  power      : 5000,
  attribute  : "Slash",
  effect     : "",
  imageUrl   : "/l.png",
  set        : "OP01",
  traits     : [],
});

const card = (cardCode: string, color = "Red", name = cardCode): Card => ({
  externalId    : cardCode,
  cardCode,
  name,
  type          : "CHARACTER",
  rarity        : "C",
  color,
  cost          : 1,
  power         : 1000,
  counterValue  : null,
  attribute     : null,
  effect        : null,
  triggerEffect : null,
  imageUrl      : "/c.png",
});

describe("constantes", () => {
  it("define tamaño del mazo y copias máximas", () => {
    expect(DECK_SIZE).toBe(50);
    expect(MAX_COPIES).toBe(4);
  });
});

describe("colorsOf", () => {
  it("separa colores por barra", () => {
    expect(colorsOf("Red/Green")).toEqual(["Red", "Green"]);
  });

  it("devuelve un solo color en lista", () => {
    expect(colorsOf("Red")).toEqual(["Red"]);
  });
});

describe("validateDeck", () => {
  const fullDeck = () => [
    ...Array.from({ length: 12 }, (_, i) => ({ card: card(`OP01-${100 + i}`), qty: 4 })),
    { card: card("OP01-999"), qty: 2 },
  ];

  it("no devuelve violaciones con mazo válido", () => {
    expect(validateDeck({ leader: leader("Red"), entries: fullDeck() })).toEqual([]);
  });

  it("pide líder si no hay", () => {
    expect(validateDeck({ leader: null, entries: fullDeck() })).toEqual(["Elige un Líder."]);
  });

  it("informa cantidad de cartas si no son 50", () => {
    expect(validateDeck({ leader: leader("Red"), entries: [{ card: card("A"), qty: 3 }] }))
      .toEqual(["El mazo tiene 3/50 cartas."]);
  });

  it("informa cartas con más de 4 copias", () => {
    const entries = [...fullDeck(), { card: card("OP01-100"), qty: 1 }];
    const result  = validateDeck({ leader: leader("Red"), entries });

    expect(result).toContain("OP01-100 tiene 5 copias (máximo 4).");
  });

  it("suma copias de entradas repetidas de la misma carta", () => {
    const entries = [{ card: card("X"), qty: 3 }, { card: card("X"), qty: 2 }];
    const result  = validateDeck({ leader: leader("Red"), entries });

    expect(result).toContain("X tiene 5 copias (máximo 4).");
  });

  it("informa cartas que no comparten color con el líder", () => {
    const entries = [{ card: card("B1", "Blue", "Azulita"), qty: 1 }];
    const result  = validateDeck({ leader: leader("Red"), entries });

    expect(result).toContain("Azulita no comparte color con el líder.");
  });

  it("acepta carta que comparte algún color con líder multicolor", () => {
    const entries = [{ card: card("G1", "Green"), qty: 1 }];
    const result  = validateDeck({ leader: leader("Red/Green"), entries });

    expect(result.some(v => v.includes("color"))).toBe(false);
  });

  it("no valida colores sin líder", () => {
    const entries = [{ card: card("B1", "Blue"), qty: 1 }];
    const result  = validateDeck({ leader: null, entries });

    expect(result.some(v => v.includes("color"))).toBe(false);
  });

  it("mazo vacío con líder informa 0/50", () => {
    expect(validateDeck({ leader: leader("Red"), entries: [] })).toEqual(["El mazo tiene 0/50 cartas."]);
  });
});
