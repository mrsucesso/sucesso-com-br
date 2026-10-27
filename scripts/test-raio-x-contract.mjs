import fs from 'node:fs';

const page = fs.readFileSync('src/pages/raio-x.astro', 'utf8');
if (!page.includes('id="name-panel"') || !page.includes('id="person-name"')) {
  throw new Error('A apresentação com nome pessoal fora do questionário não existe.');
}
if (!page.includes('name="company_name"') || !page.includes('Qual é o nome do seu negócio?')) {
  throw new Error('Pergunta 01 deve coletar o nome do negócio.');
}
if (page.includes('data-step="0">\n            <label for="name"')) {
  throw new Error('Nome pessoal ainda está contado como pergunta do diagnóstico.');
}
if (!page.includes('type="checkbox" name="purchase_mode"') || !page.includes('Você pode marcar mais de uma forma')) {
  throw new Error('A forma de compra deve permitir seleção múltipla.');
}
if (!page.includes('data.purchase_mode = [...form.querySelectorAll')) {
  throw new Error('As múltiplas formas de compra não são serializadas como lista.');
}
for (const field of ['company_name', 'priority_30_days', 'opportunity_loss']) {
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
