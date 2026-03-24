# Flyweight para Processamento de Sensores por Histograma

## Contexto

Um sistema recebe medições em alta frequência de sensores. Como muitos valores são muito próximos entre si, armazenar todas as leituras individualmente pode consumir memória sem necessidade.

## Solução

O Flyweight reutiliza buckets de valor compartilhados e mantém apenas a contagem de ocorrências por bucket, permitindo calcular métricas como média sem guardar a lista completa de leituras.

## Impacto arquitetural

- Reduz drasticamente o volume de objetos quando há repetição ou aproximação de valores.
- Permite processar estatísticas agregadas com menor consumo de memória.
- Troca precisão individual por agregação em buckets, o que exige critério na escolha da granularidade.

## Executar

```bash
npm install
npm start
```
