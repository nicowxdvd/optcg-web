import CatalogPanel from "@/features/deck-builder/CatalogPanel";
import DeckPanel from "@/features/deck-builder/DeckPanel";

export default function DeckBuilderPage() {
  return (
    <div className="grid h-[calc(100dvh-5rem)] grid-cols-[minmax(0,1fr)_minmax(0,2fr)] grid-rows-1 gap-6">
      <CatalogPanel />
      <DeckPanel />
    </div>
  );
}

