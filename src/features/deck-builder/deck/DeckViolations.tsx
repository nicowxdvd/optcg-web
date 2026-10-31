"use client";

import { validateDeck } from "../lib/validate-deck";
import { useDeck } from "./DeckContext";



export default function DeckViolations() {
  const { leader, cards } = useDeck();

  const violations = validateDeck({ leader, entries: Object.values(cards) });

  if (violations.length === 0)
    return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {violations.map((violation, index) => (
        <li
          key       = {`${index}-${violation}`}
          className = "rounded-full border border-error-border bg-error-bg px-2 py-0.5 text-xs text-error"
        >
          {violation}
        </li>
      ))}
    </ul>
  );

}
