import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { modules } from "../modules";
import { resolveModulePath } from "../.vitepress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, "../api/index.md");

function generate() {
  let md = `# API

This page provides an overview of all available API modules.

`;

  modules.forEach(({ key, module }) => {
    md += `## ${module.title}\n\n`;

    if (module.description) {
      md += `${module.description}\n\n`;
    }

    for (const symbol of module.symbols) {
      const link = resolveModulePath(key, symbol.name, symbol.kind);
      md += `- [\`${symbol.name}\`](${link})\n`;
    }

    md += "\n";
  });

  writeFileSync(outputPath, md, "utf-8");
}

generate();
