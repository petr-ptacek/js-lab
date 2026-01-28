import path                          from "node:path";

import { mergeConfig, defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: {
      "@petr-ptacek/vue-test-utils": path.resolve(
        __dirname,
        "../vue-test-utils/src",
      ),
    },
  },
}));
