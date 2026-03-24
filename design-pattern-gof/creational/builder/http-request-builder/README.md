# Builder para HTTP Request

## Contexto

Uma aplicação integra várias APIs externas e precisa montar requisições HTTP com muitos campos opcionais, como método, URL, headers, query params, body e timeout. Fazer isso com construtores longos ou objetos literais espalhados reduz legibilidade e aumenta risco de inconsistência.

## Solução

O Builder organiza a construção da requisição HTTP em etapas. O director pode reaproveitar sequências comuns, como uma chamada autenticada em JSON.

## Impacto arquitetural

- Melhora legibilidade na construção de requests complexos.
- Evita construtores telescópicos e objetos montados de forma inconsistente.
- Adiciona mais classes e fluxo de montagem, o que pode ser excessivo em cenários simples.

## Executar

```bash
npm install
npm start
```
