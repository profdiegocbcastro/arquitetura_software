# Strategy para Compressao de Arquivos

## Contexto

Um serviço de backup pode comprimir arquivos com algoritmos diferentes dependendo do objetivo de velocidade ou compatibilidade.

## Solução

Cada algoritmo de compressão vira uma strategy. O serviço de backup delega a operação para a strategy configurada.

## Impacto arquitetural

- Permite trocar algoritmo sem alterar o serviço de backup.
- Facilita extensao para novos formatos.
- Introduz mais classes em cenarios muito simples.

## Executar

```bash
npm install
npm start
```
