# Singleton para Pool de Conexões PostgreSQL

## Contexto

Uma API de biblioteca possui vários serviços que acessam o mesmo banco PostgreSQL. Criar um pool novo a cada repositório desperdiça conexões, aumenta custo de inicialização e dificulta observar o uso do banco.

## Solução

O singleton garante uma única instância do gerenciador de pool. Todos os repositórios pegam o mesmo pool compartilhado.

## Impacto arquitetural

- Reduz custo operacional por reuso de conexões.
- Centraliza configurações e telemetria de acesso ao banco.
- Aumenta acoplamento se o acesso ao singleton for espalhado sem interfaces.

## Executar

```bash
npm install
npm start
```
