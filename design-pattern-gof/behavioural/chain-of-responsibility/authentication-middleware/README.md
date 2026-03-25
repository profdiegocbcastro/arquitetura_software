# Chain of Responsibility para Middleware de Autenticação

## Contexto

Uma rota protegida precisa verificar se a requisição possui header de autorização, se o token e válido, se o usuário ainda está ativo e se possui a permissão exigida pela rota. Quando tudo isso fica concentrado em uma única camada, o middleware cresce e passa a misturar várias políticas.

## Solução

O Chain of Responsibility separa cada verificação em um middleware independente. A rota protegida dispara a cadeia e recebe a primeira falha encontrada ou a liberação de acesso.

## Impacto arquitetural

- Mantém cada política de autenticação em uma etapa isolada.
- Facilita reuso de middlewares em diferentes rotas e pipelines.
- Exige cuidado com a ordem da cadeia e com o compartilhamento de contexto.

## Executar

```bash
npm install
npm start
```
