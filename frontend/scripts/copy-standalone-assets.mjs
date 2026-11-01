import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error(
    "No .next/standalone found — run this after `next build` with output: 'standalone'.",
  );
  process.exit(1);
}

function copyInto(source, destination) {
  if (!existsSync(source)) {
    console.log(`skipped (not found): ${source}`);
    return;
  }
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
  console.log(
    `copied ${source.replace(`${root}/`, "")} -> ${destination.replace(`${root}/`, "")}`,
  );
}

copyInto(join(root, "public"), join(standalone, "public"));
copyInto(join(root, ".next", "static"), join(standalone, ".next", "static"));
