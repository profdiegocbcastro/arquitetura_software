# Mediator para Formulario de Checkout

## Contexto

Em um checkout, seleção de frete, cupom e resumo do pedido precisam reagir entre si. Se cada componente conhecer todos os outros, o formulário fica fortemente acoplado.

## Solução

O mediator centraliza a sincronização entre os componentes do formulário. Cada campo notifica o mediator, e o mediator coordena atualização de resumo e total.

## Impacto arquitetural

- Remove chamadas diretas entre componentes do formulário.
- Centraliza a regra de sincronização da interface.
- Pode crescer demais se o formulário acumular muitas regras no mediator.

## Executar

```bash
npm install
npm start
```
