# Memento para Historico de Editor

## Contexto

Um editor precisa salvar versões do conteúdo para permitir retorno ao estado anterior sem expor internamente como o texto é armazenado.

## Solução

O editor atua como originator e cria mementos do texto atual. Um histórico externo guarda esses snapshots e devolve o último quando o usuário pede undo.

## Impacto arquitetural

- Permite undo sem violar encapsulamento do editor.
- Separa armazenamento do histórico da lógica do texto.
- Pode consumir memoria em excesso se snapshots forem grandes ou frequentes.

## Executar

```bash
npm install
npm start
```
