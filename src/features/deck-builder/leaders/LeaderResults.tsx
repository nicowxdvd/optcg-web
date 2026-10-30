"use client";

import { ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GridSkeleton from "./GridSkeleton";

export default function LeaderResults({ children }: { children: ReactNode }) {
  const params = useSearchParams();

  return (
    <Suspense key={params.toString()} fallback={<GridSkeleton />}>
      {children}
    </Suspense>
  );
}