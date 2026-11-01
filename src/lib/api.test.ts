import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api, ApiError } from "./api";

const fetchMock = vi.fn();

function respond(body: string, status = 200) {
  fetchMock.mockResolvedValueOnce(new Response(body, { status }));
}

describe("ApiError", () => {
  it("guarda status, body y nombre", () => {
    const error = new ApiError(404, { message: "no" });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ApiError");
    expect(error.status).toBe(404);
    expect(error.body).toEqual({ message: "no" });
    expect(error.message).toBe("Error 404 en la API");
  });
});

describe("api", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("get hace GET con Accept y sin Content-Type", async () => {
    respond(JSON.stringify({ ok: true }));

    const data = await api.get("/ping");

    expect(data).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/ping", {
      method  : "GET",
      headers : { Accept: "application/json" },
      body    : undefined,
    });
  });

  it("get acepta opciones y headers extra", async () => {
    respond("{}");

    await api.get("/ping", { headers: { Authorization: "Bearer x" }, cache: "no-store" });

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/ping", {
      method  : "GET",
      cache   : "no-store",
      headers : { Accept: "application/json", Authorization: "Bearer x" },
      body    : undefined,
    });
  });

  it("post envía body JSON con Content-Type", async () => {
    respond(JSON.stringify({ id: 1 }));

    const data = await api.post("/decks", { name: "a" });

    expect(data).toEqual({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/decks", {
      method  : "POST",
      headers : { Accept: "application/json", "Content-Type": "application/json" },
      body    : JSON.stringify({ name: "a" }),
    });
  });

  it("post sin body no envía Content-Type", async () => {
    respond("");

    await api.post("/decks");

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/decks", {
      method  : "POST",
      headers : { Accept: "application/json" },
      body    : undefined,
    });
  });

  it("put envía body JSON", async () => {
    respond("{}");

    await api.put("/decks/1", { name: "b" }, { cache: "no-store" });

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/decks/1", {
      method  : "PUT",
      cache   : "no-store",
      headers : { Accept: "application/json", "Content-Type": "application/json" },
      body    : JSON.stringify({ name: "b" }),
    });
  });

  it("delete hace DELETE", async () => {
    respond("");

    await api.delete("/decks/1");

    expect(fetchMock).toHaveBeenCalledWith("http://api.test/decks/1", {
      method  : "DELETE",
      headers : { Accept: "application/json" },
      body    : undefined,
    });
  });

  it("devuelve undefined si la respuesta no tiene cuerpo", async () => {
    respond("");

    await expect(api.get("/empty")).resolves.toBeUndefined();
  });

  it("devuelve el texto si el cuerpo no es JSON", async () => {
    respond("texto plano");

    await expect(api.get("/text")).resolves.toBe("texto plano");
  });

  it("lanza ApiError con status y body si la respuesta no es ok", async () => {
    respond(JSON.stringify({ message: "boom" }), 500);

    const error = await api.get("/fail").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 500, body: { message: "boom" } });
  });
});
