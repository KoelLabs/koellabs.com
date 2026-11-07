// Reuse the paper shown on /research, with the same striped backdrop and frame.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const papers = [
  { image: 'paper.png', directory: 'interspeech-2026' },
  { image: 'paperSLT.png', directory: 'slt-2026' },
];

for (const entry of papers) {
  const output = path.join(root, 'public/blog', entry.directory);
  await fs.mkdir(output, { recursive: true });
  const paper = await fs.readFile(path.join(root, 'public/images', entry.image));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <pattern id="stripes" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M-3 3L3-3M0 12L12 0M9 15L15 9" fill="none" stroke="#d4d4d4" stroke-width=".7"/>
    </pattern>
    <clipPath id="paper"><rect x="202" y="132" width="796" height="1081" rx="44"/></clipPath>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity=".04"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="white"/>
  <rect width="1200" height="900" fill="url(#stripes)"/>
  <rect x="186" y="116" width="828" height="1113" rx="60" fill="white" stroke="#e5e5e5" filter="url(#shadow)"/>
  <image x="202" y="132" width="796" height="1081" href="data:image/png;base64,${paper.toString('base64')}" clip-path="url(#paper)"/>
  <rect x="202" y="132" width="796" height="1081" rx="44" fill="none" stroke="#e5e5e5"/>
</svg>`;

  await fs.writeFile(path.join(output, 'paper-hero.svg'), svg);
  await sharp(Buffer.from(svg), { density: 144 }).png().toFile(path.join(output, 'paper-hero.png'));
}
