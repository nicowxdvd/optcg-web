"use client";

import { PiCompass } from "react-icons/pi";
import type { CardType } from "@/types/card";
import { useDeck } from "./DeckContext";
import DeckCard from "./DeckCard";



const GROUPS: { type: CardType; label: string }[] = [
  { type: "CHARACTER", label: "PERSONAJES" },
  { type: "EVENT",     label: "EVENTOS" },
  { type: "STAGE",     label: "ESCENARIOS" },
];



export default function DeckList() {
  const { cards } = useDeck();
  const entries   = Object.values(cards);

  if (Object.keys(cards).length === 0)
    return (
      <div className="relative flex flex-1 items-center justify-center p-6 text-center">
        <PiCompass aria-hidden className="absolute size-40 text-fg/5" />
        <p className="relative text-sm text-fg-muted">
          Aún no hay cartas — haz clic en las cartas de la izquierda para añadirlas.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-3">
      {
        GROUPS.map(({ type, label }) => {
          const group = entries.filter(({ card }) => card.type === type).sort((a, b) => (a.card.cost ?? 0) - (b.card.cost ?? 0) || a.card.name.localeCompare(b.card.name));

          if (group.length === 0)
            return null;

          const total = group.reduce((sum, { qty }) => sum + qty, 0);

          return (
            <section key={type}>
              <h3 className="mb-2 text-xs font-bold tracking-wide text-fg-muted">
                {label} · {total}
              </h3>
              <ul className="grid grid-cols-4 gap-2">
                {
                  group.map(entry => <DeckCard key={entry.card.cardCode} entry={entry} />)
                }
              </ul>
            </section>
          );

        })
      }
    </div>
  );

}
