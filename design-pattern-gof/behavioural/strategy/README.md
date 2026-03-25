# Strategy

Esta pasta contém dois exemplos práticos do padrão Strategy.

## Exemplos

- `shipping-cost`: troca estratégias de cálculo de frete.
- `file-compression`: troca algoritmos de compressão usados pelo backup.

## Componentes do padrão

- `Strategy`: contrato comum dos algoritmos.
- `ConcreteStrategy`: implementação concreta de um algoritmo.
- `Context`: classe que usa a estratégia configurada.
- `Client`: classe que escolhe a estratégia adequada para o contexto.

## Como os componentes se comunicam

O cliente escolhe uma estratégia concreta e a injeta no `Context`.

O contexto executa sua operação principal delegando o algoritmo variável para a strategy atual.

Com isso, o algoritmo pode mudar sem alterar a lógica principal da classe cliente.

## Diagrama PlantUML

O diagrama deste padrão está em [strategy.puml](./strategy.puml).

## Ideia arquitetural

O Strategy é útil quando existem várias formas válidas de executar a mesma tarefa e o sistema precisa alternar entre elas de maneira limpa.

Ele ajuda a evitar condicionais por tipo de algoritmo e favorece composição em vez de herança.
