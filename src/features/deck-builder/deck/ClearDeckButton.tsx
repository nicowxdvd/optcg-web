"use client";

import { useDeck } from "./DeckContext";



export default function ClearDeckButton() {
  const { cards, clear } = useDeck();

  if (Object.keys(cards).length === 0) 
    return null;

  return (
    <button
      type      = "button"
      onClick   = {clear}
      className = "rounded-lg border border-border px-2 py-0.5 text-xs text-fg-muted hover:text-fg"
    >
      Limpiar todo
    </button>
  );

}