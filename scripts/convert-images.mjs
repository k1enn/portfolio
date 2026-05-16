import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = new URL("../public/images/", import.meta.url).pathname;
const MAX_WIDTH = 1280;
const QUALITY = 78;

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let totalBefore = 0;
let totalAfter = 0;

for (const file of pngs) {
  const src = join(DIR, file);
  const { name } = parse(file);
  const dst = join(DIR, `${name}.webp`);

  const before = (await stat(src)).size;
  totalBefore += before;

  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(dst);

  const after = (await stat(dst)).size;
  totalAfter += after;

  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(`${file} -> ${name}.webp  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (-${pct}%)`);
}

console.log(`\nTotal: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB  (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
