"use client";

import Image from "next/image";
import type { DeckEntry } from "../lib/validate-deck";



type Props = {
  entry: DeckEntry;
};



export default function DeckCard({ entry: { card, qty } }: Props) {
  return (
    <li className="relative aspect-63/88 overflow-hidden rounded-card border border-border bg-surface-raised">
      <Image
        src       = {card.imageUrl}
        alt       = {`${card.name} (${card.cardCode})`}
        fill
        sizes     = "80px"
        className = "object-cover"
      />
      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 text-xs font-bold text-white">
        ×{qty}
      </span>
    </li>
  );
}