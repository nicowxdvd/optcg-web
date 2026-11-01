import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

vi.mock("next/image", () => ({
  default: ({ fill, ...props }: { fill?: boolean; src: string; alt: string }) => createElement("img", { ...props, "data-fill": fill }),
}));
