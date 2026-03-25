# Observer

Esta pasta contém dois exemplos práticos do padrão Observer.

## Exemplos

- `product-stock-alert`: notifica assinantes quando o estoque de um produto muda.
- `weather-station`: notifica displays quando a leitura do clima é atualizada.

## Componentes do padrão

- `Subject`: objeto observado que gerencia inscritos.
- `Observer`: contrato comum dos assinantes.
- `ConcreteSubject`: fonte real das mudanças.
- `ConcreteObserver`: reação concreta a cada notificação.
- `Client`: classe que registra os observers no subject.

## Como os componentes se comunicam

Os observers se registram em um `Subject`.

Quando o estado observado muda, o subject notifica todos os inscritos, que reagem de forma independente e desacoplada entre si.

Com isso, a origem da mudança não precisa conhecer os detalhes das reações que serão executadas.

## Diagrama PlantUML

O diagrama deste padrão está em [observer.puml](./observer.puml).

## Ideia arquitetural

O Observer é útil quando uma alteração em uma fonte de dados precisa disparar reações em vários pontos da aplicação, como notificações, dashboards, caches ou listeners.

Ele ajuda bastante a desacoplar emissão de evento e consumo da mudança.
