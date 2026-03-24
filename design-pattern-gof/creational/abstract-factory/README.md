# Abstract Factory

Esta pasta contém dois exemplos práticos do padrão Abstract Factory.

## Exemplos

- `database-clients`: encapsula famílias compatíveis de conexão e repositório para PostgreSQL, MySQL e MongoDB.
- `payment-gateways`: encapsula famílias compatíveis de processador de pagamento e processador de reembolso para PayPal, Mercado Pago e Stripe.

## Componentes do padrão

- `AbstractFactory`: interface ou classe abstrata que declara a criação de uma família de produtos relacionados.
- `ConcreteFactory`: implementações concretas que criam produtos compatíveis entre si.
- `AbstractProduct`: contratos comuns para cada tipo de produto da família.
- `ConcreteProduct`: implementações concretas de cada produto para uma família específica.
- `Cliente`: classe que usa a fábrica abstrata para trabalhar com produtos sem depender de implementações concretas.

## Como os componentes se comunicam

O cliente recebe uma `AbstractFactory` e solicita a criação dos produtos de que precisa. Ele não instancia diretamente classes concretas.

Cada `ConcreteFactory` cria uma família coerente de `ConcreteProduct`. Isso garante compatibilidade entre os objetos produzidos na mesma operação.

Depois da criação, o cliente interage apenas com os contratos dos produtos abstratos, mantendo a lógica de negócio desacoplada das implementações concretas.

## Diagrama PlantUML

O diagrama deste padrão está em [abstract-factory.puml](./abstract-factory.puml).

## Ideia arquitetural

O Abstract Factory é útil quando a aplicação precisa trocar conjuntos inteiros de objetos relacionados sem alterar o fluxo principal das camadas de negócio.

Ele aumenta consistência entre produtos da mesma família e reduz acoplamento com tecnologias concretas, mas adiciona mais abstrações e pode ser excessivo quando existe apenas um produto variável.
