# Memento

Esta pasta contém dois exemplos práticos do padrão Memento.

## Exemplos

- `text-editor-history`: salva snapshots de um editor para permitir undo.
- `game-savepoint`: salva checkpoints de uma sessão de jogo para restauração futura.

## Componentes do padrão

- `Originator`: objeto cujo estado pode ser salvo e restaurado.
- `Memento`: snapshot encapsulado do estado do originator.
- `Caretaker`: componente que armazena os mementos sem acessar o estado interno.
- `Client`: classe que coordena criação e restauração dos snapshots.

## Como os componentes se comunicam

O `Originator` cria um `Memento` quando o cliente ou o caretaker pede um snapshot.

O `Caretaker` apenas guarda esse objeto. Quando uma restauração é solicitada, o memento volta ao originator, que recompõe seu estado.

Com isso, a aplicação pode implementar undo, rollback e checkpoints sem expor o estado interno do objeto.

## Diagrama PlantUML

O diagrama deste padrão está em [memento.puml](./memento.puml).

## Ideia arquitetural

O Memento é útil quando o sistema precisa preservar estados passados de forma segura, principalmente em editores, fluxos transacionais e jogos com savepoint.

O ganho principal está em restaurar contexto sem quebrar encapsulamento do objeto que possui o estado real.
