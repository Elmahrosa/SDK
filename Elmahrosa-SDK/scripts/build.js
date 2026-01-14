import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("src");
const outDir = path.resolve("dist");

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// Minimal build: copy ESM source to dist (starter scaffold).
// Replace later with tsup/rollup if you move to TypeScript.
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const item of fs.readdirSync(from)) {
    const a = path.join(from, item);
    const b = path.join(to, item);
    const stat = fs.statSync(a);
    if (stat.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}
copyDir(srcDir, outDir);
console.log("Built -> dist/ (starter copy build)");
