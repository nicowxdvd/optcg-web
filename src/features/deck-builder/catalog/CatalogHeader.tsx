"use client";

import { useDeck } from "../deck/DeckContext";

export default function CatalogHeader() {
  const { leader } = useDeck();

  return (
    <h2 className="font-display text-sm text-fg-muted">
      {leader ? "Añade cartas a tu mazo" : "Elige un Líder para empezar a construir tu mazo."}
    </h2>
  );

}
