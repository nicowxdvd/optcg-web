"use client";

import { DECK_SIZE, validateDeck } from "../lib/validate-deck";
import { useDeck } from "./DeckContext";



export default function DeckStatus() {
  const { leader, cards } = useDeck();

  const entries = Object.values(cards);
  const total   = entries.reduce((sum, { qty }) => sum + qty, 0);
  const isValid = validateDeck({ leader, entries }).length === 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-fg">{total}/{DECK_SIZE}</span>

      <span
        className = {
          isValid
            ? "rounded-full border border-gold-muted px-2 py-0.5 text-xs text-gold"
            : "rounded-full border border-error-border bg-error-bg px-2 py-0.5 text-xs text-error"
        }
      >
        {isValid ? "Mazo válido" : "Mazo inválido"}
      </span>
    </div>
  );

}