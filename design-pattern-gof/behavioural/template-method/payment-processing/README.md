# Template Method para Processamento de Pagamento

## Contexto

Pix e cartão seguem o mesmo fluxo geral de pagamento, mas algumas etapas concretas mudam conforme o método.

## Solução

Uma classe abstrata define a sequência de validação, autorização e confirmação. Cada processador concreto implementa as etapas variáveis.

## Impacto arquitetural

- Mantem o fluxo principal padronizado.
- Reduz repeticao entre métodos de pagamento.
- Pode ficar rígido se as variações exigirem composição em vez de herança.

## Executar

```bash
npm install
npm start
```
