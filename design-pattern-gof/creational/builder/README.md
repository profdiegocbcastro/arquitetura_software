# Builder

Esta pasta contém dois exemplos práticos do padrão Builder.

## Exemplos

- `http-request-builder`: constrói objetos de requisição HTTP em etapas, com método, URL, headers, query params, body e timeout.
- `database-config-builder`: constrói objetos de configuração de banco de dados com host, porta, credenciais, SSL e tamanho do pool.

## Componentes do padrão

- `Builder`: define as etapas de construção do objeto.
- `ConcreteBuilder`: implementa as etapas e monta a representação concreta do produto.
- `Product`: objeto final construído pelo builder.
- `Director`: coordena a ordem das etapas de construção quando existe um fluxo padrão.
- `Cliente`: decide qual builder usar e quando solicitar o produto final.

## Como os componentes se comunicam

O cliente escolhe um `Builder` e pode acionar diretamente suas etapas ou delegar a sequência a um `Director`.

O `Director` chama os métodos de construção em uma ordem específica. O `ConcreteBuilder` acumula o estado necessário até que o produto final esteja pronto.

Ao final, o cliente solicita o `Product` já montado, sem precisar conhecer os detalhes internos da construção.

## Diagrama PlantUML

O diagrama deste padrão está em [builder.puml](/home/gabriel-ramos/IdeaProjects/faculdade/arquitetura_software/design-pattern-gof/creational/builder/builder.puml).

## Ideia arquitetural

O Builder é útil quando a criação de um objeto envolve muitas etapas, parâmetros opcionais ou combinações de configuração que prejudicam a legibilidade de construtores simples.

Ele melhora clareza, legibilidade e reutilização de fluxos de montagem, mas pode ser abstração demais para objetos pequenos ou triviais.
