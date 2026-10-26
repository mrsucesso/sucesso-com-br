import fs from 'node:fs';

const page = fs.readFileSync('src/pages/raio-x.astro', 'utf8');
for (const field of ['priority_30_days', 'opportunity_loss']) {
  if (!page.includes(`name="${field}"`)) {
    throw new Error(`Contrato quebrado: o campo obrigatório ${field} não é enviado pelo formulário.`);
  }
}
if (/<(?:input|textarea)[^>]*\bname="description"/.test(page)) {
  throw new Error('Contrato quebrado: um campo de formulário legado description não é aceito pela API.');
}
for (const value of ['lead_generation', 'conversion', 'reactivation', 'expansion', 'capacity']) {
  if (!page.includes(`name="opportunity_loss" value="${value}"`)) {
    throw new Error(`Opção de oportunidade ausente: ${value}`);
  }
}
if (!page.includes('10 perguntas')) throw new Error('A comunicação da quantidade de perguntas não foi atualizada.');
console.log('OK: formulário Raio-X envia o contrato completo de 10 perguntas.');
