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

  it("agrega la página pedida", async () => {
    await getCards({ color: "Red", page: 3 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&page=3");
  });

  it("ignora la página cero", async () => {
    await getCards({ color: "Red", page: 0 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red");
  });

  it("ignora una página negativa", async () => {
    await getCards({ color: "Red", page: -1 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red");
  });

  it("agrega la búsqueda", async () => {
    await getCards({ color: "Red", q: "luffy" });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&q=luffy");
  });

  it("ignora una búsqueda vacía", async () => {
    await getCards({ color: "Red", q: "" });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red");
  });

  it("agrega el tipo", async () => {
    await getCards({ color: "Red", type: "EVENT" });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&type=EVENT");
  });

  it("agrega el coste", async () => {
    await getCards({ color: "Red", cost: 3 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&cost=3");
  });

  it("agrega el coste cero", async () => {
    await getCards({ color: "Red", cost: 0 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&cost=0");
  });

  it("combina página, búsqueda, tipo y coste", async () => {
    await getCards({ color: "Red", page: 2, q: "luffy", type: "CHARACTER", cost: 4 });

    expect(get).toHaveBeenCalledWith("/cards?limit=20&color=Red&page=2&q=luffy&type=CHARACTER&cost=4");
  });

  it("devuelve lo que responde la API", async () => {
    const payload = { items: [], total: 7, page: 2, totalPages: 4 };

    get.mockResolvedValueOnce(payload);

    await expect(getCards({ color: "Red" })).resolves.toBe(payload);
  });
});
