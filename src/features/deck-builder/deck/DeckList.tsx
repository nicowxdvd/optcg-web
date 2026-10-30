"use client";



import { PiCompass } from "react-icons/pi";
import { useDeck } from "./DeckContext";



export default function DeckList() {
  const { cards } = useDeck();

  if (Object.keys(cards).length === 0)
    return (
      <div className="relative flex flex-1 items-center justify-center p-6 text-center">
        <PiCompass aria-hidden className="absolute size-40 text-fg/5" />
        <p className="relative text-sm text-fg-muted">
          Aún no hay cartas — haz clic en las cartas de la izquierda para añadirlas.
        </p>
      </div>
    );

  return null;
}