import { afterEach, describe, expect, it, vi } from "vitest";

describe("config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("exporta API_URL desde NEXT_PUBLIC_API_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://example.test");

    const { API_URL } = await import("./config");

    expect(API_URL).toBe("http://example.test");
  });

  it("lanza error si falta NEXT_PUBLIC_API_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");

    await expect(import("./config")).rejects.toThrow("Falta la variable de entorno NEXT_PUBLIC_API_URL");
  });
});
