"use client";

import { useEffect, useState } from "react";
import type { Card } from "@/types/card";
import type { Paginated } from "@/types/leader";
import { getCards } from "../cards/cards";
import GridSkeleton from "../leaders/GridSkeleton";
import CatalogCard from "./CatalogCard";



type Props = {
  color : string;
};

type Result = {
  key  : string;
  data : Paginated<Card> | null;
};

const BASE_CLASS = "rounded-md border border-border bg-surface-raised px-3 py-2 text-sm";



export default function CardCatalog({ color }: Props) {
  const [page, setPage]     = useState(1);
  const [result, setResult] = useState<Result | null>(null);
  const key                 = `${color}|${page}`;



useEffect(() => {
  let ignore = false;

  getCards({ color, page })
    .then(data => { if (!ignore) setResult({ key, data }); })
    .catch(() => { if (!ignore) setResult({ key, data: null }); });

  return () => { ignore = true; };
}, [key, color, page]);



  if (result?.key !== key)
    return <GridSkeleton />;



  const { data } = result;



  if (!data)
    return (
      <p className="rounded-md border border-error-border bg-error-bg p-3 text-sm text-error">
        No se pudieron cargar las cartas.
      </p>
    );



  if (data.items.length === 0)
    return <p className="text-sm text-fg-muted">No hay cartas para este líder.</p>;



  return (
    <>
      <p className="mb-3 text-sm text-fg-muted">
        {
          data.total} {data.total === 1 ? "carta" : "cartas"
        }
      </p>
      <div className="grid grid-cols-4 gap-3">
        {
          data.items.map(card => <CatalogCard key={card.externalId} card={card} />)
        }
      </div>
      {
        data.totalPages > 1 && (
          <nav aria-label="Paginación" className="mt-4 flex items-center justify-between">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className={`${BASE_CLASS} text-fg hover:border-border-strong disabled:text-fg-muted disabled:opacity-50`}>Anterior</button>
            <span className="text-sm text-fg-muted">Página {data.page} de {data.totalPages}</span>
            <button type="button" disabled={page >= data.totalPages} onClick={() => setPage(page + 1)} className={`${BASE_CLASS} text-fg hover:border-border-strong disabled:text-fg-muted disabled:opacity-50`}>Siguiente</button>
          </nav>
        )
      }
    </>
  );

}
