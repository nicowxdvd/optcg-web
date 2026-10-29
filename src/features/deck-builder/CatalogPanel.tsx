import { Suspense } from "react";
import Panel from "./Panel";
import LeaderGrid from "./LeaderGrid";
import GridSkeleton from "./GridSkeleton";
import LeaderFilters from "./LeaderFilters";

type Props = {
  searchParams : PageProps<"/deck-builder">["searchParams"];
};


export default function CatalogPanel({ searchParams }: Props) {
  return (
    <Panel header={<h2 className="font-display text-sm text-fg-muted">Elige un Líder para empezar a construir tu mazo.</h2>}>
      <Suspense>
        <LeaderFilters />
      </Suspense>
       <Suspense fallback={<GridSkeleton />}>
        <LeaderGrid searchParams={searchParams} />
      </Suspense>
    </Panel>
  );
}