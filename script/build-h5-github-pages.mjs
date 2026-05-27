import { spawnSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const manifestPath = new URL('../src/manifest.json', import.meta.url);
const indexPath = new URL('../dist/build/h5/index.html', import.meta.url);
const fallbackPath = new URL('../dist/build/h5/404.html', import.meta.url);

const originalManifest = readFileSync(manifestPath, 'utf8');

function replaceRouterBase(manifest) {
  const nextManifest = manifest.replace(
    /("router"\s*:\s*\{[\s\S]*?"base"\s*:\s*)"[^"]*"/,
    '$1"/cpic-demo/"',
  );

  if (nextManifest === manifest) {
    throw new Error('Failed to update h5 router base in src/manifest.json');
  }

  return nextManifest;
}

try {
  writeFileSync(manifestPath, replaceRouterBase(originalManifest));

  const result = spawnSync(
    'pnpm',
    ['exec', 'uni', 'build', '-p', 'h5', '--mode', 'production'],
    { stdio: 'inherit' },
  );

  if (result.status !== 0) {
    throw new Error(`GitHub Pages H5 build failed with status ${result.status ?? 1}`);
  }

  copyFileSync(indexPath, fallbackPath);
} finally {
  writeFileSync(manifestPath, originalManifest);
}
