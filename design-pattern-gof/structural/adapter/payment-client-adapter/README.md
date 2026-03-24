# Adapter para Cliente de Pagamento Externo

## Contexto

Um checkout interno espera trabalhar com uma interface simples de gateway de pagamento, mas a integração real precisa usar um cliente externo do Mercado Pago com payloads e respostas diferentes do contrato interno.

## Solução

O Adapter encapsula o cliente do Mercado Pago e traduz o contrato interno de pagamento para o formato aceito pela API externa.

## Impacto arquitetural

- Isola a dependência do SDK ou cliente externo em uma camada específica.
- Permite trocar ou evoluir o cliente externo sem alterar o checkout.
- Exige manutenção cuidadosa quando o contrato externo muda com frequência.

## Executar

```bash
npm install
npm start
```
