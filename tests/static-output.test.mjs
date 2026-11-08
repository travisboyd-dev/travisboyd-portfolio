import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const output = path.resolve('dist');
const htmlFiles = (await readdir(output, { recursive: true }))
  .filter(file => file.endsWith('.html'));
const pages = new Map(await Promise.all(htmlFiles.map(async file =>
  [file.replaceAll('\\', '/'), await readFile(path.join(output, file), 'utf8')],
)));

test('all generated pages have real local links, assets, and fragment targets', async () => {
  assert.equal(pages.size, 6);
  for (const [file, html] of pages) {
    const pageUrl = new URL(file.replace(/index\.html$/, ''), 'https://travisboyd.dev/');
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      assert.ok(reference, `${file}: empty link or asset`);
      const url = new URL(reference, pageUrl);
      if (url.origin !== pageUrl.origin) continue;
      let target = path.resolve(output, `.${decodeURIComponent(url.pathname)}`);
      assert.ok(target === output || target.startsWith(output + path.sep), `${file}: target outside build output`);
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      const content = await readFile(target, 'utf8');
      if (url.hash) {
        const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
        assert.ok(ids.includes(decodeURIComponent(url.hash.slice(1))), `${file}: missing ${reference}`);
      }
    }
  }
});

test('shared accessibility fixes are present on every generated page', () => {
  for (const [file, html] of pages) {
    assert.match(html, /<main\b[^>]*id="main"[^>]*tabindex="-1"/, file);
    assert.match(html, /<a class="brand" href="\/"><span class="brand-mark" aria-hidden="true">/, file);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, file);
    assert.match(html, /<html lang="en"/, file);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
  }
});

test('Azure artifact retains a true custom 404 without an SPA fallback', async () => {
  const config = JSON.parse(await readFile(path.join(output, 'staticwebapp.config.json'), 'utf8'));
  assert.deepEqual(config.responseOverrides['404'], { rewrite: '/404.html', statusCode: 404 });
  assert.equal(config.navigationFallback, undefined);
  assert.match(pages.get('404.html'), /A loose connection\./);
  assert.match(pages.get('404.html'), /name="robots" content="noindex"/);
  assert.doesNotMatch(pages.get('404.html'), /rel="canonical"/);
});

test('unprovided LinkedIn and résumé download links stay hidden', () => {
  const home = pages.get('index.html');
  assert.doesNotMatch(home, /linkedin\.com|Download résumé/);
  assert.match(home, /href="mailto:travis@travisboyd\.dev"/);
  assert.match(home, /href="https:\/\/github\.com\/travisboyd-dev"/);
});
