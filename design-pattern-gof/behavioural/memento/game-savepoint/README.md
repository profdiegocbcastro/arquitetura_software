# Memento para Savepoint de Jogo

## Contexto

Uma sessão de jogo precisa registrar checkpoints para permitir restauração depois de uma derrota ou erro do jogador.

## Solução

O estado da sessão é capturado em um memento, enquanto um gerenciador de savepoints armazena os snapshots. Quando necessário, o jogo restaura o último checkpoint.

## Impacto arquitetural

- Mantem o estado do jogo encapsulado.
- Facilita checkpoints e rollback.
- Pode gerar muitos snapshots se a frequência de save for alta.

## Executar

```bash
npm install
npm start
```
