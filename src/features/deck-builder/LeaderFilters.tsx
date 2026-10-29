"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const DEBOUNCE_MS = 300;

const COLORS = [
  { value: "Red"    , label: "Rojo"     },
  { value: "Green"  , label: "Verde"    },
  { value: "Blue"   , label: "Azul"     },
  { value: "Purple" , label: "Morado"   },
  { value: "Black"  , label: "Negro"    },
  { value: "Yellow" , label: "Amarillo" }
];



function buildHref(pathname: string, params: URLSearchParams) {
  const next = new URLSearchParams(params);
  next.delete("page");
  const query = next.toString();

  return query ? `${pathname}?${query}` : pathname;
}



export default function LeaderFilters() {
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useSearchParams();
  const urlQuery = params.get("q") ?? "";

  const [value, setValue] = useState(urlQuery);

  function replaceParams(next: URLSearchParams) {
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }



  useEffect(() => {
    const search = value.trim();

    if (search === urlQuery)
      return;

    const id = setTimeout(() => {
      const next = new URLSearchParams(params);

      if (search)
        next.set("q", search);
      else
        next.delete("q");

      router.replace(buildHref(pathname, next), { scroll: false });
    }, DEBOUNCE_MS);

    return () => clearTimeout(id);
  }, [value, urlQuery, params, pathname, router]);



  function handleColor(event: ChangeEvent<HTMLSelectElement>) {
    const next = new URLSearchParams(params);

    if (event.target.value)
      next.set("color", event.target.value);

    else
      next.delete("color");

    router.replace(buildHref(pathname, next), { scroll: false });
  }

  return (
    <div className="mb-3 flex flex-col gap-2">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          type        = "search"
          aria-label  = "Buscar líder"
          value       = {value}
          onChange    = {(event) => setValue(event.target.value)}
          placeholder = "Buscar nombre, código o arquetipo..."
          className   = "w-full rounded-full border border-border bg-surface-raised py-2 pl-10 pr-3 text-sm text-fg"
        />
      </div>

      <select
        name      = "color"
        value     = {params.get("color") ?? ""}
        onChange  = {handleColor}
        className = "rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-fg"
      >
        <option value="">Todos los colores</option>
        {
          COLORS.map((color) => (
            <option key={color.value} value={color.value}>{color.label}</option>
          ))
        }
      </select>
    </div>
  );

}