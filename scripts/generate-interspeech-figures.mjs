/**
 * Rebuild the last Interspeech poster's figures as self-contained SVG artwork.
 * Labels are outlined so rendering never depends on the reader's installed fonts.
 * Run with Node 22 after npm install. Times New Roman is needed only to regenerate
 * the dataset table; override FIGURE_SERIF_FONT / FIGURE_SERIF_BOLD_FONT off macOS.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const readFont = require('next/dist/compiled/@next/font/dist/fontkit').default;
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'public/blog/interspeech-2026');
const fonts = Object.fromEntries(
  ['Regular', 'Medium', 'Bold'].map(weight => [
    weight,
    readFont(fs.readFileSync(path.join(root, `public/fonts/OpenRunde-${weight}.woff2`))),
  ]),
);
fonts.Arial = readFont(
  fs.readFileSync(process.env.FIGURE_SANS_FONT || '/System/Library/Fonts/Supplemental/Arial.ttf'),
);
const coatSource = fs.readFileSync(
  path.join(import.meta.dirname, 'interspeech-flag-coat.svg'),
  'utf8',
);
const coatPaths = coatSource.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
fonts.Serif = readFont(
  fs.readFileSync(
    process.env.FIGURE_SERIF_FONT || '/System/Library/Fonts/Supplemental/Times New Roman.ttf',
  ),
);
fonts.SerifBold = readFont(
  fs.readFileSync(
    process.env.FIGURE_SERIF_BOLD_FONT ||
      '/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf',
  ),
);

const escape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const n = value => Number(value.toFixed(4));
const bg = '#f7f7f7';
let glyphs, bounds;
function text(
  label,
  x,
  baseline,
  size,
  { font = 'Regular', fill = '#000', align = 'left', tracking = 0, italic = false } = {},
) {
  const face = fonts[font];
  for (const char of label)
    if (!face.hasGlyphForCodePoint(char.codePointAt(0)))
      throw new Error(`Missing glyph ${char} in ${font}`);
  const run = face.layout(label);
  const scale = size / face.unitsPerEm;
  const width =
    run.positions.reduce((sum, p) => sum + p.xAdvance * scale, 0) +
    Math.max(0, run.glyphs.length - 1) * tracking;
  if (align === 'right') x -= width;
  if (align === 'center') x -= width / 2;
  let advance = 0;
  const paths = run.glyphs
    .map((glyph, i) => {
      const p = run.positions[i];
      const gx = x + advance + p.xOffset * scale;
      const gy = baseline - p.yOffset * scale;
      advance += p.xAdvance * scale + tracking;
      const id = `${font}-${glyph.id}`;
      if (!glyphs.has(id)) glyphs.set(id, glyph.path.toSVG());
      if (glyph.bbox.maxX > glyph.bbox.minX)
        bounds.push([
          gx + glyph.bbox.minX * scale,
          gy - glyph.bbox.maxY * scale,
          gx + glyph.bbox.maxX * scale,
          gy - glyph.bbox.minY * scale,
          label,
        ]);
      return `<use href="#${id}" transform="translate(${n(gx)} ${n(gy)}) scale(${n(scale)} ${n(-scale)})${italic ? ' skewX(10)' : ''}"/>`;
    })
    .join('');
  return `<g fill="${fill}" aria-label="${escape(label)}">${paths}</g>`;
}
function rect(x, y, width, height, fill = '#fff', stroke = 'none', radius = 0, extra = '') {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="0.6" ${extra}/>`;
}
function line(x1, y1, x2, y2, color = '#999', width = 1) {
  return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
}
function arrow(x, y1, y2) {
  return `<path d="M${x} ${y1}V${y2}m-5-5 5 5 5-5" fill="none" stroke="#999" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function frame(x, y, width, height, color = '#bfbfbf') {
  const blue = color === '#8bcbff',
    gold = color === '#f5cd56';
  return `<g filter="url(#${blue ? 'blue-shadow' : gold ? 'gold-shadow' : 'card-shadow'})">${rect(x, y, width, height, blue ? '#eef7ff' : gold ? '#fff6d9' : 'url(#frame-fill)', color, 12)}${rect(x + 5, y + 5, width - 10, height - 10, '#fff', color, 8)}</g>`;
}
function save(name, width, height, draw, padding = 8) {
  glyphs = new Map();
  bounds = [];
  const drawing = draw();
  for (const [x1, y1, x2, y2, label] of bounds) {
    if (x1 < -padding || y1 < -padding || x2 > width + padding || y2 > height + padding)
      throw new Error(`Clipped label in ${name}: ${label} (${x1}, ${y1}, ${x2}, ${y2})`);
  }
  const definitions = [...glyphs].map(([id, d]) => `<path id="${id}" d="${d}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width + 2 * padding}" height="${height + 2 * padding}" viewBox="${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}">
<defs><linearGradient id="frame-fill" x2="0" y2="1"><stop stop-color="#fafafa"/><stop offset="1" stop-color="#f2f2f2"/></linearGradient><filter id="blue-shadow" x="-15%" y="-30%" width="130%" height="170%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#2f7cc3" flood-opacity="0.2"/></filter><filter id="gold-shadow" x="-15%" y="-30%" width="130%" height="170%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#fabd00" flood-opacity="0.2"/></filter><filter id="card-shadow" x="-12%" y="-12%" width="124%" height="132%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="1.2" stdDeviation="2.5" flood-opacity="0.12"/></filter>${definitions}</defs>
${drawing}
</svg>\n`;
  fs.writeFileSync(path.join(output, `${name}.svg`), svg);
  console.log(
    `${name}.svg: ${width + 2 * padding} × ${height + 2 * padding}, ${bounds.length} outlined glyphs`,
  );
}

function spanishFlag() {
  // The same Spanish flag icon, including its small coat of arms, in vector form.
  return `<g transform="translate(516 66)"><defs><clipPath id="flag"><rect width="42" height="28" rx="3"/></clipPath></defs><g clip-path="url(#flag)">
    <path fill="#ad1519" d="M0 0h42v28H0z"/><path fill="#fabd00" d="M0 7h42v14H0z"/>
    <g transform="translate(9 8) scale(0.32432432432432434 0.32558139534883723)">${coatPaths}</g></g><rect x=".3" y=".3" width="41.4" height="27.4" rx="3" fill="none" stroke="none"/></g>`;
}
function ipa(parts, x, y) {
  const size = 21;
  let out = '',
    advance = 0;
  for (const [value, fill] of parts) {
    out += text(value, x + advance, y, size, { font: 'Bold', fill, tracking: -0.55 });
    const run = fonts.Bold.layout(value);
    advance +=
      run.positions.reduce((sum, p) => sum + (p.xAdvance * size) / fonts.Bold.unitsPerEm, 0) +
      run.glyphs.length * -0.55;
  }
  return out;
}
save('g2p-vs-human', 676, 364, () => {
  let s = rect(-8, -8, 692, 380, bg);
  s +=
    frame(80, 52, 492, 57) +
    frame(80, 156, 191, 57) +
    frame(80, 260, 191, 57, '#8bcbff') +
    frame(380, 260, 191, 57, '#f5cd56');
  s +=
    text('Audio', 97, 44, 11.5, { font: 'Arial' }) +
    text('Spanish-Accented Speech', 118, 87.7, 19, { font: 'Bold', tracking: -0.75 });
  s +=
    `<g fill="#111" transform="translate(97 81)"><rect x="0" y="-3" width="1.4" height="6" rx=".7"/><rect x="3" y="-6" width="1.4" height="12" rx=".7"/><rect x="6" y="-4" width="1.4" height="8" rx=".7"/><rect x="9" y="-4" width="1.4" height="8" rx=".7"/><rect x="12" y="-2" width="1.4" height="4" rx=".7"/></g>` +
    spanishFlag();
  s += arrow(231, 114, 149) + arrow(231, 217, 253) + arrow(413, 114, 253);
  s +=
    text('ASR', 241, 136, 11.5, { font: 'Arial' }) +
    text('G2P', 241, 241, 11.5, { font: 'Arial' }) +
    text('Expert Listens', 421, 189, 11.5, { font: 'Arial' });
  s +=
    text('Word · Orthographic', 97, 149, 11.5, { font: 'Arial' }) +
    text('“Shampoo”', 175.5, 192, 19, { font: 'Bold', align: 'center', tracking: -0.8 });
  s +=
    text('G2P · From Spelling', 99, 253, 11.5, { font: 'Arial', fill: '#005b9f' }) +
    text('Human · From Audio', 457, 253, 11.5, { font: 'Arial', fill: '#b87904' });
  s += ipa(
    [
      ['/', '#00294f'],
      ['ʃæ', '#2f7cc3'],
      ['m’pu/', '#00294f'],
    ],
    126,
    296,
  );
  s += ipa(
    [
      ['/', '#2c2100'],
      ['tʃɑ', '#fabd00'],
      ['m’pu/', '#2c2100'],
    ],
    427,
    296,
  );
  s += '<path d="M438 278q8-3.5 16 0" fill="none" stroke="#fabd00" stroke-width="2"/>';
  return s;
});

function trainingPanel(over = false) {
  const left = over ? 44 : 43,
    right = over ? 352 : 350;
  const top = over ? 43 : 38,
    inset = 4;
  const cardW = over ? 279 : 282;
  const modelY = top + 4,
    asrY = over ? 141 : 137;
  const body = (x, extra) => {
    let s = `<g filter="url(#card-shadow)">${rect(x, top, cardW, 260, bg, '#ddd', 8)}</g>`;
    s += rect(x + inset, modelY, cardW - 8, 90, '#fff', '#bed2e1', 4);
    s += text('XLSR Self-Supervised Model', x + 11, modelY + 82, 17.1, {
      font: 'Bold',
      fill: '#003366',
      tracking: -0.65,
    });
    s += rect(x + inset, asrY, cardW - 8, 37, '#fff', '#d5e4db', 4);
    s += text('ASR word transcripts', x + 11, asrY + 23, 13.9, {
      font: 'Bold',
      fill: '#006633',
      tracking: -0.55,
    });
    if (extra) {
      const gy = over ? 183 : 179;
      s += rect(x + inset, gy, cardW - 8, 36, '#fff', '#eee1c6', 4);
      s += text('G2P - 5,300 Hours', x + 11, gy + 23, 13.5, {
        font: 'Bold',
        fill: '#665000',
        tracking: -0.55,
      });
    } else
      s += text('No Extra G2P Stage', x + cardW / 2, over ? 207 : 202, 13.8, {
        font: 'Bold',
        fill: '#686868',
        align: 'center',
        tracking: -0.55,
      });
    if (!over) {
      s += rect(x + inset, 220, cardW - 8, 35, '#fff', '#e0d5e7', 4);
      s += text('G2P labels - 20.4 h', x + 11, 244, 13.5, {
        font: 'Bold',
        fill: '#330066',
        tracking: -0.55,
      });
    }
    const ey = over ? 225 : 262,
      eh = over ? 74 : 33;
    s += rect(x + inset, ey, cardW - 8, eh, '#fff', '#ecd4df', 4);
    s += text(
      over ? (extra ? 'Expert labels - 40.8 h' : 'Expert labels 40.8 h') : 'Expert labels - 20.4 h',
      x + 11,
      over ? 282 : 284,
      13.5,
      { font: 'Bold', fill: '#660033', tracking: -0.55 },
    );
    return s;
  };
  let s = rect(-8, -8, over ? 691 : 692, 456, bg) + rect(-8, 385, over ? 691 : 692, 63, '#fff');
  s += body(left, false) + body(right, true);
  s += text(over ? '3.40%' : '4.60%', left + 11, over ? 335 : 329, 18.8, {
    font: 'Bold',
    tracking: -0.7,
    italic: true,
  });
  s += text(over ? '3.45%' : '4.28%', right + 11, over ? 335 : 329, 18.8, {
    font: 'Bold',
    tracking: -0.7,
    italic: true,
  });
  s += text(over ? '95% CI 3.33-3.46' : '95% CI 4.49-4.70', left + 11, over ? 349 : 344, 9.1, {
    font: 'Arial',
  });
  s += text(over ? '95% CI 3.39-3.52' : '95% CI 4.19-4.37', right + 11, over ? 349 : 344, 9.1, {
    font: 'Arial',
  });
  const tag = over ? 'No significant gain from extra G2P' : 'Extra G2P reduces error at 20.4 h';
  s += rect(over ? 5 : 0, 398, 142, 21, over ? '#fff7e8' : '#e6f4ee');
  s += text(tag, over ? 10 : 6, 412, 8.5, {
    font: 'Arial',
    fill: over ? '#ff9800' : '#00975f',
    tracking: -0.12,
  });
  const edge = over ? 669 : 674;
  const label = over ? 'Over 30 Hours of' : 'Under 30 Hours of';
  if (over) {
    const size = 19.8,
      tracking = -0.8;
    const measure = value =>
      fonts.Bold.layout(value).positions.reduce(
        (sum, p) => sum + (p.xAdvance * size) / fonts.Bold.unitsPerEm,
        0,
      ) +
      (value.length - 1) * tracking;
    const start = edge - measure(label);
    s += text('Over', start, 415, size, { font: 'Bold', fill: '#168fff', tracking });
    s += text(' 30 Hours of', start + measure('Over') + tracking, 415, size, {
      font: 'Bold',
      tracking,
    });
  } else
    s += text(label, edge, 415, 19.8, {
      font: 'Bold',
      fill: '#666',
      align: 'right',
      tracking: -0.8,
    });
  s += text('Human Data', edge, 437, 19.8, {
    font: 'Bold',
    fill: over ? '#000' : '#666',
    align: 'right',
    tracking: -0.8,
  });
  return s;
}
save('threshold-under-30', 676, 440, () => trainingPanel(false));
save('threshold-over-30', 675, 440, () => trainingPanel(true));

save('data', 675, 266, () => {
  let s = rect(-8, -8, 691, 282, bg);
  s +=
    line(20, 24, 644, 24, '#000', 1.2) +
    line(20, 54, 644, 54, '#000', 0.8) +
    line(20, 242, 644, 242, '#000', 1.2);
  s +=
    text('Dataset', 33, 45, 18.5, { font: 'SerifBold' }) +
    text('Speakers', 255, 45, 18.5, { font: 'SerifBold', align: 'center' }) +
    text('Hrs', 333, 45, 18.5, { font: 'SerifBold', align: 'center' }) +
    text('Dialect/L1', 378, 45, 18.5, { font: 'SerifBold' }) +
    text('Test?', 612, 45, 18.5, { font: 'SerifBold', align: 'center' });
  const rows = [
    ['DARPA TIMIT', '630', '5.08', '8 US dialects (eus)', true],
    ['EpaDB', '50', '2.75', 'Argentinian Spanish (arg)', true],
    ['PSST', '107', '3.58', 'Post-stroke aphasia', true],
    ['L2-ARCTIC (scripted)', '24', '3.66', 'vie, cmn, hin, spa, ara, kor', false],
    ['L2-ARCTIC (spont.)', '22', '0.39', 'vie, cmn, hin, spa, ara, kor', false],
    ['Speech Ocean', '250', '2.33', 'Mandarin (cmn)', true],
    ['Buckeye', '40', '26.45', 'Columbus, OH (eus)', false],
    ['DoReCo', '2', '0.79', 'Southern British (eng)', false],
    ['ISLE', '46', '9.72', 'Italian (ita), German (deu)', true],
  ];
  rows.forEach(([name, count, hours, dialect, test], i) => {
    const y = 74 + i * 19.45;
    s +=
      text(name, 33, y, 18.2, { font: 'Serif' }) +
      text(count, 255, y, 18.2, { font: 'Serif', align: 'center' }) +
      text(hours, 333, y, 18.2, { font: 'Serif', align: 'center' }) +
      text(dialect, 378, y, 17.4, { font: 'Serif' });
    s += test
      ? `<path d="M606 ${y - 7}q2 0 4 5 3-10 9-13" fill="none" stroke="#000" stroke-width=".8" stroke-linecap="round"/>`
      : text('–', 612, y, 18.2, { font: 'Serif', align: 'center' });
  });
  return s;
});

save('metrics', 350, 323, () => {
  let s = rect(-8, -8, 366, 339, '#fff') + rect(0, 0, 350, 160, bg) + rect(0, 167, 350, 156, bg);
  const cell = (letter, x, y, fill, stroke) =>
    rect(x, y, 27, 33, fill, stroke, 3) +
    text(letter, x + 13.5, y + 25, 24, {
      font: 'Bold',
      fill: '#353535',
      align: 'center',
      tracking: -0.7,
    });
  for (const [offset, weighted] of [
    [0, false],
    [167, true],
  ]) {
    ['POP', 'BOP', 'IOP'].forEach((word, row) => {
      for (let col = 0; col < 3; col++) {
        const isError = col === 0 && row > 0,
          near = weighted && row === 1 && col === 0;
        s += cell(
          word[col],
          28 + col * 30,
          22 + row * 42 + offset,
          near ? '#ffc072' : isError ? '#ec8888' : '#89cfa9',
          near ? '#bd450c' : isError ? '#c01717' : '#006837',
        );
      }
      if (row) {
        const near = weighted && row === 1,
          score = weighted ? (row === 1 ? '-0.006' : '-0.060') : '-0.33';
        s += rect(
          126,
          21 + row * 42 + offset,
          weighted ? 84 : 71,
          38,
          near ? '#fff4e2' : '#ffe3e3',
          'none',
          19,
        );
        s += text(score, weighted ? 168 : 161.5, 46 + row * 42 + offset, 19, {
          font: 'Medium',
          fill: near ? '#ff9d00' : '#c01717',
          align: 'center',
          tracking: -0.7,
        });
      }
    });
  }
  s +=
    text('Regular', 330, 47, 26, {
      font: 'Bold',
      fill: '#353535',
      align: 'right',
      tracking: -1.1,
    }) +
    text('PER', 330, 83, 26, { font: 'Bold', fill: '#353535', align: 'right', tracking: -1.1 });
  s +=
    text('Weighted', 330, 215, 26, {
      font: 'Bold',
      fill: '#353535',
      align: 'right',
      tracking: -1.1,
    }) +
    text('PER', 330, 251.5, 26, { font: 'Bold', fill: '#353535', align: 'right', tracking: -1.1 });
  return s;
});

save('unseen-accents', 675, 108, () => {
  let s = rect(-8, -8, 691, 124, bg);
  const rows = [
    ['XLSR + Experts', 555, 563, 525, 598, '3.84%'],
    ['+ ASR', 463, 470, 435, 504, '3.62%'],
    ['+ ASR + G2P', 489, 496, 467, 535, '3.69%'],
  ];
  rows.forEach(([label, width, dot, low, high, score], i) => {
    const y = 8 + i * 31;
    s +=
      rect(7, y, width, 26, '#fff', '#aaa', 5.5) + text(label, 15, y + 17, 9.8, { font: 'Arial' });
    s += `<path d="M${low} ${y + 13}H${high}M${low} ${y + 7}v12M${high} ${y + 7}v12" stroke="#aaa" stroke-width=".7" fill="none"/><rect x="${dot - 4.5}" y="${y + 10}" width="9" height="6" rx="1.8" fill="#999"/>`;
    s += text(score, 658, y + 19, 15.3, { align: 'right', tracking: -0.4 });
  });
  return s;
});
