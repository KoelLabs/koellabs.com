import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const standalone = path.join(root, '.next/standalone');
// Retired dashboard/gallery data is retained in git, but unused by the public website.
const archives = ['images/thumbnails', 'images/dashboard', 'Old-1500.json'];

async function checkReferences(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkReferences(file);
    else if (/\.(?:[cm]?[jt]sx?|html|css|json|md)$/.test(file)) {
      const text = await fs.readFile(file, 'utf8');
      for (const archive of archives) {
        if (text.includes(archive))
          throw new Error(`${file} references ${archive}; restore it to the deployment package.`);
      }
    }
  }
}
for (const directory of ['app', 'components', 'lib', 'pages', 'public/demos']) {
  try {
    await fs.access(path.join(root, directory));
  } catch {
    continue;
  }
  await checkReferences(path.join(root, directory));
}

const publicRoot = path.join(root, 'public');
await fs.rm(path.join(standalone, 'public'), { recursive: true, force: true });
await fs.cp(publicRoot, path.join(standalone, 'public'), {
  recursive: true,
  filter: source => !archives.some(archive => source === path.join(publicRoot, archive)),
});
await fs.rm(path.join(standalone, '.next/static'), { recursive: true, force: true });
await fs.cp(path.join(root, '.next/static'), path.join(standalone, '.next/static'), {
  recursive: true,
});
console.log('Standalone server packaged with responsive assets and the unchanged demo.');
