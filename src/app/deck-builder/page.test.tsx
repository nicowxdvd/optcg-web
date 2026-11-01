import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeckBuilderPage from "./page";

vi.mock("@/features/deck-builder/CatalogPanel", () => ({ default: () => <p>catálogo</p> }));

describe("DeckBuilderPage", () => {
  it("compone catálogo, mazo y preview dentro de los providers", () => {
    render(<DeckBuilderPage {...({ searchParams: Promise.resolve({}) } as Parameters<typeof DeckBuilderPage>[0])} />);

    expect(screen.getByText("catálogo")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nombre del mazo" })).toBeInTheDocument();
    expect(screen.getByText("Elige un Líder.", { selector: "p" })).toBeInTheDocument();
  });
});
