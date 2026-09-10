# Site Institucional - Sucesso Empresarial

Site institucional da **Sucesso Empresarial Ltda** (CNPJ: 01.655.728/0001-14).

## 🌐 Domínio

- **URL:** https://sucesso.com.br
- **Deploy:** Cloudflare Pages — projeto `sucesso-com-br` (produção)
- **Página Resultado 21:** https://sucesso.com.br/resultado21

## 📄 Páginas

- **`index.html`** - Página principal com apresentação da empresa e serviços
- **`privacidade.html`** - Política de Privacidade (LGPD compliant)
- **`termos.html`** - Termos de Uso
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

A página `/raio-x/` renderiza o widget oficial do Cloudflare Turnstile somente quando `PUBLIC_TURNSTILE_SITEKEY` está definido no build. Sem essa variável, nenhum script ou widget é incluído e o fluxo local continua sem verificação. O token recebido do widget é enviado apenas no campo técnico `turnstile_token`; o segredo `TURNSTILE_SECRET_KEY` nunca é exposto ao frontend e deve existir somente no ambiente da API quando a proteção estiver ativada.

## 🚀 Deploy

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
