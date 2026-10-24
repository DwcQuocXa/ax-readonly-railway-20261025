import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const routes = new Map([['/', ['dist/index.html', 'text/html']], ['/version.json', ['dist/version.json', 'application/json']]]);
createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  if (path === '/healthz') { response.writeHead(200); response.end('ok'); return; }
  const route = routes.get(path);
  if (!route) { response.writeHead(404); response.end('Not found'); return; }
  try { const data = await readFile(route[0]); response.writeHead(200, { 'content-type': route[1], 'cache-control': 'no-store' }); response.end(data); }
  catch { response.writeHead(503); response.end('Build output unavailable'); }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0');
