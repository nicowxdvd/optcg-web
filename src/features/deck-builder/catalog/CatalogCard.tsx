"use client";

import Image from "next/image";
import type { Card } from "@/types/card";
import { useDeck } from "../deck/DeckContext";
import { DECK_SIZE, MAX_COPIES } from "../lib/validate-deck";



type Props = {
  card: Card;
};



export default function CatalogCard({ card }: Props) {
  const { cards, addCard } = useDeck();

  const qty    = cards[card.cardCode]?.qty ?? 0;
  const total  = Object.values(cards).reduce((sum, entry) => sum + entry.qty, 0);
  const canAdd = qty < MAX_COPIES && total < DECK_SIZE;



   return (
    <div className="relative aspect-63/88">
      <button
        type       = "button"
        aria-label = {`Añadir ${card.name} (${card.cardCode}) al mazo`}
        disabled   = {!canAdd}
        onClick    = {() => addCard(card)}
        className  = "absolute inset-0 overflow-hidden rounded-card border border-border bg-surface-raised transition hover:border-border-strong focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image
          src       = {card.imageUrl}
          alt       = {`${card.name} (${card.cardCode})`}
          fill
          sizes     = "10vw"
          className = "object-cover"
        />
      </button>

      {
        qty > 0 && (
          <span className="pointer-events-none absolute -bottom-2 -right-2 rounded-full bg-black px-2 py-0.5 text-sm font-bold text-white ring-2 ring-surface">
            ×{qty}
          </span>
        )
      }
    </div>
  );



}
