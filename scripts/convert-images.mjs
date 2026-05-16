import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = new URL("../public/images/", import.meta.url).pathname;
const WIDTHS = [400, 800, 1280];
const QUALITY = 78;

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let totalBefore = 0;
let totalAfter = 0;

for (const file of pngs) {
  const src = join(DIR, file);
  const { name } = parse(file);
  const before = (await stat(src)).size;
  totalBefore += before;

  for (const w of WIDTHS) {
    const dst = join(DIR, w === 1280 ? `${name}.webp` : `${name}-${w}w.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(dst);
    const after = (await stat(dst)).size;
    totalAfter += after;
    console.log(`${file} @ ${w}w -> ${(after / 1024).toFixed(0)}KB`);
  }
}

console.log(`\nTotal sources: ${(totalBefore / 1024).toFixed(0)}KB -> all variants: ${(totalAfter / 1024).toFixed(0)}KB`);
