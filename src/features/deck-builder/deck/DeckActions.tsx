"use client";

import { validateDeck } from "../lib/validate-deck";
import { useDeck } from "./DeckContext";



const isSaved = false;



export default function DeckActions() {
    const { leader, cards } = useDeck();



    const isValid = validateDeck({
        leader, 
        entries: Object.values(cards) 
    }).length === 0;


    const actions = [
        { label: "Guardar mazo",        disabled: !isValid },
        { label: "Compartir",           disabled: !isSaved },
        { label: "Artes",               disabled: !leader },
        { label: "Importar / Exportar", disabled: false },
    ];


    return (
        <div className="flex flex-wrap gap-1.5">
        {
            actions.map(({ label, disabled }) => (
                <button
                    key       = {label}
                    type      = "button"
                    disabled  = {disabled}
                    className = "rounded-lg border border-border px-2 py-0.5 text-xs text-fg-muted hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {label}
                </button>
            ))
        }
        </div>
    );

}