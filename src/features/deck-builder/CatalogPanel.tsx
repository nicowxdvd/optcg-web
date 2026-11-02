import { Suspense } from "react";
import Panel from "./Panel";
import LeaderGrid from "./leaders/LeaderGrid";
import GridSkeleton from "./leaders/GridSkeleton";
import LeaderFilters from "./leaders/LeaderFilters";
import LeaderResults from "./leaders/LeaderResults";
import CatalogSwitch from "./catalog/CatalogSwitch";
import CatalogHeader from "./catalog/CatalogHeader";

type Props = {
  searchParams : PageProps<"/deck-builder">["searchParams"];
};



export default function CatalogPanel({ searchParams }: Props) {
  return (
    <Panel header={<CatalogHeader />}>
      <CatalogSwitch
        leaders={
          <>
            <Suspense>
              <LeaderFilters />
            </Suspense>
            <Suspense fallback={<GridSkeleton />}>
              <LeaderResults>
                <LeaderGrid searchParams={searchParams} />
              </LeaderResults>
            </Suspense>
          </>
        }
      />
    </Panel>
  );

}
