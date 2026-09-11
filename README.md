# Site Institucional - Sucesso Empresarial

Site institucional da **Sucesso Empresarial Ltda** (CNPJ: 01.655.728/0001-14).

## 🌐 Domínio

- **URL:** https://sucesso.com.br
- **Deploy:** Cloudflare Pages — projeto `sucesso-com-br` (produção)
- **Página Resultado 21:** https://sucesso.com.br/resultado21

## 📄 Páginas

- **`index.html`** - Página principal com apresentação da empresa e serviços
- **`/privacidade/`** - Política de Privacidade (LGPD compliant)
- **`/termos/`** - Termos de Uso
- **`auth/callback.html`** - Página de callback OAuth do Google

## 🎨 Design

- **Cores:** Azul escuro (#1a3a5c) + Verde (#2ecc71)
- **Fonte:** Inter (Google Fonts)
- **Estilo:** Corporativo, profissional, responsivo

## 🔐 Compliance

- ✅ Política de Privacidade LGPD
- ✅ Termos de Uso detalhados
- ✅ Requisitos Google OAuth atendidos
- ✅ Transparência sobre escopos (Calendar, Gmail, Drive)

Campos livres são tratados como dados; a semântica aceita somente tags versionadas e não repete instruções injetadas no relatório.

## Turnstile no Raio-X

A página `/raio-x/` renderiza o widget oficial do Cloudflare Turnstile somente quando `PUBLIC_TURNSTILE_SITEKEY` está definido no build. O build de produção carrega `.env.production`, que contém apenas os valores públicos `PUBLIC_RAIO_X_API_BASE` e `PUBLIC_TURNSTILE_SITEKEY`; nenhum segredo pode entrar nesse arquivo. O token recebido do widget é enviado apenas no campo técnico `turnstile_token`; o segredo `TURNSTILE_SECRET_KEY` nunca é exposto ao frontend e deve existir somente no ambiente da API quando a proteção estiver ativada. Antes de publicar, o artefato `dist/raio-x/index.html` deve conter `https://raiox-api.sucesso.com.br` e `challenges.cloudflare.com/turnstile`, e não pode conter `http://127.0.0.1:3811`.

### QA do fluxo Raio-X

Na revisão do fluxo, o código de `/raio-x/` foi verificado e não contém chamadas de OAuth, `navigator.permissions`, abertura de autorização ou solicitação de acesso a aplicativos/serviços externos. Ele chama apenas Google Fonts, Turnstile quando configurado e a API do diagnóstico. O callback OAuth listado acima pertence a outro fluxo do site e não é carregado pela página Raio-X.

O nome do contato é coletado numa etapa preliminar, sem numeração, com a pergunta **“Antes de começarmos, como posso te chamar?”**. As 10 perguntas diagnósticas começam pela identificação da empresa. A pergunta de perdas exige uma prioridade principal e exatamente duas secundárias distintas; apenas a principal entra no scoring. O relatório mostra data, empresa, contato, e-mail, telefone e as três prioridades declaradas.

### Cópia do relatório por e-mail

O resultado permanece visível na página e pode ser reaberto por `?diagnostico=<diagnosis_id>`. Na sessão atual, o cabeçalho completo usa os dados que a própria pessoa acabou de informar, mantidos somente em memória. Em reaberturas, a API protege empresa, contato, e-mail e telefone; o ID opaco não funciona como credencial para consultar dados pessoais. Ao final, o bloco **“Salve seu relatório no e-mail”** mostra um campo editável e o botão **“Enviar relatório por e-mail”**. Na mesma sessão, o campo reaproveita o e-mail obrigatório já informado; na reabertura por URL ele fica vazio.

O botão chama `POST /api/raio-x/diagnoses/{diagnosis_id}/email` e considera aceita somente a resposta HTTP `202`. O envio é assíncrono no backend; falha na entrega nunca esconde o relatório nem bloqueia o diagnóstico. O frontend não recebe nem armazena credenciais de e-mail.

O diagnóstico também apresenta uma leitura rápida com a alavanca principal, confiança e gráfico horizontal compacto somente quando a API entrega scores/ranking reais em `classification`; sem scores, o gráfico não é inventado. O prompt aparece como bloco de código com o botão discreto **Copiar prompt**.

Após uma resposta HTTP `202`, o fluxo redireciona para `/raio-x/obrigado/?diagnostico=<ID>` sem e-mail na URL. A página de obrigado confirma apenas que a solicitação foi registrada, incorpora a agenda do Google e mantém um link alternativo para abrir a agenda em outra janela. O retorno ao diagnóstico só preserva IDs no formato `RXS-` + 16 caracteres hexadecimais.

## Loading honesto

O processamento usa uma barra indeterminada, sem percentual ou progresso simulado, com `aria-busy`, texto de até 90 segundos e suporte a `prefers-reduced-motion`.

## Desenvolvimento e QA

A produção é servida pelo Cloudflare Pages. O site está publicado e validado em https://sucesso.com.br/resultado21. O workflow antigo de GitHub Pages não deve ser tratado como destino de produção.

### Configurar GitHub Pages:

1. Ir em **Settings** → **Pages**
2. Source: **GitHub Actions**
3. O deploy acontecerá automaticamente

### Configurar DNS (Cloudflare):

```
CNAME   @   mrsupleno.github.io.
CNAME   www mrsupleno.github.io.
```

## 📧 Contato

**Maurício Supleno**  
mauricio@sucesso.com.br

---

*Criado em: 27 de março de 2026*
