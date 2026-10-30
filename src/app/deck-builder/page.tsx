import CatalogPanel from "@/features/deck-builder/CatalogPanel";
import DeckPanel from "@/features/deck-builder/DeckPanel";
import CardPreview from "@/features/deck-builder/card-preview/CardPreview";
import { CardPreviewProvider } from "@/features/deck-builder/card-preview/CardPreviewContext";
import { DeckProvider } from "@/features/deck-builder/deck/DeckContext";

export default function DeckBuilderPage({ searchParams }: PageProps<"/deck-builder">) {
  return (
     <DeckProvider>
      <CardPreviewProvider>
          <div className="grid h-[calc(100dvh-5rem)] grid-cols-[minmax(0,1fr)_minmax(0,2fr)] grid-rows-1 gap-6">
            <CatalogPanel searchParams={searchParams} />
              <div className="relative grid min-h-0">
                <DeckPanel />
                <CardPreview />
              </div>
          </div>
      </CardPreviewProvider>
     </DeckProvider>
  )  
}

