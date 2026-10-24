export default function DeckBuilderPage() {
  return (
    <div className="grid h-[calc(100dvh-7rem)] grid-cols-[minmax(0,1fr)_minmax(0,2fr)] grid-rows-1 gap-6">
      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
        <div className="shrink-0 border-b border-border p-4">
          <h2 className="font-display text-xl text-fg">Catálogo</h2>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {Array.from({ length: 60 }, (_, i) => (
          <p key={i} className="text-sm text-fg-muted">Carta {i + 1}</p>
          ))}
        </div>
      </section>
      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-surface">
        <div className="shrink-0 border-b border-border p-4">
          <h2 className="font-display text-xl text-fg">Mazo</h2>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {Array.from({ length: 60 }, (_, i) => (
            <p key={i} className="text-sm text-fg-muted">Carta en mazo {i + 1}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

