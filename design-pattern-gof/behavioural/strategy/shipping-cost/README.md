# Strategy para Calculo de Frete

## Contexto

Um checkout pode calcular frete padrão, expresso ou retirada, mas a camada principal não deveria conter condicionais para cada algoritmo.

## Solução

Cada forma de frete vira uma strategy. O checkout delega o cálculo para a estratégia configurada.

## Impacto arquitetural

- Facilita trocar algoritmos de frete.
- Remove condicionais do checkout.
- Pode adicionar abstração demais se houver apenas uma regra fixa.

## Executar

```bash
npm install
npm start
```
