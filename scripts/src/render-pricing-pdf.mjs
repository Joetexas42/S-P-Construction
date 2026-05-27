#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "../..");
const srcMd = resolve(repoRoot, "docs/pricing/pricing-math.md");
const outPdf = resolve(repoRoot, "docs/pricing/pricing-math.pdf");

const md = readFileSync(srcMd, "utf8");

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return s;
}

function renderMarkdown(src) {
  const lines = src.split("\n");
  const out = [];
  let i = 0;
  const flushList = (stack) => {
    while (stack.length) out.push(`</${stack.pop()}>`);
  };
  const listStack = [];
  let inCode = false;
  let codeBuf = [];
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      if (inCode) {
        out.push(`<pre><code>${esc(codeBuf.join("\n"))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        flushList(listStack);
        inCode = true;
      }
      i++;
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      i++;
      continue;
    }
    // table
    if (/^\|.*\|\s*$/.test(line) && /^\|.*\|\s*$/.test(lines[i + 1] || "") && /---/.test(lines[i + 1])) {
      flushList(listStack);
      const header = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push("<table><thead><tr>" + header.map((h) => `<th>${renderInline(h)}</th>`).join("") + "</tr></thead><tbody>");
      for (const r of rows) {
        out.push("<tr>" + r.map((c) => `<td>${renderInline(c)}</td>`).join("") + "</tr>");
      }
      out.push("</tbody></table>");
      continue;
    }
    let m;
    if ((m = /^(#{1,6})\s+(.*)$/.exec(line))) {
      flushList(listStack);
      out.push(`<h${m[1].length}>${renderInline(m[2])}</h${m[1].length}>`);
      i++;
      continue;
    }
    if (/^---\s*$/.test(line)) {
      flushList(listStack);
      out.push("<hr/>");
      i++;
      continue;
    }
    if ((m = /^(\s*)([-*])\s+(.*)$/.exec(line))) {
      if (!listStack.length) {
        listStack.push("ul");
        out.push("<ul>");
      }
      out.push(`<li>${renderInline(m[3])}</li>`);
      i++;
      continue;
    }
    if ((m = /^(\s*)\d+\.\s+(.*)$/.exec(line))) {
      if (!listStack.length || listStack[listStack.length - 1] !== "ol") {
        flushList(listStack);
        listStack.push("ol");
        out.push("<ol>");
      }
      out.push(`<li>${renderInline(m[2])}</li>`);
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      flushList(listStack);
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${renderInline(buf.join(" "))}</blockquote>`);
      continue;
    }
    if (/^\s*$/.test(line)) {
      flushList(listStack);
      i++;
      continue;
    }
    flushList(listStack);
    const buf = [line];
    i++;
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^#{1,6}\s/.test(lines[i]) && !/^[-*]\s/.test(lines[i]) && !/^\|.*\|\s*$/.test(lines[i]) && !/^```/.test(lines[i]) && !/^>\s?/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(`<p>${renderInline(buf.join(" "))}</p>`);
  }
  flushList(listStack);
  return out.join("\n");
}

const body = renderMarkdown(md);
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Pricing Math — Internal</title>
<style>
  @page { size: Letter; margin: 0.75in; }
  html, body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 10.5pt; color: #1a1a1a; line-height: 1.45; }
  body { max-width: 7.5in; margin: 0 auto; }
  h1 { font-size: 22pt; margin: 0 0 0.4em; border-bottom: 2px solid #333; padding-bottom: 0.2em; }
  h2 { font-size: 15pt; margin-top: 1.4em; border-bottom: 1px solid #ccc; padding-bottom: 0.15em; page-break-after: avoid; }
  h3 { font-size: 12.5pt; margin-top: 1.1em; page-break-after: avoid; }
  h4 { font-size: 11pt; margin-top: 0.9em; page-break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
  code { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 0.92em; background: #f3f3f3; padding: 0.05em 0.3em; border-radius: 3px; }
  pre { background: #f5f5f5; padding: 0.6em 0.8em; border-radius: 4px; overflow-x: auto; page-break-inside: avoid; }
  pre code { background: transparent; padding: 0; }
  blockquote { border-left: 3px solid #bbb; margin: 0.8em 0; padding: 0.1em 0.9em; color: #555; background: #fafafa; }
  table { border-collapse: collapse; width: 100%; margin: 0.8em 0; font-size: 9.5pt; page-break-inside: avoid; }
  th, td { border: 1px solid #ccc; padding: 4px 6px; text-align: left; vertical-align: top; }
  th { background: #f0f0f0; }
  hr { border: none; border-top: 1px solid #ddd; margin: 1.4em 0; }
  ul, ol { padding-left: 1.4em; }
</style></head><body>${body}</body></html>`;

const tmp = mkdtempSync(join(tmpdir(), "pricing-pdf-"));
const htmlPath = join(tmp, "doc.html");
writeFileSync(htmlPath, html);

const args = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${outPdf}`,
  `file://${htmlPath}`,
];
const res = spawnSync("chromium", args, { encoding: "utf8" });
if (res.status !== 0) {
  console.error("chromium stderr:", res.stderr);
  console.error("chromium stdout:", res.stdout);
  process.exit(res.status ?? 1);
}
rmSync(tmp, { recursive: true, force: true });
console.log("Wrote", outPdf);
