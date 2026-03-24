# Decorator

Esta pasta contém três exemplos práticos do padrão Decorator.

## Exemplos

- `notification-channels`: adiciona canais de notificação, como e-mail, Slack e SMS, sobre um notificador base.
- `product-pricing`: adiciona desconto, taxas e frete sobre um preço base de produto.
- `multi-destination-logging`: adiciona destinos de logging, como console, arquivo e banco de dados, sobre um logger base.

## Componentes do padrão

- `Component`: contrato comum que define a operação principal.
- `ConcreteComponent`: implementação base que pode ser enriquecida por decorators.
- `Decorator`: classe base que mantém uma referência para outro componente e delega a operação.
- `ConcreteDecorator`: implementação concreta que adiciona comportamento antes ou depois da delegação.
- `Cliente`: classe que compõe os decorators em tempo de execução conforme a necessidade.

## Como os componentes se comunicam

O cliente começa com um `ConcreteComponent` e o envolve com um ou mais decorators. Todos compartilham o mesmo contrato do `Component`.

Quando a operação é executada, cada decorator recebe a chamada, adiciona sua responsabilidade específica e então delega para o próximo componente encadeado.

Com isso, o comportamento final surge da composição dinâmica das camadas, sem necessidade de criar subclasses para cada combinação possível.

## Diagrama PlantUML

O diagrama deste padrão está em [decorator.puml](./decorator.puml).

## Ideia arquitetural

O Decorator é útil quando a aplicação precisa adicionar responsabilidades a um objeto de forma flexível e combinável, sem multiplicar subclasses.

Ele favorece composição em vez de herança para variar comportamento em tempo de execução, mas pode dificultar leitura quando o encadeamento de camadas cresce demais.
