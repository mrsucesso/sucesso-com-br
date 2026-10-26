import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const component = readFileSync(new URL('../src/components/GoogleAnalytics.astro', import.meta.url), 'utf8');
assert.match(component, /G-84JDLB0SS7/);
assert.match(component, /googletagmanager\.com\/gtag\/js/);
assert.match(component, /gtag\('config', MEASUREMENT_ID, \{ anonymize_ip: true \}\)/);

const covered = [
  'src/layouts/Layout.astro',
  'src/layouts/BlogPost.astro',
  'src/pages/index.astro',
  'src/pages/raio-x.astro',
  'src/pages/resultado21.astro',
  'src/pages/resultado21/obrigado.astro',
  'src/pages/blog/index.astro',
];
for (const file of covered) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  assert.match(source, /GoogleAnalytics/ , `${file} must render GoogleAnalytics`);
}
console.log('GA4 instrumentation coverage: OK');
