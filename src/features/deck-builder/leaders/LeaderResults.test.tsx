import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LeaderResults from "./LeaderResults";

vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams("q=luffy") }));

describe("LeaderResults", () => {
  it("renderiza los hijos", () => {
    render(<LeaderResults><p>contenido</p></LeaderResults>);

    expect(screen.getByText("contenido")).toBeInTheDocument();
  });
});
