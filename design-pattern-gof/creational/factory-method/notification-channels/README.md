# Factory Method para Canais de Notificação

## Contexto

Uma plataforma de atendimento precisa enviar notificações por canais diferentes, como e-mail, SMS e push. Se a escolha do canal ficar espalhada por condicionais no serviço principal, o código fica mais acoplado e difícil de expandir.

## Solução

O Factory Method delega a criação do canal de notificação para fábricas concretas. O serviço de campanha usa apenas a abstração do creator e do produto.

## Impacto arquitetural

- Reduz acoplamento entre regra de negócio e classes concretas de notificação.
- Melhora extensibilidade para adicionar novos canais.
- Introduz mais classes e exige disciplina de organização para não virar boilerplate.

## Executar

```bash
npm install
npm start
```
