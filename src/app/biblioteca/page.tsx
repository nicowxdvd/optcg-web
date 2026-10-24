import { api } from "@/lib/api";
import { Leader, Paginated } from "@/types/leader";
import { Suspense } from "react";

async function LeadersList() {
  const data = await api.get<Paginated<Leader>>("/leaders");

  return (
    <div>
      <p>Total: {data.total}</p>
      <ul>
        {
          data.items.map((leader) => (
            <li key={leader.externalId}>{leader.name} ({leader.externalId})</li>
          ))
        }
      </ul>
    </div>
  );
}

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <LeadersList />
    </Suspense>
  )
}
