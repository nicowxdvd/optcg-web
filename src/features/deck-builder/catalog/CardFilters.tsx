"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import type { CardType } from "@/types/card";

const DEBOUNCE_MS = 300;

export type Filters = { q: string; type?: CardType; cost?: number };

type Props = {
  filters  : Filters;
  onChange : (next: Filters) => void;
};

const TYPES: { value: CardType; label: string }[] = [
  { value: "CHARACTER", label: "Personaje" },
  { value: "EVENT",     label: "Evento" },
  { value: "STAGE",     label: "Escenario" },
];

const COSTS = Array.from({ length: 11 }, (_, i) => i);

const SELECT_CLASS = "appearance-none rounded-full border bg-surface-raised py-2 pl-4 pr-9 text-sm";



export default function CardFilters({ filters, onChange }: Props) {

  const [value, setValue] = useState(filters.q);

  const activeCount = [filters.q !== "", filters.type !== undefined, filters.cost !== undefined].filter(Boolean).length;



  useEffect(() => {
    const search = value.trim();

    if (search === filters.q)
      return;

    const id = setTimeout(() => onChange({ ...filters, q: search }), DEBOUNCE_MS);

    return () => clearTimeout(id);

  }, [value, filters, onChange]);



  function handleType(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as CardType | "";

    onChange({ ...filters, type: type || undefined });

  }



  function handleCost(event: ChangeEvent<HTMLSelectElement>) {
    const cost = event.target.value;

    onChange({ ...filters, cost: cost === "" ? undefined : Number(cost) });

  }



  function handleClear() {
    setValue("");
    onChange({ q: "" });

  }



   return (
    <div className="mb-3 flex flex-col gap-3">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          type        = "search"
          aria-label  = "Buscar carta"
          value       = {value}
          onChange    = {(event) => setValue(event.target.value)}
          placeholder = "Buscar nombre o código..."
          className   = "w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-fg"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select
            name       = "type"
            aria-label = "Tipo"
            value      = {filters.type ?? ""}
            onChange   = {handleType}
            className  = {`${SELECT_CLASS} ${filters.type ? "border-gold text-gold" : "border-border text-fg-muted"}`}>
             <option value="">Tipo</option>
             {
               TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)
             }
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted" />
        </div>
        <div className="relative">
          <select
            name       = "cost"
            aria-label = "Coste"
            value      = {filters.cost ?? ""}
            onChange   = {handleCost}
            className  = {`${SELECT_CLASS} ${filters.cost !== undefined ? "border-gold text-gold" : "border-border text-fg-muted"}`}>
             <option value="">Coste</option>
             {
               COSTS.map((item) => <option key={item} value={item}>{item}</option>)
             }
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted" />
        </div>
        {
          activeCount > 0 && (
            <button type="button" onClick={handleClear} className="text-sm text-error">
              Limpiar ({activeCount})
            </button>
          )
        }
      </div>
    </div>
  );
}