import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "./layout";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

vi.mock("next/font/google", () => {
  const font = ({ variable }: { variable: string }) => ({ variable });

  return { Outfit: font, Fraunces: font, Geist_Mono: font };
});

vi.mock("./globals.css", () => ({}));

describe("RootLayout", () => {
  it("define el título", () => {
    expect(metadata.title).toBe("OPTCG");
  });

  it("renderiza html en español con header, hijos y script de tema", () => {
    const html = renderToStaticMarkup(<RootLayout {...({ children: <p>contenido</p> } as Parameters<typeof RootLayout>[0])} />);

    expect(html).toContain('<html lang="es"');
    expect(html).toContain("--font-outfit");
    expect(html).toContain("--font-fraunces");
    expect(html).toContain("--font-geist-mono");
    expect(html).toContain('localStorage.getItem("theme")');
    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<p>contenido</p>");
  });
});
