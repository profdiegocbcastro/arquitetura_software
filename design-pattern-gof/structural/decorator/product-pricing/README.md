# Decorator para Formação de Preço

## Contexto

Um e-commerce calcula o preço final de um produto a partir de um valor base, mas pode precisar aplicar desconto, taxas operacionais e frete em combinações diferentes.

## Solução

O Decorator permite compor camadas de cálculo sobre o preço base do produto, sem criar uma classe para cada combinação de regras.

## Impacto arquitetural

- Permite combinar regras de preço de forma flexível.
- Mantém cada regra isolada em uma camada própria.
- Pode exigir cuidado com a ordem de composição das regras.

## Executar

```bash
npm install
npm start
```
