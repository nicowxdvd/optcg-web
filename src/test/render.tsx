import { render } from "@testing-library/react";
import { useEffect, useRef, type ComponentProps, type ReactElement } from "react";
import { CardPreviewProvider } from "@/features/deck-builder/card-preview/CardPreviewContext";
import { DeckProvider, useDeck } from "@/features/deck-builder/deck/DeckContext";

type DeckState = Parameters<ReturnType<typeof useDeck>["load"]>[0];

function Loader({ state }: { state?: DeckState }) {
  const { load } = useDeck();
  const done     = useRef(false);

  useEffect(() => {
    if (done.current || !state)
      return;

    done.current = true;
    load(state);
  }, [load, state]);

  return null;
}

export function renderWithProviders(ui: ReactElement, state?: DeckState, options?: ComponentProps<typeof render>[1]) {
  return render(
    <DeckProvider>
      <CardPreviewProvider>
        <Loader state={state} />
        {ui}
      </CardPreviewProvider>
    </DeckProvider>,
    options,
  );
}

export function deckStateOf(entries: { card: DeckState["cards"][string]["card"]; qty: number }[], overrides: Partial<DeckState> = {}): DeckState {
  return {
    leader : null,
    name   : "",
    cards  : Object.fromEntries(entries.map(entry => [entry.card.cardCode, entry])),
    ...overrides,
  };
}
