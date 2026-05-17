import fg from "fast-glob";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import type { Meta } from "../../../src/_internal/meta";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_ROOT = path.resolve(__dirname, "../../../src");
const DOCS_ROOT = path.resolve(__dirname, "../../api");
const DATA_OUTPUT = path.resolve(__dirname, "../data/items.json");

/* -------------------------------------------------- */
/* CLEAN                                              */
/* -------------------------------------------------- */

function cleanGeneratedDocs() {
  fs.rmSync(DOCS_ROOT, { recursive: true, force: true });
  fs.mkdirSync(DOCS_ROOT, { recursive: true });
}

/* -------------------------------------------------- */
/* FIND META FILES                                    */
/* -------------------------------------------------- */

async function findMetaFiles(): Promise<string[]> {
  return fg("**/meta.ts", { cwd: SRC_ROOT, ignore: ["**/_internal/**"] });
}

/* -------------------------------------------------- */
/* LOAD META                                          */
/* -------------------------------------------------- */

async function loadMeta(file: string): Promise<{ meta: Meta; itemDir: string } | null> {
  const modulePath = path.join(SRC_ROOT, file);
  const mod = await import(pathToFileURL(modulePath).href);

  if (!mod.meta) {
    console.warn(`Skipping meta-less module: ${file}`);
    return null;
  }

  return {
    meta: mod.meta as Meta,
    itemDir: path.dirname(modulePath),
  };
}

/* -------------------------------------------------- */
/* FRONTMATTER                                        */
/* -------------------------------------------------- */

function buildFrontmatter(meta: Meta): string {
  const tags = meta.tags ?? [];
  const tagsBlock = tags.length > 0 ? `\ntags:\n${tags.map((t) => `  - ${t}`).join("\n")}` : "";
  const sinceBlock = meta.since ? `\nsince: ${meta.since}` : "";

  return `---
title: ${meta.name}
kind: ${meta.kind}${tagsBlock}${sinceBlock}
---
`;
}

function buildMetaPanel(meta: Meta): string {
  const tags = meta.tags?.join(", ") ?? "";
  const badge = meta.experimental ? " *(experimental)*" : meta.deprecated ? " *(deprecated)*" : "";

  return `> **Kind:** ${meta.kind}${badge}
> **Since:** ${meta.since ?? "—"}
${tags ? `> **Tags:** ${tags}` : ""}
`;
}

/* -------------------------------------------------- */
/* README                                             */
/* -------------------------------------------------- */

function loadReadme(itemDir: string): string {
  const readmePath = path.join(itemDir, "README.md");
  return fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
}

/* -------------------------------------------------- */
/* SNIPPETS                                           */
/* Supports .ts and .vue files — uses matching fence  */
/* -------------------------------------------------- */

function loadSnippets(itemDir: string): string {
  const snippetsDir = path.join(itemDir, "snippets");
  if (!fs.existsSync(snippetsDir)) return "";

  const files = fs
    .readdirSync(snippetsDir)
    .filter((f) => f.endsWith(".ts") || f.endsWith(".vue"))
    .sort();

  return files
    .map((file) => {
      const code = fs.readFileSync(path.join(snippetsDir, file), "utf8");
      const fence = file.endsWith(".vue") ? "vue" : "ts";
      return `### ${file}\n\n\`\`\`${fence}\n${code}\`\`\`\n`;
    })
    .join("\n");
}

/* -------------------------------------------------- */
/* DEMO                                               */
/* Multiple .vue files → single <script setup> block  */
/* rendered sequentially with headings                */
/* -------------------------------------------------- */

function toPascalCase(str: string): string {
  return str.replace(/[-_](.)/g, (_, c: string) => c.toUpperCase()).replace(/^(.)/, (_, c: string) => c.toUpperCase());
}

function loadDemo(itemDir: string, generatedMdDir: string): string {
  const demoDir = path.join(itemDir, "demo");
  if (!fs.existsSync(demoDir)) return "";

  const files = fs
    .readdirSync(demoDir)
    .filter((f) => f.endsWith(".vue"))
    .sort();

  if (files.length === 0) return "";

  const components = files.map((file) => {
    const baseName = file.replace(".vue", "");
    const componentName = "Demo" + toPascalCase(baseName);
    const importRelPath = path.relative(generatedMdDir, path.join(demoDir, file));
    return { componentName, importRelPath, baseName };
  });

  const scriptBlock = `<script setup>\n${components.map((c) => `import ${c.componentName} from '${c.importRelPath}'`).join("\n")}\n</script>`;

  const renderBlocks = components
    .map((c) => (files.length > 1 ? `### ${c.baseName}\n\n<${c.componentName} />` : `<${c.componentName} />`))
    .join("\n\n");

  return `${scriptBlock}\n\n${renderBlocks}`;
}

/* -------------------------------------------------- */
/* MARKDOWN ASSEMBLY                                  */
/* -------------------------------------------------- */

function buildMarkdown(meta: Meta, readme: string, snippets: string, demo: string): string {
  const frontmatter = buildFrontmatter(meta);
  const metaPanel = buildMetaPanel(meta);

  const snippetsSection = snippets ? `## Snippets\n\n${snippets}` : "";

  const demoSection = demo ? `## Demo\n\n${demo}` : "";

  return [frontmatter, metaPanel, readme, snippetsSection, demoSection].filter(Boolean).join("\n\n").trimEnd() + "\n";
}

/* -------------------------------------------------- */
/* WRITE DOC FILE                                     */
/* -------------------------------------------------- */

function writeDoc(meta: Meta, markdown: string) {
  const kindDir = path.join(DOCS_ROOT, meta.kind);
  fs.mkdirSync(kindDir, { recursive: true });

  const generatedMdPath = path.join(kindDir, `${meta.id}.md`);
  fs.writeFileSync(generatedMdPath, markdown);

  return generatedMdPath;
}

/* -------------------------------------------------- */
/* WRITE items.json                                   */
/* -------------------------------------------------- */

function writeItemsJson(items: Meta[]) {
  items.sort((a, b) => a.name.localeCompare(b.name));

  const kinds: Record<string, Meta[]> = {};
  for (const item of items) {
    (kinds[item.kind] ??= []).push(item);
  }

  fs.mkdirSync(path.dirname(DATA_OUTPUT), { recursive: true });
  fs.writeFileSync(DATA_OUTPUT, JSON.stringify({ items, kinds }, null, 2));
}

/* -------------------------------------------------- */
/* KIND INDEX PAGES                                   */
/* -------------------------------------------------- */

function writeKindIndex(kind: string, items: Meta[]) {
  const kindDir = path.join(DOCS_ROOT, kind);

  const kindLabel: Record<string, string> = {
    composable: "Composables",
    component: "Components",
    utility: "Utilities",
    type: "Types",
  };

  const content = `# ${kindLabel[kind] ?? kind}

<ul>
${items.map((u) => `<li><a href="./${u.id}">${u.name}</a> — ${u.description ?? ""}</li>`).join("\n")}
</ul>
`;

  fs.writeFileSync(path.join(kindDir, "index.md"), content);
}

/* -------------------------------------------------- */
/* API LANDING                                        */
/* -------------------------------------------------- */

function writeApiLanding(kinds: Record<string, Meta[]>) {
  const content = `# API Reference

All composables, components, and utilities in **@petr-ptacek/vue-core**.

<ApiBrowser />

<div class="vp-grid">

${Object.entries(kinds)
  .map(
    ([kind, items]) => `
<a class="vp-card" href="./${kind}/">
<h3>${kind.charAt(0).toUpperCase() + kind.slice(1)}s</h3>
<p>${items.length} ${items.length === 1 ? "item" : "items"}</p>
</a>`
  )
  .join("\n")}

</div>
`;

  fs.writeFileSync(path.join(DOCS_ROOT, "index.md"), content);
}

/* -------------------------------------------------- */
/* MAIN                                               */
/* -------------------------------------------------- */

async function generate() {
  cleanGeneratedDocs();

  const files = await findMetaFiles();
  const items: Meta[] = [];

  for (const file of files) {
    const result = await loadMeta(file);
    if (!result) continue;

    const { meta, itemDir } = result;
    const generatedMdDir = path.join(DOCS_ROOT, meta.kind);

    const readme = loadReadme(itemDir);
    const snippets = loadSnippets(itemDir);
    const demo = loadDemo(itemDir, generatedMdDir);

    const markdown = buildMarkdown(meta, readme, snippets, demo);
    writeDoc(meta, markdown);

    items.push(meta);
  }

  writeItemsJson(items);

  const kinds: Record<string, Meta[]> = {};
  for (const item of items) {
    (kinds[item.kind] ??= []).push(item);
  }

  for (const [kind, kindItems] of Object.entries(kinds)) {
    writeKindIndex(kind, kindItems);
  }

  writeApiLanding(kinds);

  console.log(`Generated ${items.length} items`);
  console.log(`Output: ${DOCS_ROOT}`);
}

generate();
