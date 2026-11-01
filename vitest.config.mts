import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins : [react()],
  resolve : { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test    : {
    environment : "jsdom",
    setupFiles  : ["./vitest.setup.ts"],
    env         : { NEXT_PUBLIC_API_URL: "http://api.test" },
    coverage    : {
      provider   : "v8",
      include    : ["src/**/*.{ts,tsx}"],
      exclude    : ["src/**/*.test.{ts,tsx}", "src/types/**", "src/test/**"],
      thresholds : { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
});
