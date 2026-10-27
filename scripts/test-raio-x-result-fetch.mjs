import fs from 'node:fs';
const page = fs.readFileSync('src/pages/raio-x.astro', 'utf8');
if (!page.includes('data.result_url')) throw new Error('Frontend não busca result_url da API.');
if (!page.includes("await fetch(resultUrl")) throw new Error('Frontend não busca o relatório concluído.');
if (!page.includes("const completed = await resultResponse.json()")) throw new Error('Resposta do relatório não é lida.');
if (!page.includes('renderResult(completed)')) throw new Error('Relatório concluído não é renderizado.');
if (!page.includes('const timeout = setTimeout(() => controller.abort(), 55000)')) {
  throw new Error('Timeout do frontend é menor que a janela necessária do relatório.');
}
console.log('OK: resultado assíncrono é buscado antes de renderizar e o frontend aguarda a janela operacional.');
