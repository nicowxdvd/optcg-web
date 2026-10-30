import { Suspense } from "react";
import Panel from "./Panel";
import LeaderGrid from "./leaders/LeaderGrid";
import GridSkeleton from "./leaders/GridSkeleton";
import LeaderFilters from "./leaders/LeaderFilters";
import LeaderResults from "./leaders/LeaderResults";

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
        <LeaderResults>
          <LeaderGrid searchParams={searchParams} />
        </LeaderResults>
      </Suspense>
    </Panel>
  );
}