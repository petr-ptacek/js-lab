import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fg from "fast-glob";

import type { Meta } from "../../../src/_internal/meta";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_ROOT = path.resolve(__dirname, "../../../src");
const DOCS_ROOT = path.resolve(__dirname, "../../api");
const DATA_OUTPUT = path.resolve(__dirname, "../data/utilities.json");

/* -------------------------------------------------- */
/* CLEAN OUTPUT                                       */

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
/* LOAD META MODULE                                   */

/* -------------------------------------------------- */

async function loadMeta(file: string): Promise<{ meta: Meta; utilDir: string } | null> {
  const modulePath = path.join(SRC_ROOT, file);
  const mod = await import(pathToFileURL(modulePath).href);

  if (!mod.meta) {
    console.warn(`Skipping meta-less module: ${file}`);
    return null;
  }

  return {
    meta: mod.meta,
    utilDir: path.dirname(modulePath),
  };
}

function buildFrontmatter(meta: Meta): string {
  const tags = meta.tags ?? [];

  const title = meta.name;

  const categoryBlock = meta.category ? `\ncategory: ${meta.category}` : "";

  const tagsBlock =
    tags.length > 0
      ? `
tags:
${tags.map((t) => `  - ${t}`).join("\n")}`
      : "";

  const sinceBlock = meta.since ? `\nsince: ${meta.since}` : "";

  return `---
title: ${title}${categoryBlock}${tagsBlock}${sinceBlock}
---
`;
}

/* -------------------------------------------------- */
/* README                                             */

/* -------------------------------------------------- */

function loadReadme(utilDir: string): string {
  const readmePath = path.join(utilDir, "README.md");

  if (!fs.existsSync(readmePath)) {
    return "";
  }

  return fs.readFileSync(readmePath, "utf8");
}

/* -------------------------------------------------- */
/* SNIPPETS                                           */

/* -------------------------------------------------- */

function loadSnippets(utilDir: string): string {
  const snippetsDir = path.join(utilDir, "snippets");

  if (!fs.existsSync(snippetsDir)) {
    return "";
  }

  const files = fs.readdirSync(snippetsDir);

  let content = "";

  for (const file of files) {
    const snippetPath = path.join(snippetsDir, file);
    const code = fs.readFileSync(snippetPath, "utf8");

    content += `### ${file}

\`\`\`ts
${code}
\`\`\`

`;
  }

  return content;
}

/* -------------------------------------------------- */
/* DEMO                                               */

/* -------------------------------------------------- */

function loadDemo(utilDir: string): string {
  const demoDir = path.join(utilDir, "demo");

  if (!fs.existsSync(demoDir)) {
    return "";
  }

  const files = fs.readdirSync(demoDir);

  let content = "";

  for (const file of files) {
    const componentName = "Demo" + file.replace(".vue", "").replace(/^\w/, (c) => c.toUpperCase());

    const importPath = path.relative(path.resolve(__dirname, "../../"), path.join(demoDir, file));

    content += `
<script setup>
import ${componentName} from '/${importPath}'
</script>

<${componentName} />

`;
  }

  return content;
}

/* -------------------------------------------------- */
/* MARKDOWN TEMPLATE                                  */

/* -------------------------------------------------- */

function buildMarkdown(meta: Meta, readme: string, snippets: string, demo: string): string {
  const frontmatter = buildFrontmatter(meta);
  const metaPanel = buildMetaPanel(meta);

  return `${frontmatter}

${metaPanel}

${readme}

${
  snippets
    ? `## Snippets

${snippets}`
    : ""
}

${
  demo
    ? `## Demo

${demo}`
    : ""
}
`;
}

/* -------------------------------------------------- */
/* WRITE DOC FILE                                     */

/* -------------------------------------------------- */

function writeDoc(meta: Meta, markdown: string) {
  const categoryDir = path.join(DOCS_ROOT, meta.category);

  fs.mkdirSync(categoryDir, { recursive: true });

  const filePath = path.join(categoryDir, `${meta.id}.md`);

  fs.writeFileSync(filePath, markdown);
}

/* -------------------------------------------------- */
/* WRITE UTILITIES JSON                               */

/* -------------------------------------------------- */

function writeUtilitiesJson(utilities: Meta[]) {
  utilities.sort((a, b) => a.name.localeCompare(b.name));

  const categories: Record<string, Meta[]> = {};

  for (const util of utilities) {
    if (!categories[util.category]) {
      categories[util.category] = [];
    }

    categories[util.category].push(util);
  }

  fs.writeFileSync(
    DATA_OUTPUT,
    JSON.stringify(
      {
        utilities,
        categories,
      },
      null,
      2,
    ),
  );
}

function writeCategoryIndex(category: string, utilities: Meta[]) {
  const categoryDir = path.join(DOCS_ROOT, category);

  const content = `# ${category}

Utilities in the **${category}** category.

<ul>
${utilities.map((u) => `<li><a href="./${u.id}">${u.name}</a> — ${u.description}</li>`).join("\n")}
</ul>
`;

  fs.writeFileSync(path.join(categoryDir, "index.md"), content);
}

function buildMetaPanel(meta: Meta) {
  const tags = meta.tags?.join(", ") ?? "";

  return `> **Category:** ${meta.category}
> **Since:** ${meta.since ?? "—"}
${tags ? `> **Tags:** ${tags}` : ""}
`;
}

function writeApiLanding(categories: Record<string, Meta[]>) {
  const content = `# API

Collection of utilities available in **@petr-ptacek/js-core**.

<div class="vp-grid">

${Object.entries(categories)
  .map(
    ([category, utils]) => `
<a class="vp-card" href="./${category}/">
<h3>${category}</h3>
<p>${utils.length} utilities</p>
</a>`,
  )
  .join("\n")}

</div>
`;

  fs.writeFileSync(path.resolve(__dirname, "../../api/index.md"), content);
}

/* -------------------------------------------------- */
/* MAIN                                               */

/* -------------------------------------------------- */

async function generate() {
  cleanGeneratedDocs();

  const files = await findMetaFiles();

  const utilities: Meta[] = [];

  for (const file of files) {
    const result = await loadMeta(file);

    if (!result) continue;

    const { meta, utilDir } = result;

    const readme = loadReadme(utilDir);
    const snippets = loadSnippets(utilDir);
    const demo = loadDemo(utilDir);

    const markdown = buildMarkdown(meta, readme, snippets, demo);

    writeDoc(meta, markdown);

    utilities.push(meta);
  }

  writeUtilitiesJson(utilities);

  const categories: Record<string, Meta[]> = {};

  for (const util of utilities) {
    if (!categories[util.category]) {
      categories[util.category] = [];
    }

    categories[util.category].push(util);
  }

  for (const [category, utils] of Object.entries(categories)) {
    writeCategoryIndex(category, utils);
  }

  writeApiLanding(categories);

  console.log(`Generated ${utilities.length} utilities`);
  console.log(`Docs output: ${DOCS_ROOT}`);
}

generate();
