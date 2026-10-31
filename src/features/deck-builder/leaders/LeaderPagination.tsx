import Link from "next/link";

type Props = {
  page       : number;
  totalPages : number;
  q?         : string;
  color?     : string;
};

const BASE_CLASS = "rounded-md border border-border bg-surface-raised px-3 py-2 text-sm";



export default function LeaderPagination({ page, totalPages, q, color }: Props) {
  if (totalPages <= 1)
    return null;



  function hrefFor(target: number) {
    const params = new URLSearchParams();

    if (q)
      params.set("q", q);

    if (color)
      params.set("color", color);

    params.set("page", String(target));

    return `/deck-builder?${params}`;

  }



  return (
    <nav aria-label="Paginación" className="mt-4 flex items-center justify-between">
      {
        page > 1
          ? <Link href={hrefFor(page - 1)} className={`${BASE_CLASS} text-fg hover:border-border-strong`}>Anterior</Link>
          : <span aria-disabled="true" className={`${BASE_CLASS} text-fg-muted opacity-50`}>Anterior</span>
      }

      <span className="text-sm text-fg-muted">Página {page} de {totalPages}</span>

      {
        page < totalPages
          ? <Link href={hrefFor(page + 1)} className={`${BASE_CLASS} text-fg hover:border-border-strong`}>Siguiente</Link>
          : <span aria-disabled="true" className={`${BASE_CLASS} text-fg-muted opacity-50`}>Siguiente</span>
      }
    </nav>
  );

}
