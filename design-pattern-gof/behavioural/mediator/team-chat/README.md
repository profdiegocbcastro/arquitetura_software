# Mediator para Chat de Equipe

## Contexto

Em uma sala de chat, cada participante não deveria precisar manter referencia direta para todos os outros usuários conectados.

## Solução

O chat room atua como mediator. Cada participante envia mensagens para a sala, e a sala decide como distribuir para os demais membros.

## Impacto arquitetural

- Remove dependencias diretas entre participantes.
- Centraliza regras de entrega de mensagens.
- Pode concentrar responsabilidade demais no mediator se o fluxo crescer sem cuidado.

## Executar

```bash
npm install
npm start
```
