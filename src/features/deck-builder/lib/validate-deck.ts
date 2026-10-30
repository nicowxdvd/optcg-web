import type { Card } from "@/types/card";
import type { Leader } from "@/types/leader";



export type DeckEntry = { card: Card; qty: number };



export type DeckInput = {
  leader  : Leader | null;
  entries : DeckEntry[];
};



export const DECK_SIZE  = 50;
export const MAX_COPIES = 4;



export const colorsOf =(color: string) => color.split("/");



export function validateDeck({ leader, entries }: DeckInput): string[] {
  const violations : string[]                = [];
  const copies     : Record<string, number>  = {};
  let   total = 0;


    for (const { card, qty } of entries) {
       total                   += qty;
       copies[card.cardCode]    = (copies[card.cardCode] ?? 0) + qty;
    }

    if (!leader)
        violations.push("Elige un Líder.");

    if (total !== DECK_SIZE)
        violations.push(`El mazo tiene ${total}/${DECK_SIZE} cartas.`);

    for (const [code, qty] of Object.entries(copies))
        if (qty > MAX_COPIES)
            violations.push(`${code} tiene ${qty} copias (máximo ${MAX_COPIES}).`);

    if (leader) {
        const allowed = colorsOf(leader.color);

    for (const { card } of entries)
        if (!colorsOf(card.color).some(c => allowed.includes(c)))
            violations.push(`${card.name} no comparte color con el líder.`);
    }
    
    return violations;
}