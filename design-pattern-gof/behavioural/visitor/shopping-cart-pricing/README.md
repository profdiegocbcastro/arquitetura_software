# Visitor para Preco de Carrinho

## Contexto

Um carrinho possui itens de tipos diferentes, e a aplicação precisa calcular o total sem colocar a lógica de preço dentro de cada fluxo cliente.

## Solução

Os itens aceitam um visitor de cálculo. O visitor conhece a regra de preço de cada tipo concreto de item.

## Impacto arquitetural

- Separa a operação de cálculo da estrutura dos itens.
- Facilita adicionar novas operações sobre o carrinho.
- Exige atualização do visitor quando surgem novos tipos de item.

## Executar

```bash
npm install
npm start
```
