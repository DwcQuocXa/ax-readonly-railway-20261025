import { mkdir, readFile, writeFile } from 'node:fs/promises';
let release;
try { release = JSON.parse(await readFile('config/release.json', 'utf8')).release; }
catch (error) { if (error.code !== 'ENOENT') throw error; console.error('ERR_RELEASE_CONFIG_MISSING: config/release.json'); process.exit(1); }
const marker = { application: 'deployment-support', release };
await mkdir('dist', { recursive: true });
await writeFile('dist/version.json', JSON.stringify(marker) + '\n');
await writeFile('dist/index.html', '<!doctype html><title>Checkout demo</title><h1>Checkout demo</h1>');
await mkdir('src', { recursive: true });
await writeFile('src/release.generated.json', JSON.stringify(marker) + '\n');
console.log('Static build completed');
