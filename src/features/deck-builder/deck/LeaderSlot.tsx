"use client";

import Image from "next/image";
import { useDeck } from "./DeckContext";



export default function LeaderSlot() {
  const { leader } = useDeck();

  if (!leader)
    return <p className="text-sm text-error">Elige un Líder.</p>;

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