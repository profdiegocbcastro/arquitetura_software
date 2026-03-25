# State para Player de Midia

## Contexto

Um player responde de forma diferente aos botões play, pause e stop dependendo do estado atual.

## Solução

Cada estado do player representa uma fase de operação. O contexto delega as ações ao estado atual, que decide a resposta correta e as transições.

## Impacto arquitetural

- Mantem o comportamento de cada fase isolado.
- Facilita leitura do fluxo do player.
- Pode gerar várias classes para ciclos de vida pequenos.

## Executar

```bash
npm install
npm start
```
