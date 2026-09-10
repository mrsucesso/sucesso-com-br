import { readFile } from 'node:fs/promises';
import { strict as assert } from 'node:assert';

const html = await readFile(new URL('../dist/raio-x/index.html', import.meta.url), 'utf8');
const pageSources = await Promise.all([
  ['Home', '../src/pages/index.astro'],
  ['Resultado 21', '../src/pages/resultado21.astro'],
  ['Resultado 21 obrigado', '../src/pages/resultado21/obrigado.astro'],
  ['Raio-X', '../src/pages/raio-x.astro'],
].map(async ([name, path]) => [name, await readFile(new URL(path, import.meta.url), 'utf8')]));

for (const [name, source] of pageSources) {
  if (name === 'Resultado 21 obrigado') {
    assert.ok(source.includes('<span>sucesso</span> empresarial'), `${name} mantém a marca textual`);
    continue;
  }
  const markClass = name === 'Raio-X' ? 'brand-mark' : 'brand';
  const rule = new RegExp(`\\.${markClass}\\s*\\{[^}]*width:\\s*72px;[^}]*height:\\s*72px;`);
  assert.match(source, rule, `${name} usa área visual 72x72`);
  const imageRule = new RegExp(`\\.${markClass}\\s+img\\s*\\{[^}]*display:\\s*block;[^}]*width:\\s*100%;[^}]*height:\\s*100%;[^}]*object-fit:\\s*contain;`);
  assert.match(source, imageRule, `${name} contém a imagem sem distorção`);
}

assert.match(html, /<h1[^>]*>Encontre onde existe dinheiro mais perto/);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'a rota deve ter um único H1');
assert.doesNotMatch(html, /Sem promessa de resultado/, 'a abertura não deve exibir disclaimer financeiro');
assert.match(html, /name="priority_30_days"/);
assert.match(html, /id="sucesso-content"[^>]*name="sucesso_content"[^>]*checked(?:=""|(?=[ >]))/);
assert.equal((html.match(/class="question"/g) || []).length, 10, 'o fluxo deve exibir 10 perguntas');
for (const value of ['lead_generation', 'conversion', 'reactivation', 'expansion', 'capacity']) {
  assert.match(html, new RegExp(`name="opportunity_loss" value="${value}"`), `opportunity_loss aceita ${value}`);
}
assert.match(html, /Onde sua empresa mais perde oportunidades hoje\?/);
assert.match(html, /class="completion-context"[^>]*>\s*<p[^>]*>Você concluiu as 10 perguntas<\/p>/);
assert.match(html, /Falta apenas confirmar onde entregamos seu resultado\./);
assert.match(html, /name="website"/);
assert.match(html, /Pergunta[^<]*<span[^>]*id="progress-current"[^>]*>1<\/span> de 10/);
assert.match(html, /<input id="whatsapp" name="whatsapp" type="tel" autocomplete="tel"[^>]*maxlength="32"/);
assert.doesNotMatch(html, /id="whatsapp"[^>]*required/);
assert.match(html, /Usaremos para identificar seu diagnóstico e facilitar nossa comunicação\./);
assert.match(html, /whatsapp: whatsapp\.value\.trim\(\) \|\| null/);
assert.match(html, /setTimeout\(\(\) => controller\.abort\(\), 90000\)/);
assert.match(html, /scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\)/);
assert.match(html, /<h2[^>]*id="error-title"[^>]*>Houve uma falha no processamento<\/h2>/);
assert.match(html, /id="error-panel"[^>]*role="alert"[^>]*aria-live="assertive"/);
const raioSource = pageSources.find(([name]) => name === 'Raio-X')?.[1] || '';
assert.match(raioSource, /:global\(\[hidden\]\)\s*\{\s*display:\s*none\s*!important;/);
assert.match(html, /data-state="intro"/);
assert.match(html, /item\.setAttribute\('aria-hidden', String\(!active\)\)/);
assert.match(html, /item\.hidden = !active/);
assert.match(html, /Raio-X interrompido/);
assert.match(html, /Suas respostas foram preservadas\. Você não precisa responder novamente\./);
assert.match(html, /id="retry-button"[^>]*>Revisar e reenviar<\/button>/);
const errorMarkup = html.match(/<section class="error-panel"[\s\S]*?<\/section>/)?.[0] || '';
assert.doesNotMatch(errorMarkup, /Começar o Raio-X|start-button/, 'o erro não pode conter CTA de início');
assert.match(html, /document\.querySelector\('main'\)\.dataset\.state = panel\.dataset\.panelState/);
assert.match(html, /heading\.focus\(\{ preventScroll: true \}\)/);
assert.match(html, /heading\.scrollIntoView\(\{ behavior: 'auto', block: 'start' \}\)/);
assert.match(html, /showOnly\(contactPanel\); document\.querySelector\('#email'\)\.focus\(\)/);
assert.doesNotMatch(html, /retry-button[^\n]*step\s*=\s*0|retry-button[\s\S]{0,300}showOnly\(intro\)/, 'tentar novamente não pode resetar para a introdução');
assert.match(html, /window\.scrollTo\(\{ top: 0, behavior: 'auto' \}\)/);
assert.doesNotMatch(html, /(navigator\.permissions|window\.open\([^)]*authorization|accounts\.google)/i, 'Raio-X não deve solicitar permissões externas');
assert.match(html, /Idempotency-Key/);
assert.match(html, /utm_source/);
assert.match(html, /\/api\/raio-x\/diagnoses/);
assert.match(html, /resultado21/);
assert.doesNotMatch(html, /(sk-[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH) PRIVATE KEY)/i, 'nenhum segredo deve ser embutido');
assert.match(html, /127\.0\.0\.1:3811/);

console.log('Raio-X fixture: rota, contrato visual e ausência de segredo OK');
