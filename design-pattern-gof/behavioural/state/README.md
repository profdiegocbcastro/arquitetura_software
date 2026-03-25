# State

Esta pasta contém dois exemplos práticos do padrão State.

## Exemplos

- `order-status`: altera o comportamento de um pedido conforme o estado atual.
- `media-player`: altera a resposta do player conforme ele está parado, tocando ou pausado.

## Componentes do padrão

- `Context`: objeto principal que delega comportamento ao estado atual.
- `State`: contrato comum dos estados.
- `ConcreteState`: implementação concreta de uma fase do contexto.
- `Client`: classe que usa o contexto sem aplicar condicionais de estado diretamente.

## Como os componentes se comunicam

O cliente interage com o `Context`.

O contexto delega a operação ao `State` atual, e o estado pode executar a regra correspondente e trocar o próprio estado do contexto quando necessário.

Com isso, o comportamento passa a ser distribuído em classes de estado em vez de ficar espalhado por condicionais.

## Diagrama PlantUML

O diagrama deste padrão está em [state.puml](./state.puml).

## Ideia arquitetural

O State é útil quando o mesmo objeto muda bastante de comportamento conforme uma fase interna do ciclo de vida.

Ele reduz `if` baseados em status e deixa as transições mais explícitas e organizadas.
