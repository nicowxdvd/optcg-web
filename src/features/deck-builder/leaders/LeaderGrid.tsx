import { ApiError } from "@/lib/api";
import LeaderCard from "./LeaderCard";
import { getLeaders } from "./leaders";
import LeaderPagination from "./LeaderPagination";

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams : Promise<SearchParams>;
};



function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;

}



export default async function LeaderGrid({ searchParams }: Props) {
  const params = await searchParams;
  const q      = first(params.q);
  const color  = first(params.color);
  let data;

  try {
    data = await getLeaders({ q, color, page: first(params.page) });
  } catch (error) {
    if (!(error instanceof ApiError))
      throw error;

    return (
      <p className="rounded-md border border-error-border bg-error-bg p-3 text-sm text-error">
        No se pudieron cargar los líderes.
      </p>
    );
  }

  if (data.items.length === 0)
    return <p className="text-sm text-fg-muted">No hay líderes con esos filtros.</p>;

  return (
    <>
      <p className="mb-3 text-sm text-fg-muted">
        {data.total} {data.total === 1 ? "carta" : "cartas"}
      </p>
      <div className="grid grid-cols-4 gap-3">
        {
          data.items.map((leader) => (
            <LeaderCard key={leader.externalId} leader={leader} />
          ))
        }
      </div>
      <LeaderPagination page={data.page} totalPages={data.totalPages} q={q} color={color} />
    </>
  );

}
