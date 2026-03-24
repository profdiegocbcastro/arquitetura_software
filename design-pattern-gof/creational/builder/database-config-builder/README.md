# Builder para Configuração de Banco de Dados

## Contexto

Uma aplicação precisa montar configurações de banco com vários parâmetros, como host, porta, usuário, senha, database, SSL, timeout e tamanho do pool. Misturar tudo diretamente em objetos literais espalhados dificulta padronização entre ambientes.

## Solução

O Builder organiza a criação da configuração em etapas, enquanto o director reaproveita perfis comuns, como produção com SSL e pool maior.

## Impacto arquitetural

- Melhora padronização na montagem de configurações.
- Facilita reaproveitamento de perfis e presets de ambiente.
- Introduz mais classes e um fluxo extra de construção.

## Executar

```bash
npm install
npm start
```
