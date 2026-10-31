"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Card } from "@/types/card";
import type { Leader } from "@/types/leader";
import { colorsOf, DECK_SIZE, MAX_COPIES, type DeckEntry } from "../lib/validate-deck";



type DeckState = {
  leader : Leader | null;
  name   : string;
  cards  : Record<string, DeckEntry>;
};



type DeckAction =
  | { type: "setLeader";  leader: Leader | null }
  | { type: "setName";    name: string }
  | { type: "addCard";    card: Card }
  | { type: "removeCard"; cardCode: string }
  | { type: "clear" }
  | { type: "load";       state: DeckState };



const initialState: DeckState = { leader: null, name: "", cards: {} };



function totalCards(cards: DeckState["cards"]) {
  return Object.values(cards).reduce((sum, { qty }) => sum + qty, 0);

}



function reducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case "setLeader":
      return { ...state, leader: action.leader, cards: {} };

    case "setName":
      return { ...state, name: action.name };

    case "addCard": {
      const { card }  = action;
      const current   = state.cards[card.cardCode]?.qty ?? 0;
      const allowed   = state.leader ? colorsOf(state.leader.color) : [];
      const sameColor = colorsOf(card.color).some(c => allowed.includes(c));

      if (!state.leader || !sameColor || current >= MAX_COPIES || totalCards(state.cards) >= DECK_SIZE)
        return state;

      return { ...state, cards: { ...state.cards, [card.cardCode]: { card, qty: current + 1 } } };
    }

    case "removeCard": {
      const entry = state.cards[action.cardCode];

      if (!entry)
        return state;

      const { [action.cardCode]: _, ...rest } = state.cards;

      return entry.qty === 1
        ? { ...state, cards: rest }
        : { ...state, cards: { ...rest, [action.cardCode]: { ...entry, qty: entry.qty - 1 } } };
    }

    case "clear":
      return { ...state, leader: state.leader, cards: {} };

    case "load":
      return action.state;
  }

}



type DeckValue = DeckState & {
  setLeader  : (leader: Leader | null) => void;
  setName    : (name: string) => void;
  addCard    : (card: Card) => void;
  removeCard : (cardCode: string) => void;
  clear      : () => void;
  load       : (state: DeckState) => void;
};



const DeckContext = createContext<DeckValue | null>(null);



export function DeckProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: DeckValue = {
    ...state,
    setLeader  : leader   => dispatch({ type: "setLeader", leader }),
    setName    : name     => dispatch({ type: "setName", name }),
    addCard    : card     => dispatch({ type: "addCard", card }),
    removeCard : cardCode => dispatch({ type: "removeCard", cardCode }),
    clear      : ()       => dispatch({ type: "clear" }),
    load       : next     => dispatch({ type: "load", state: next }),
  };

  return <DeckContext value={value}>{children}</DeckContext>;

}



export function useDeck() {
  const context = useContext(DeckContext);

  if (!context)
    throw new Error("useDeck debe usarse dentro de DeckProvider");

  return context;

}
