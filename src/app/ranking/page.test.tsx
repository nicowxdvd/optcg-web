import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RankingPage from "./page";

describe("RankingPage", () => {
  it("renderiza el placeholder", () => {
    render(<RankingPage />);

    expect(screen.getByRole("heading", { name: "..." })).toBeInTheDocument();
  });
});
