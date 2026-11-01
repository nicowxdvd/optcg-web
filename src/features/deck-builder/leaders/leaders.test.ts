import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api";
import { getLeaders } from "./leaders";

vi.mock("@/lib/api", () => ({ api: { get: vi.fn() } }));

const get = vi.mocked(api.get);

describe("getLeaders", () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue({ items: [], total: 0, page: 1, totalPages: 0 });
  });

  it("pide solo el límite si no hay filtros", async () => {
    await getLeaders({});

    expect(get).toHaveBeenCalledWith("/leaders?limit=20");
  });

  it("agrega q recortado, color y página", async () => {
    await getLeaders({ q: "  luffy ", color: "Red", page: "3" });

    expect(get).toHaveBeenCalledWith("/leaders?limit=20&q=luffy&color=Red&page=3");
  });

  it("ignora q vacío o solo espacios", async () => {
    await getLeaders({ q: "   " });

    expect(get).toHaveBeenCalledWith("/leaders?limit=20");
  });

  it.each(["0", "-1", "1.5", "abc"])("ignora página inválida %s", async (page) => {
    await getLeaders({ page });

    expect(get).toHaveBeenCalledWith("/leaders?limit=20");
  });

  it("devuelve lo que responde la API", async () => {
    const payload = { items: [], total: 7, page: 2, totalPages: 4 };

    get.mockResolvedValueOnce(payload);

    await expect(getLeaders({})).resolves.toBe(payload);
  });
});
