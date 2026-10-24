import type { ReactNode } from "react";

type Props = {
  header   : ReactNode;
  children : ReactNode;
};

export default function Panel({ header, children }: Props) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="shrink-0 border-b border-border p-4">{header}</div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  );
}