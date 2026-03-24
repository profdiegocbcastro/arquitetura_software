# Factory Method para Métodos de Pagamento

## Contexto

Um checkout de e-commerce aceita Pix, cartão de crédito e boleto. Se a lógica de criação do pagamento ficar acoplada ao fluxo do checkout, qualquer novo meio de pagamento exigirá mudanças diretas na camada de negócio.

## Solução

O Factory Method delega a criação do meio de pagamento para fábricas concretas. O serviço de checkout executa o processo usando apenas o contrato comum do creator e do produto.

## Impacto arquitetural

- Reduz acoplamento entre checkout e implementações concretas de pagamento.
- Facilita expansão para novos meios de pagamento.
- Aumenta o número de classes e demanda organização clara da estrutura.

## Executar

```bash
npm install
npm start
```
