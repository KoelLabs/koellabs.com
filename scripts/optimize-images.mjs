// Generate responsive assets before dev/build. Originals stay available for downloads and reuse.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'public/optimized');
const manifestPath = path.join(root, 'lib/generated/images.json');
const widths = [320, 640, 960, 1600, 2560];
const encoderVersion = `responsive-v3-sharp-${sharp.versions.sharp}-webp-${sharp.versions.webp}`;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    }),
  );
  return groups.flat();
}

const sources = new Set();
for (const directory of ['app', 'components']) {
  for (const file of await walk(path.join(root, directory))) {
    if (!/\.[jt]sx?$/.test(file)) continue;
    const code = await fs.readFile(file, 'utf8');
    for (const match of code.matchAll(
      /['"`](\/(?:images|blog)\/[^'"`?${}]+\.(?:png|jpe?g|webp|svg))['"`]/g,
    )) {
      sources.add(match[1]);
    }
  }
}
// These paper assets are referenced via template literals in post metadata.
for (const directory of ['slt-2026', 'interspeech-2026']) {
  for (const file of await fs.readdir(path.join(root, 'public/blog', directory))) {
    if (/\.(?:webp|svg)$/.test(file)) sources.add(`/blog/${directory}/${file}`);
  }
}

await fs.mkdir(output, { recursive: true });
let previous = {};
try {
  previous = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
} catch {}
const manifest = {};
const written = new Set();
const digest = buffer => crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 20);
async function write(buffer, extension) {
  const name = `${digest(buffer)}.${extension}`;
  const url = `/optimized/${name}`;
  written.add(name);
  try {
    await fs.access(path.join(output, name));
  } catch {
    await fs.writeFile(path.join(output, name), buffer);
  }
  return url;
}

for (const source of [...sources].sort()) {
  if (/\/paper-og\.jpg$/.test(source)) continue; // Social cards are served as originals, not page images.
  let input;
  try {
    input = await fs.readFile(path.join(root, 'public', source));
  } catch {
    continue;
  } // Remote/dynamic routes and missing legacy placeholders use their original URLs.
  const sourceHash = digest(Buffer.concat([Buffer.from(encoderVersion), input]));
  const cached = previous[source];
  const cachedFiles =
    cached?.variants?.map(variant => path.join(root, 'public', variant.src)) ?? [];
  if (
    cached?.sourceHash === sourceHash &&
    cachedFiles.length &&
    (
      await Promise.all(
        cachedFiles.map(file =>
          fs.access(file).then(
            () => true,
            () => false,
          ),
        ),
      )
    ).every(Boolean)
  ) {
    manifest[source] = cached;
    cached.variants.forEach(variant => written.add(path.basename(variant.src)));
    continue;
  }
  const metadata = await sharp(input).metadata();
  const rotated = (metadata.orientation ?? 1) >= 5;
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  if (!width || !height) throw new Error(`Missing dimensions: ${source}`);

  if (source.endsWith('.svg')) {
    let svg = input.toString();
    const embedded = [...svg.matchAll(/data:image\/(?:png|jpeg);base64,([^"\s]+)/g)];
    if (!embedded.length) continue; // True vector diagrams remain untouched and resolution independent.
    for (const match of embedded) {
      const raster = Buffer.from(match[1], 'base64');
      const webp = await sharp(raster).webp({ lossless: true, effort: 6 }).toBuffer();
      if (webp.length < raster.length)
        svg = svg.replace(match[0], `data:image/webp;base64,${webp.toString('base64')}`);
    }
    const bytes = Buffer.from(svg);
    manifest[source] = {
      sourceHash,
      width,
      height,
      encoding: 'lossless-svg',
      variants: [{ width, src: await write(bytes, 'svg'), bytes: bytes.length }],
    };
    continue;
  }

  const avatar = /\/avatar-(?:alex|aruna|ruslan)\.png$/.test(source);
  // Text, charts, UI screenshots, and paper covers stay lossless. Only actual photographs use Q95.
  const photo =
    !source.includes('/blog/new-look/') &&
    !source.startsWith('/images/paper') &&
    !source.startsWith('/images/leaderboard') &&
    (/\.jpe?g$/i.test(source) || source === '/images/research.png');
  // Body screenshots render at <=768 CSS pixels, covers at <=600, gallery photos at <=700.
  // These caps cover high-DPI displays without shipping unused 4K derivatives in Azure's bundle.
  const cap =
    source.endsWith('/paper-cover.webp') ||
    source.includes('/frontpage/') ||
    source === '/images/research.png'
      ? 1920
      : 2560;
  const maximum = Math.min(width, cap);
  const requested = avatar ? [24, 48, 72] : [...widths.filter(value => value < maximum), maximum];
  const variants = [];
  for (const size of [...new Set(requested)].sort((a, b) => a - b)) {
    let bytes = await sharp(input)
      .rotate()
      .resize({ width: size, withoutEnlargement: true })
      .webp(photo ? { quality: 95, effort: 6 } : { lossless: true, effort: 6 })
      .toBuffer();
    let extension = 'webp';
    // At native resolution prefer the original when it's smaller; no extra generation loss.
    if (
      size === width &&
      (!metadata.orientation || metadata.orientation === 1) &&
      input.length < bytes.length
    ) {
      bytes = input;
      extension = path.extname(source).slice(1);
    }
    variants.push({ width: size, src: await write(bytes, extension), bytes: bytes.length });
  }
  manifest[source] = {
    sourceHash,
    width,
    height,
    encoding: photo ? 'photo-q95' : 'lossless',
    variants,
  };
}

await fs.mkdir(path.dirname(manifestPath), { recursive: true });
const json = JSON.stringify(manifest, null, 2) + '\n';
if (JSON.stringify(previous, null, 2) + '\n' !== json) await fs.writeFile(manifestPath, json);
// Remove stale derivatives, never original assets or anything outside this generated directory.
for (const file of await fs.readdir(output)) {
  if (!written.has(file) && /^[a-f0-9]{20}\.(?:webp|png|jpe?g|svg)$/.test(file))
    await fs.unlink(path.join(output, file));
}
console.log(
  `Responsive images ready: ${Object.keys(manifest).length} sources, ${written.size} variants.`,
);
