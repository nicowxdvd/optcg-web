"use client";

import Image from "next/image";
import { useDeck } from "./DeckContext";



export default function LeaderSlot() {
  const { leader } = useDeck();

  if (!leader)
    return (
      <div className="flex aspect-63/88 w-40 items-center justify-center rounded-card border-2 border-dashed border-border p-3 text-center">
        <p className="text-sm text-fg-muted">Elige un Líder.</p>
      </div>
    );

  return (
    <div className="relative aspect-63/88 w-40 overflow-hidden rounded-card border border-border bg-surface-raised">
      <Image
        src       = {leader.imageUrl}
        alt       = {`${leader.name} (${leader.cardCode})`}
        fill
        sizes     = "160px"
        className = "object-cover"
      />
    </div>
  );
}