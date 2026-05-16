const sharp = require('sharp');
const path = require('path');

const TREX_DIR = path.join(__dirname, '..', 'public', 'trex');
const PLAN_DIR = path.join(__dirname, '..', 'plans', '260516-1430-trex-theme-integration');
const LUM_THRESHOLD = 200;

async function recolor(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let bg = 0, fg = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = (r * 0.299 + g * 0.587 + b * 0.114) | 0;

    data[i] = 0x1a; data[i + 1] = 0x1a; data[i + 2] = 0x1a;
    if (lum >= LUM_THRESHOLD) {
      data[i + 3] = 0;
      bg++;
    } else {
      data[i + 3] = 255;
      fg++;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return { width: info.width, height: info.height, bg, fg };
}

(async () => {
  for (const name of ['sprite-1x.png', 'sprite-2x.png']) {
    const input = path.join(PLAN_DIR, name + '.bak');
    const output = path.join(TREX_DIR, name);
    const r = await recolor(input, output);
    console.log(`${name}: ${r.width}x${r.height}, bg=${r.bg}, fg=${r.fg}`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
