# Command para Controle de Casa Inteligente

## Contexto

Um controle remoto precisa disparar ações sobre dispositivos da casa sem ficar acoplado a métodos concretos de cada aparelho.

## Solução

O Command encapsula as operações de ligar e desligar a lâmpada como objetos independentes. O controle remoto executa comandos sem conhecer a implementação do dispositivo.

## Impacto arquitetural

- Desacopla o controle remoto da lógica concreta do dispositivo.
- Permite trocar comandos dinamicamente.
- Facilita adicionar histórico e undo no invoker.

## Executar

```bash
npm install
npm start
```
