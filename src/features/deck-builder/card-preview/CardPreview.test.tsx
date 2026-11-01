import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { makeLeader } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render";
import CardPreview from "./CardPreview";
import { useCardPreview } from "./CardPreviewContext";

function Trigger() {
  const { setLeader } = useCardPreview();

  return <button onClick={() => setLeader(makeLeader())}>mostrar</button>;
}

describe("CardPreview", () => {
  it("no renderiza nada sin líder", () => {
    renderWithProviders(<CardPreview />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("muestra la imagen del líder en preview", async () => {
    renderWithProviders(<><Trigger /><CardPreview /></>);

    await userEvent.click(screen.getByText("mostrar"));

    expect(screen.getByRole("img", { name: "Luffy (OP01-001)" })).toBeInTheDocument();
  });
});
