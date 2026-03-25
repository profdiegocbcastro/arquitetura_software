# Command para Editor de Texto com Undo

## Contexto

Um editor de texto precisa executar operações como inserir e remover conteúdo, mas também quer manter histórico para desfazer a última ação.

## Solução

O Command encapsula cada operação de edição em um objeto. A barra de ferramentas executa os comandos e armazena o histórico para permitir undo sem conhecer a lógica interna do documento.

## Impacto arquitetural

- Separa a interface de edição da lógica concreta do documento.
- Facilita histórico, undo e composição de operações.
- Exige cuidado para cada comando guardar o estado necessário para desfazer.

## Executar

```bash
npm install
npm start
```
