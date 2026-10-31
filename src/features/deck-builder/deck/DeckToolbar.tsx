"use client";

import { useDeck } from "./DeckContext";



export default function DeckToolbar() {
  const { name, setName } = useDeck();

  return (
    <input
      type        = "text"
      aria-label  = "Nombre del mazo"
      value       = {name}
      onChange    = {(event) => setName(event.target.value)}
      placeholder = "Mazo sin título"
      maxLength   = {60}
      className   = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg"
    />
  );

}