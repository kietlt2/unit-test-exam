import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: ["src/services/**/*.ts"],
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100,
      reportsDirectory: './coverage',
    }
  }
});
