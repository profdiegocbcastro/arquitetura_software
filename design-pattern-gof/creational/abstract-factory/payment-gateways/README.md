# Abstract Factory para Gateways de Pagamento

## Contexto

Uma plataforma financeira integra PayPal, Mercado Pago e Stripe. Cada gateway exige objetos compatíveis para processar pagamento e realizar reembolso, e misturar implementações concretas no mesmo fluxo pode gerar inconsistência operacional.

## Solução

O Abstract Factory encapsula famílias compatíveis de produtos. Cada fábrica concreta cria um processador de pagamento e um processador de reembolso do mesmo gateway.

## Impacto arquitetural

- Reduz acoplamento entre serviços de negócio e SDKs ou APIs concretas.
- Garante coerência entre processadores criados para o mesmo gateway.
- Aumenta abstrações e exige disciplina para evitar excesso de camadas.

## Executar

```bash
npm install
npm start
```
