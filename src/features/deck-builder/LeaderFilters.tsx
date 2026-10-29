"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";

const COLORS = [
  { value: "Red"    , label: "Rojo"     },
  { value: "Green"  , label: "Verde"    },
  { value: "Blue"   , label: "Azul"     },
  { value: "Purple" , label: "Morado"   },
  { value: "Black"  , label: "Negro"    },
  { value: "Yellow" , label: "Amarillo" }
];


export default function LeaderFilters() {
  const params = useSearchParams();

    return (
    <Form key={params.toString()} action="" className="mb-3 flex gap-2">
      <input
        name         = "q"
        type         = "search"
        defaultValue = {params.get("q") ?? ""}
        placeholder  = "Nombre o código"
        className    = "min-w-0 flex-1 rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg"
      />

        <select
            name         = "color"
            defaultValue = {params.get("color") ?? ""}
            className    = "rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg"
        >
            <option value="">Todos los colores</option>
            {
                COLORS.map((color) => (
                    <option key={color.value} value={color.value}>
                        {color.label}
                    </option>
                ))
            }
        </select>

        <button
            type      = "submit"
            className = "rounded-md bg-gold px-4 py-2 text-sm text-bg hover:bg-gold-hover"
        >
            Buscar
        </button>


    </Form>
  );

}