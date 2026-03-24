# Decorator para Canais de Notificação

## Contexto

Uma plataforma de atendimento precisa enviar a mesma mensagem por múltiplos canais, como e-mail, Slack e SMS, sem criar subclasses para cada combinação possível de envio.

## Solução

O Decorator envolve um notificador base com camadas adicionais, permitindo compor dinamicamente quais canais serão usados em cada fluxo.

## Impacto arquitetural

- Permite combinar canais sem explosão de subclasses.
- Mantém o contrato de notificação estável enquanto novos canais são adicionados.
- Pode dificultar rastreamento do fluxo quando a cadeia de decorators cresce demais.

## Executar

```bash
npm install
npm start
```
