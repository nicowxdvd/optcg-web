import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { getCards } from "./cards";

vi.mock("@/lib/api", () => ({ api: { get: vi.fn() } }));

const get = vi.mocked(api.get);

describe("getCards", () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue({ items: [], total: 0, page: 1, totalPages: 0 });
  });

  it("pide el límite y el color del líder", async () => {
    await getCards({ color: "Red" });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red");
  });

  it("une con coma los colores de un líder bicolor", async () => {
    await getCards({ color: "Red/Green" });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red%2CGreen");
  });
});
