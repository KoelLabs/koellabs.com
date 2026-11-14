import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import test from 'node:test';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(
  await fs.readFile(path.join(root, 'lib/generated/images.json'), 'utf8'),
);
const publicFile = src => path.join(root, 'public', src);
const pixels = input => sharp(input).ensureAlpha().raw().toBuffer();

test('all responsive URLs exist, are content-hashed, and preserve aspect ratio', async () => {
  for (const [source, asset] of Object.entries(manifest)) {
    for (const variant of asset.variants) {
      const data = await fs.readFile(publicFile(variant.src));
      const hash = crypto.createHash('sha256').update(data).digest('hex').slice(0, 20);
      assert.equal(path.basename(variant.src).split('.')[0], hash, source);
      assert.equal(data.length, variant.bytes, source);
      const metadata = await sharp(data).metadata();
      assert.equal(metadata.width, variant.width, source);
      assert.ok(variant.width <= asset.width, `must not upscale ${source}`);
      assert.ok(
        Math.abs(metadata.height - (asset.height * variant.width) / asset.width) <= 1,
        source,
      );
    }
  }
});

test('shared paper artwork retains lossless variants for thumbnail and large research uses', async () => {
  for (const source of [
    '/images/paperSLT.png',
    '/images/paper.png',
    '/blog/slt-2026/paper-cover.webp',
  ]) {
    const asset = manifest[source];
    const selected = [asset.variants[0], asset.variants.at(-1)];
    assert.ok(selected[1].width > selected[0].width * 3);
    for (const variant of selected) {
      const expected = await sharp(publicFile(source))
        .rotate()
        .resize({ width: variant.width })
        .ensureAlpha()
        .raw()
        .toBuffer();
      assert.ok(
        (await pixels(publicFile(variant.src))).equals(expected),
        `${source} at ${variant.width}px`,
      );
    }
  }
});

test('avatars stay lossless at 1x, 2x, and 3x while the original portraits are retained', async () => {
  let bytes = 0;
  for (const person of ['alex', 'aruna', 'ruslan']) {
    const source = `/images/avatar-${person}.png`;
    const asset = manifest[source];
    assert.deepEqual(
      asset.variants.map(v => v.width),
      [24, 48, 72],
    );
    for (const variant of asset.variants) {
      const expected = await sharp(publicFile(source))
        .resize({ width: variant.width })
        .ensureAlpha()
        .raw()
        .toBuffer();
      assert.ok((await pixels(publicFile(variant.src))).equals(expected));
    }
    bytes += asset.variants.at(-1).bytes;
    assert.equal((await sharp(publicFile(source)).metadata()).width, 256);
  }
  assert.ok(bytes < 30_000, `${bytes} bytes for 3x avatars`);
});

test('paper hero SVGs preserve their vector geometry and every embedded bitmap pixel', async () => {
  for (const directory of ['slt-2026', 'interspeech-2026']) {
    const source = `/blog/${directory}/paper-hero.svg`;
    const variant = manifest[source].variants[0];
    const before = await fs.readFile(publicFile(source), 'utf8');
    const after = await fs.readFile(publicFile(variant.src), 'utf8');
    const embedded = /data:image\/(?:png|jpeg|webp);base64,([^"\s]+)/g;
    const oldImages = [...before.matchAll(embedded)];
    const newImages = [...after.matchAll(embedded)];
    assert.equal(newImages.length, oldImages.length);
    assert.equal(after.replace(embedded, 'BITMAP'), before.replace(embedded, 'BITMAP'));
    for (let i = 0; i < oldImages.length; i++) {
      const original = await pixels(Buffer.from(oldImages[i][1], 'base64'));
      const optimized = await pixels(Buffer.from(newImages[i][1], 'base64'));
      assert.ok(optimized.equals(original), `${source}: embedded image ${i}`);
    }
    assert.ok(variant.bytes < (await fs.stat(publicFile(source))).size * 0.35);
  }
});

test('UI screenshots and diagrams stay lossless at their rendered resolutions', async () => {
  for (const source of [
    '/images/blog/new-look/5-opt.png',
    '/images/blog/new-look/7.jpeg',
    '/blog/transformer/image-ten.png',
  ]) {
    const variant = manifest[source].variants.find(v => v.width >= 960);
    const expected = await sharp(publicFile(source))
      .rotate()
      .resize({ width: variant.width })
      .ensureAlpha()
      .raw()
      .toBuffer();
    assert.ok((await pixels(publicFile(variant.src))).equals(expected), source);
  }
});

test('photograph variants retain high pixel fidelity to the resized originals', async () => {
  for (const source of [
    '/images/aboutTeam.jpg',
    '/images/alexShot.jpg',
    '/images/frontpage/1-group.jpg',
  ]) {
    const asset = manifest[source];
    const variant = asset.variants.find(v => v.width >= 960) ?? asset.variants.at(-1);
    const expected = await sharp(publicFile(source))
      .rotate()
      .resize({ width: variant.width })
      .removeAlpha()
      .raw()
      .toBuffer();
    const actual = await sharp(publicFile(variant.src)).removeAlpha().raw().toBuffer();
    assert.equal(actual.length, expected.length);
    let squaredError = 0;
    for (let i = 0; i < actual.length; i++) squaredError += (actual[i] - expected[i]) ** 2;
    const psnr = 10 * Math.log10(255 ** 2 / (squaredError / actual.length));
    assert.ok(psnr >= 38, `${source}: PSNR ${psnr.toFixed(2)} dB`);
  }
});
