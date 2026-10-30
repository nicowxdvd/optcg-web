"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronDown, FiSearch } from "react-icons/fi";

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
  const color    = params.get("color") ?? "";

  const activeCount = ["q", "color"].filter((key) => params.has(key)).length;

  const [value, setValue] = useState(urlQuery);

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



  function handleClear() {
    setValue("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="mb-3 flex flex-col gap-3">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          type        = "search"
          aria-label  = "Buscar líder"
          value       = {value}
          onChange    = {(event) => setValue(event.target.value)}
          placeholder = "Buscar nombre, código o arquetipo..."
          className   = "w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-fg"
        />
      </div>
       <div className="flex flex-wrap items-center gap-2">
         <div className="relative">
           <select
            name      = "color"
            value     = {color}
            onChange  = {handleColor}
            className = {`appearance-none rounded-full border bg-surface-raised py-2 pl-4 pr-9 text-sm ${color ? "border-gold text-gold" : "border-border text-fg-muted"}`}>
              <option value="">Color</option>
              {
                COLORS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))
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