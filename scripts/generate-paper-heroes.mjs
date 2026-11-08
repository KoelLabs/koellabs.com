// Blog covers and social cards for the paper posts. They reuse the three-page fan from the
// research carousel on the home page (components/sections/research.tsx): striped backdrop, two
// faded pages tilted 6° behind the first page, all in white rounded frames.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const papers = [
  {
    directory: 'interspeech-2026',
    pages: ['paper.png', 'paper-p2.jpg', 'paper-p3.jpg'],
  },
  {
    directory: 'slt-2026',
    pages: ['paperSLT.png', 'paperSLT-p2.jpg', 'paperSLT-p3.jpg'],
  },
];

const border = '#e5e5e5';
const inner = 'rgba(0,0,0,.1)';

async function dataUri(file) {
  const bytes = await fs.readFile(path.join(root, 'public/images', file));
  const type = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${type};base64,${bytes.toString('base64')}`;
}

// The carousel card is ~530px wide on desktop; paddings and radii are scaled from there.
// `scale` shrinks the fan around its top edge for the social card.
function fan({ width, height, images, scale = 1, id }) {
  const u = width / 530;
  const pad = 8 * u;
  const outerR = 28 * u;
  const innerR = 20 * u;

  const page = ({ index, left, top, w, rotate, opacity, shadow }) => {
    const h = (w * 19) / 14;
    const iw = w - pad * 2;
    const ih = h - pad * 2;
    const clip = `${id}-clip-${index}`;
    const transform = rotate ? ` transform="rotate(${rotate} ${left + w / 2} ${top + h})"` : '';
    return {
      defs: `<clipPath id="${clip}"><rect x="${left + pad}" y="${top + pad}" width="${iw}" height="${ih}" rx="${innerR}"/></clipPath>`,
      body: `<g${transform}>
    <rect x="${left}" y="${top}" width="${w}" height="${h}" rx="${outerR}" fill="white" stroke="${border}" stroke-width="${u}" filter="url(#${id}-${shadow})"/>
    <g clip-path="url(#${clip})">
      <rect x="${left + pad}" y="${top + pad}" width="${iw}" height="${ih}" fill="white"/>
      <image x="${left + pad}" y="${top + pad}" width="${iw}" height="${ih}" preserveAspectRatio="xMidYMin slice" opacity="${opacity}" href="${images[index]}"/>
    </g>
    <rect x="${left + pad}" y="${top + pad}" width="${iw}" height="${ih}" rx="${innerR}" fill="none" stroke="${inner}" stroke-width="${u}"/>
  </g>`,
    };
  };

  const backW = 0.62 * width * scale;
  const frontW = 0.66 * width * scale;
  const backTop = 0.12 * height + (0.15 - 0.12) * height * scale;
  const frontTop = 0.12 * height;
  const pages = [
    page({ index: 1, left: width / 2 - 0.6 * backW, top: backTop, w: backW, rotate: -6, opacity: 0.6, shadow: 'sm' }),
    page({ index: 2, left: width / 2 - 0.4 * backW, top: backTop, w: backW, rotate: 6, opacity: 0.6, shadow: 'sm' }),
    page({ index: 0, left: width / 2 - frontW / 2, top: frontTop, w: frontW, rotate: 0, opacity: 1, shadow: 'md' }),
  ];

  // repeating-linear-gradient(135deg, #e5e5e5 0 1px, transparent 1px 4.7px), scaled up.
  const period = 4.7 * u * Math.SQRT2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="${id}-stripes" width="${period}" height="${period}" patternUnits="userSpaceOnUse">
      <path d="M${-period / 4} ${period / 4}L${period / 4} ${-period / 4}M0 ${period}L${period} 0M${period * 0.75} ${period * 1.25}L${period * 1.25} ${period * 0.75}" fill="none" stroke="${border}" stroke-width="${u}"/>
    </pattern>
    <filter id="${id}-sm" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${u}" stdDeviation="${1.5 * u}" flood-opacity=".1"/>
    </filter>
    <filter id="${id}-md" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${4 * u}" stdDeviation="${3 * u}" flood-opacity=".1"/>
      <feDropShadow dx="0" dy="${2 * u}" stdDeviation="${2 * u}" flood-opacity=".06"/>
    </filter>
    ${pages.map(p => p.defs).join('\n    ')}
  </defs>
  <rect width="${width}" height="${height}" fill="white"/>
  <rect width="${width}" height="${height}" fill="url(#${id}-stripes)"/>
  ${pages.map(p => p.body).join('\n  ')}
</svg>`;
}

for (const entry of papers) {
  const output = path.join(root, 'public/blog', entry.directory);
  await fs.mkdir(output, { recursive: true });
  const images = await Promise.all(entry.pages.map(dataUri));

  // Post hero: the first page alone, rising out of the bottom of a 4:3 striped frame.
  const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
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
  <image x="202" y="132" width="796" height="1081" href="${images[0]}" clip-path="url(#paper)"/>
  <rect x="202" y="132" width="796" height="1081" rx="44" fill="none" stroke="#e5e5e5"/>
</svg>`;
  await fs.writeFile(path.join(output, 'paper-hero.svg'), hero);

  // Blog card: 16:9, the same frame as the home page carousel.
  const cover = fan({ width: 1600, height: 900, images, id: 'cover' });
  await sharp(Buffer.from(cover), { density: 144 })
    .webp({ quality: 90 })
    .toFile(path.join(output, 'paper-cover.webp'));

  // Social card: 1200×630, the fan slightly smaller so the first page's title clears the
  // link-preview caption.
  const social = fan({ width: 1200, height: 630, images, scale: 0.9, id: 'og' });
  await sharp(Buffer.from(social), { density: 144 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(output, 'paper-og.jpg'));
}
