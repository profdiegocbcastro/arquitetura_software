# Factory Method

Esta pasta contém dois exemplos práticos do padrão Factory Method.

## Exemplos

- `notification-channels`: encapsula a criação de notificações por e-mail, SMS e push.
- `payment-methods`: encapsula a criação de pagamentos por Pix, cartão de crédito e boleto.

## Componentes do padrão

- `Product`: interface ou classe abstrata que define o contrato comum dos objetos criados.
- `ConcreteProduct`: implementações concretas do produto, cada uma com comportamento específico.
- `Creator`: classe abstrata ou base que declara o método fábrica e concentra o fluxo principal da operação.
- `ConcreteCreator`: classes concretas que sobrescrevem o método fábrica para decidir qual produto instanciar.
- `Cliente`: classe que consome o creator sem depender diretamente das classes concretas de produto.

## Como os componentes se comunicam

O cliente interage com um `Creator`, não com produtos concretos. Durante a execução, o creator chama o método fábrica para obter um `Product`.

Cada `ConcreteCreator` decide qual `ConcreteProduct` será criado. Depois disso, o fluxo continua usando apenas o contrato comum definido por `Product`.

Com isso, a criação dos objetos fica isolada em um ponto específico da arquitetura, enquanto o restante da aplicação opera com abstrações.

## Diagrama PlantUML

O diagrama deste padrão está em [factory-method.puml](/home/gabriel-ramos/IdeaProjects/faculdade/arquitetura_software/design-pattern-gof/creational/factory-method/factory-method.puml).

## Ideia arquitetural

O Factory Method é útil quando a aplicação precisa variar o tipo de objeto criado sem espalhar condicionais e acoplamento pelas camadas de negócio.

Ele melhora extensibilidade e organização da criação, mas não deve ser usado quando a variação é mínima ou quando a abstração adiciona complexidade desnecessária ao domínio.
