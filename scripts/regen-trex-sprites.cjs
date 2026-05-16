const sharp = require('sharp');
const path = require('path');

const TREX_DIR = path.join(__dirname, '..', 'public', 'trex');
const PLAN_DIR = path.join(__dirname, '..', 'plans', '260516-1430-trex-theme-integration');
const FG = [0x1a, 0x1a, 0x1a];
const ALPHA_THRESHOLD = 128;

async function recolor(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const total = info.width * info.height;
  const out = Buffer.alloc(total * 4);

  let fg = 0, bg = 0;
  for (let p = 0; p < total; p++) {
    const src = p * ch;
    const dst = p * 4;
    let alpha;
    if (ch === 4) alpha = data[src + 3];
    else if (ch === 2) alpha = data[src + 1];
    else alpha = 255;

    if (alpha >= ALPHA_THRESHOLD) {
      out[dst] = FG[0]; out[dst + 1] = FG[1]; out[dst + 2] = FG[2]; out[dst + 3] = 255;
      fg++;
    } else {
      out[dst] = 0; out[dst + 1] = 0; out[dst + 2] = 0; out[dst + 3] = 0;
      bg++;
    }
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return { width: info.width, height: info.height, srcChannels: ch, fg, bg };
}

(async () => {
  for (const name of ['sprite-1x.png', 'sprite-2x.png']) {
    const input = path.join(PLAN_DIR, name + '.bak');
    const output = path.join(TREX_DIR, name);
    const r = await recolor(input, output);
    console.log(`${name}: ${r.width}x${r.height}, srcChannels=${r.srcChannels}, fg=${r.fg}, bg=${r.bg}`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
