import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Panel from "./Panel";

describe("Panel", () => {
  it("renderiza header y contenido", () => {
    render(<Panel header={<h2>Cabecera</h2>}><p>Cuerpo</p></Panel>);

    expect(screen.getByRole("heading", { name: "Cabecera" })).toBeInTheDocument();
    expect(screen.getByText("Cuerpo")).toBeInTheDocument();
  });
});
