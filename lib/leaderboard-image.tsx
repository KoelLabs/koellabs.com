import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LeaderboardEntry } from './leaderboard';

// OpenType copy of the site's existing WOFF2 font for the PNG renderer.
const font = readFile(path.join(process.cwd(), 'public/fonts/OpenRunde-Medium.otf'));

const layouts = {
  hero: {
    file: 'blogLeaderboardsAlt.png',
    width: 2265,
    height: 1182,
    left: 310,
    fontSize: 41,
    tracking: -1.4,
    baselines: [287, 398, 504, 615, 725, 836, 947],
    patches: [
      [247, 305],
      [358, 415],
      [464, 521],
      [575, 628],
      [685, 742],
      [796, 848],
      [907, 963],
    ],
    patchLeft: 300,
    patchWidth: 1500,
    fadeStart: 850,
    fadeEnd: 1000,
  },
  thumbnail: {
    file: 'blogLeaderboards.png',
    width: 1510,
    height: 788,
    left: 207,
    fontSize: 27.33,
    tracking: -0.93,
    baselines: [335, 409, 480, 554, 627],
    patches: [
      [308, 347],
      [382, 421],
      [453, 492],
      [527, 563],
      [600, 639],
    ],
    patchLeft: 200,
    patchWidth: 1000,
    fadeStart: 570,
    fadeEnd: 662,
  },
} as const;

export type LeaderboardImageVariant = keyof typeof layouts;
const artwork = new Map<string, Promise<Buffer>>();

export async function leaderboardImage(
  entries: LeaderboardEntry[],
  variant: LeaderboardImageVariant,
) {
  const layout = layouts[variant];
  if (!artwork.has(layout.file)) {
    artwork.set(layout.file, readFile(path.join(process.cwd(), 'public/images', layout.file)));
  }
  const [background, typeface] = await Promise.all([artwork.get(layout.file)!, font]);
  const src = `data:image/png;base64,${background.toString('base64')}`;
  const element = (
    <div
      style={{ display: 'flex', position: 'relative', width: layout.width, height: layout.height }}
    >
      <img
        src={src}
        width={layout.width}
        height={layout.height}
        alt=""
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      {/* Replace only the old label areas. Everything else is the original artwork. */}
      {layout.patches.map(([top, bottom], index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            position: 'absolute',
            left: layout.patchLeft,
            top,
            width: layout.patchWidth,
            height: bottom - top,
            background: index % 2 ? '#f8f8f9' : '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              left: layout.left - layout.patchLeft,
              top: layout.baselines[index] - top - (layout.fontSize * 2728) / 2816,
              color: '#363636',
              fontFamily: 'OpenRunde',
              fontSize: layout.fontSize,
              fontWeight: 500,
              lineHeight: 3408 / 2816,
              letterSpacing: layout.tracking,
              whiteSpace: 'nowrap',
            }}
          >
            {entries[index] ? `${index + 1}. ${entries[index].model}` : ''}
          </div>
          {bottom > layout.fadeStart && (
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) ${layout.fadeStart - top}px, white ${layout.fadeEnd - top}px)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
  return { element, font: typeface, width: layout.width, height: layout.height };
}
