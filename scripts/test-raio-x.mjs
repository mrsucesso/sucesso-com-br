import { readFile, readdir } from 'node:fs/promises';
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
assert.match(raioSource, /async function parseApiError\(response\)/, 'a resposta de erro usa o JSON seguro da API');
assert.match(raioSource, /request_id/, 'a referência da API pode ser preservada sem expor dados pessoais');
assert.match(raioSource, /TURNSTILE_TOKEN_EXPIRED|TURNSTILE_TOKEN_INVALID/, 'há caminho específico para expiração ou rejeição do Turnstile');
assert.match(raioSource, /A verificação de segurança expirou ou foi recusada/, 'o Turnstile recebe orientação acionável');
assert.match(raioSource, /apiError\?\.status === 422|INVALID_DATA|VALIDATION_ERROR|VALIDATION_FAILED/, 'há caminho específico para dados inválidos');
assert.match(raioSource, /Alguns dados precisam ser revisados/, 'dados inválidos recebem orientação acionável');
assert.match(raioSource, /Tente novamente em instantes/, 'há mensagem acionável para falha temporária');
assert.match(raioSource, /Suas respostas continuam salvas/, 'o erro informa que respostas e contato foram preservados');
assert.match(raioSource, /Código: \$\{code\}|Referência: \$\{apiError\.requestId\}/, 'código e referência são exibidos somente após validação segura');
assert.doesNotMatch(raioSource, /textContent\s*=\s*error\.(?:message|stack)/, 'o erro bruto não é renderizado');
assert.match(raioSource, /lastSubmission = \{ request_id: requestId\(\).*answers: collected\.answers/s, 'a submissão preserva respostas');
assert.match(raioSource, /contact: \{ email: email\.value\.trim\(\), whatsapp: whatsapp\.value\.trim\(\) \|\| null \}/, 'a submissão preserva contato');
assert.match(raioSource, /parseApiError\(response\)/, 'o status HTTP é interpretado antes da mensagem');
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
assert.match(html, /https:\/\/raiox-api\.sucesso\.com\.br/, 'o build deve apontar para a API pública');
assert.doesNotMatch(html, /http:\/\/127\.0\.0\.1:3811/, 'produção nunca pode apontar para localhost');
assert.match(html, /https:\/\/challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/, 'o build deve incluir o Turnstile');
assert.match(html, /0x4AAAAAAEvIKLYNCd-eNdfh/, 'o build deve incluir apenas a site key pública correta');
assert.match(raioSource, /typeof created\?\.result_url === 'string'/, 'o POST 201 deve ser seguido pela busca do relatório persistido');
assert.match(raioSource, /fetch\(`\$\{API_BASE\}\$\{created\.result_url\}`/, 'o frontend busca o result_url devolvido pela API');
assert.match(raioSource, /RESULT_REQUEST_FAILED/, 'falhas ao buscar o relatório recebem tratamento seguro');
assert.match(raioSource, /get\('diagnostico'\)/, 'um diagnóstico persistido pode ser reaberto por URL');
assert.match(raioSource, /\/\^RXS-\[a-f0-9\]\{16\}\$\/i/, 'o ID recebido pela URL é validado antes da consulta');
assert.match(raioSource, /loadPersistedDiagnosis\(\)/, 'o carregamento do resultado persistido é iniciado na abertura');
assert.match(raioSource, /const effortLabels = \{ low: 'baixo', medium: 'médio', high: 'alto' \}/, 'esforço técnico é exibido em português');
assert.match(raioSource, /const speedLabels = \{ short: 'curto prazo', medium: 'médio prazo', long: 'longo prazo' \}/, 'prazo técnico é exibido em português');
assert.match(html, /resultado21/);
assert.doesNotMatch(html, /(sk-[A-Za-z0-9]{20,}|AIza[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH) PRIVATE KEY)/i, 'nenhum segredo deve ser embutido');

const legalSources = await Promise.all([
  readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/privacidade.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/pages/termos.astro', import.meta.url), 'utf8'),
]);
for (const source of legalSources) {
  assert.doesNotMatch(source, /(?:privacidade|termos)\.html/, 'links legais usam rotas trailing-slash');
}
const terms = legalSources[3];
assert.match(terms, /href="\/privacidade\/"/);
assert.doesNotMatch(terms, /ilegaiss|integrais/);
const privacy = legalSources[2];
assert.match(privacy, /<h2[^>]*>10\. Contato<\/h2>/);
assert.doesNotMatch(privacy, /<h3[^>]*>10\. Contato/);
const blogFiles = (await readdir(new URL('../src/content/blog/', import.meta.url))).filter((name) => name.endsWith('.md'));
assert.equal(blogFiles.length, 5, 'a auditoria cobre os cinco artigos');
for (const name of blogFiles) {
  const source = await readFile(new URL(`../src/content/blog/${name}`, import.meta.url), 'utf8');
  assert.doesNotMatch(source, /管理者|globally/, `${name} não contém frase corrompida`);
  assert.doesNotMatch(source, /\b(?:voce|Voce|nao|Nao|automacao|Automacao|inteligencia|Inteligencia|gestao|Gestao)\b/, `${name} mantém acentos básicos`);
}
const blogDirs = await readdir(new URL('../dist/blog/', import.meta.url), { withFileTypes: true });
for (const entry of blogDirs.filter((item) => item.isDirectory())) {
  const article = await readFile(new URL(`../dist/blog/${entry.name}/index.html`, import.meta.url), 'utf8');
  assert.equal((article.match(/property="og:image"/g) || []).length, 1, `${entry.name} emite uma única og:image`);
}
const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');
assert.match(robots, /^Sitemap: https:\/\/sucesso\.com\.br\/sitemap-index\.xml$/m);

console.log('Raio-X e correções críticas: rota, conteúdo, OG e sitemap OK');
