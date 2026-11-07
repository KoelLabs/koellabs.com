import snapshot from './leaderboard-snapshot.json';

export const LEADERBOARD_URL = 'https://huggingface.co/spaces/KoelLabs/IPA-Transcription-EN';

export type LeaderboardEntry = {
  model: string;
  size: string;
  average_per: string;
  average_fer: string;
  link: string;
  submission_date: string;
  koel_labs: boolean;
};

export type LeaderboardData = {
  entries: LeaderboardEntry[];
  updated_at: string;
  fetched_at?: string;
  source: 'huggingface' | 'snapshot';
};

export const fallbackLeaderboard: LeaderboardData = { ...snapshot, source: 'snapshot' };

export function leaderboardDate(date: string) {
  return new Date(date.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Only parse the public, aggregate HTML table returned by Gradio. Never render upstream HTML.
function decodeText(value: string) {
  const entities = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    '#x27': "'",
    '#39': "'",
  };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
    if (code in entities) return entities[code as keyof typeof entities];
    const point = code.startsWith('#x') ? parseInt(code.slice(2), 16) : Number(code.slice(1));
    return Number.isInteger(point) && point > 0 && point <= 0x10ffff
      ? String.fromCodePoint(point)
      : entity;
  });
}

function textContent(html: string) {
  return decodeText(html.replace(/<[^>]*>/g, '')).trim();
}

function repositoryLink(html: string) {
  const href = html.match(/<a\b[^>]*\bhref="([^"]*)"/i)?.[1];
  if (!href) return 'N/A';
  try {
    const url = new URL(decodeText(href));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : 'N/A';
  } catch {
    return 'N/A';
  }
}

export function parseLeaderboardHtml(html: string): LeaderboardEntry[] {
  const required = ['Model', 'Size', 'Average PER', 'Average FER', 'Link', 'Submission Date'];
  for (const table of html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)) {
    const headers = [...table[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map(cell =>
      textContent(cell[1]),
    );
    if (!required.every(header => headers.includes(header))) continue;
    const body = table[1].match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i)?.[1];
    if (!body) throw new Error('Missing leaderboard rows');
    const entries = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(row => {
      const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(cell => cell[1]);
      if (cells.length !== headers.length) throw new Error('Incomplete leaderboard row');
      const cell = (header: string) => cells[headers.indexOf(header)];
      const model = textContent(cell('Model'));
      const average_per = textContent(cell('Average PER'));
      const average_fer = textContent(cell('Average FER'));
      const submission_date = textContent(cell('Submission Date'));
      if (
        !model ||
        !/^\d+(\.\d+)?%$/.test(average_per) ||
        !/^\d+(\.\d+)?%$/.test(average_fer) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(submission_date) ||
        Number.isNaN(Date.parse(submission_date))
      ) {
        throw new Error('Invalid leaderboard row');
      }
      return {
        model,
        size: textContent(cell('Size')),
        average_per,
        average_fer,
        submission_date,
        link: repositoryLink(cell('Link')),
        koel_labs: model.startsWith('Koel Labs '),
      };
    });
    if (!entries.length) throw new Error('Empty leaderboard');
    return entries.sort((a, b) => parseFloat(a.average_fer) - parseFloat(b.average_fer));
  }
  throw new Error('Missing aggregate leaderboard table');
}

export function parseLeaderboardEvent(stream: string): LeaderboardEntry[] {
  for (const event of stream.replace(/\r\n/g, '\n').split('\n\n')) {
    const type = event.match(/^event:\s*(\S+)/m)?.[1];
    if (type === 'error') throw new Error('Hugging Face leaderboard request failed');
    if (type !== 'complete') continue;
    const data = event
      .split('\n')
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trimStart())
      .join('\n');
    const payload: unknown = JSON.parse(data);
    if (!Array.isArray(payload)) throw new Error('Invalid leaderboard response');
    const html = payload.find(value => typeof value === 'string' && value.includes('<table'));
    if (typeof html !== 'string') throw new Error('Missing leaderboard result');
    return parseLeaderboardHtml(html);
  }
  throw new Error('Incomplete leaderboard event');
}
