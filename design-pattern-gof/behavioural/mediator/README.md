# Mediator

Esta pasta contém dois exemplos práticos do padrão Mediator.

## Exemplos

- `team-chat`: centraliza a troca de mensagens entre participantes de uma sala.
- `checkout-form`: centraliza a sincronização entre campos de um checkout.

## Componentes do padrão

- `Mediator`: contrato que define como os colegas interagem por um ponto central.
- `ConcreteMediator`: coordenador concreto da comunicação.
- `Colleague`: participante que delega a coordenação ao mediator.
- `Client`: classe que monta participantes e mediator.

## Como os componentes se comunicam

Os colegas não se chamam diretamente. Em vez disso, notificam o `Mediator` quando algo relevante acontece.

O mediator interpreta o evento, decide quem precisa reagir e coordena a comunicação entre os participantes.

Com isso, a regra de orquestração sai dos objetos individuais e fica concentrada em um ponto central.

## Diagrama PlantUML

O diagrama deste padrão está em [mediator.puml](./mediator.puml).

## Ideia arquitetural

O Mediator é útil quando muitos objetos precisam colaborar, mas o acoplamento entre eles começa a crescer em rede.

Ele deixa os colegas mais simples e concentra a coordenação em um componente próprio, o que ajuda bastante em interfaces complexas e fluxos interdependentes.
