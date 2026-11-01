import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { makeLeader } from "@/test/fixtures";
import { CardPreviewProvider, useCardPreview } from "./CardPreviewContext";

const wrapper = ({ children }: { children: ReactNode }) => <CardPreviewProvider>{children}</CardPreviewProvider>;

describe("CardPreviewContext", () => {
  it("empieza sin líder", () => {
    const { result } = renderHook(() => useCardPreview(), { wrapper });

    expect(result.current.leader).toBeNull();
  });

  it("setLeader actualiza el líder", () => {
    const { result } = renderHook(() => useCardPreview(), { wrapper });
    const leader     = makeLeader();

    act(() => result.current.setLeader(leader));
    expect(result.current.leader).toBe(leader);

    act(() => result.current.setLeader(null));
    expect(result.current.leader).toBeNull();
  });

  it("lanza error fuera del provider", () => {
    expect(() => renderHook(() => useCardPreview())).toThrow("useCardPreview debe usarse dentro de CardPreviewProvider");
  });
});
