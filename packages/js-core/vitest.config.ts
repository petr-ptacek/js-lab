import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.ts"],
      coverage: {
        provider: "v8", // nebo 'c8'
        reporter: ["text", "html", "json"],
        exclude: [
          "src/_internal/**",
          "dist/**",
          "node_modules/**",
          "**/*.d.ts",
          "**/*.config.*",
          "**/coverage/**",
        ],
        thresholds: {
          global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },
        },
      },
    },
  }),
);
