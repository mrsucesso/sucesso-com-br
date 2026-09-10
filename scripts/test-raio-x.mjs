import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';

const html = await readFile(new URL('../dist/raio-x/index.html', import.meta.url), 'utf8');

assert.match(html, /<h1[^>]*>Encontre onde existe dinheiro mais perto/);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'a rota deve ter um único H1');
assert.match(html, /name="priority_30_days"/);
assert.match(html, /name="sucesso_content"/);
assert.match(html, /name="website"/);
assert.match(html, /Idempotency-Key/);
assert.match(html, /utm_source/);
assert.match(html, /\/api\/raio-x\/diagnoses/);
assert.match(html, /resultado21/);
assert.doesNotMatch(html, /(sk-[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH) PRIVATE KEY)/i, 'nenhum segredo deve ser embutido');
assert.match(html, /127\.0\.0\.1:3811/);

console.log('Raio-X fixture: rota, contrato visual e ausência de segredo OK');
