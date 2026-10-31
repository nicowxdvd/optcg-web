"use client";

import Image from "next/image";
import { PiMinus, PiPlus } from "react-icons/pi";
import { DECK_SIZE, MAX_COPIES, type DeckEntry } from "../lib/validate-deck";
import { useDeck } from "./DeckContext";



type Props = {
  entry: DeckEntry;
};



const MAX_LAYERS = 2;
const LAYER_STEP = 4;

const BUTTON = "flex size-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-40";



export default function DeckCard({ entry: { card, qty } }: Props) {
  const { cards, addCard, removeCard } = useDeck();

  const total  = Object.values(cards).reduce((sum, entry) => sum + entry.qty, 0);
  const canAdd = qty < MAX_COPIES && total < DECK_SIZE;
  const layers = Math.min(qty - 1, MAX_LAYERS);

  return (
    <li className="group relative aspect-63/88">
      {
        Array.from({ length: layers }, (_, i) => (
          <span
            key       = {i}
            aria-hidden
            className = "absolute inset-0 rounded-card border border-border bg-surface-raised"
            style     = {{ transform: `translate(${(layers - i) * LAYER_STEP}px, ${(layers - i) * LAYER_STEP}px)` }}
          />
        ))
      }

      <div className="absolute inset-0 overflow-hidden rounded-card border border-border bg-surface-raised">
        <Image
          src       = {card.imageUrl}
          alt       = {`${card.name} (${card.cardCode})`}
          fill
          sizes     = "80px"
          className = "object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type       = "button"
            aria-label = {`Quitar una copia de ${card.name}`}
            className  = {BUTTON}
            onClick    = {() => removeCard(card.cardCode)}
          >
            <PiMinus aria-hidden />
          </button>
          <button
            type       = "button"
            aria-label = {`Añadir una copia de ${card.name}`}
            className  = {BUTTON}
            disabled   = {!canAdd}
            onClick    = {() => addCard(card)}
          >
            <PiPlus aria-hidden />
          </button>
        </div>
      </div>

      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 text-xs font-bold text-white">
        ×{qty}
      </span>
    </li>
  );

}
