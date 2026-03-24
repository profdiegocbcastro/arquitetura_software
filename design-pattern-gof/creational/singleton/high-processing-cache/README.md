# Singleton para Cache de Alto Processamento

## Contexto

Um módulo analítico recalcula indicadores pesados toda vez que recebe a mesma entrada. Isso consome CPU e aumenta a latência de resposta.

## Solução

O singleton centraliza um cache em memória para reusar resultados já processados durante o ciclo de vida da aplicação.

## Impacto arquitetural

- Reduz latência e custo computacional.
- Introduz preocupações de expiração, invalidação e consumo de memória.
- Pode exigir evolução futura para Redis ou outro cache distribuído.

## Executar

```bash
npm install
npm start
```
