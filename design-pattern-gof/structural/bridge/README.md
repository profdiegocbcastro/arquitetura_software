# Bridge

Esta pasta contém dois exemplos práticos do padrão Bridge.

## Exemplos

- `report-formats`: separa tipos de relatório, como vendas, usuários e financeiro, dos formatos de saída, como PDF, Excel e HTML.
- `data-storage`: separa tipos de dados, como usuário e produto, dos meios de armazenamento, como memória, Redis e PostgreSQL.

## Componentes do padrão

- `Abstraction`: camada de alto nível usada pelo cliente.
- `RefinedAbstraction`: especializações concretas da abstração.
- `Implementor`: contrato da implementação variada.
- `ConcreteImplementor`: implementações concretas que executam a operação técnica.
- `Client`: classe que combina abstração e implementação em tempo de execução.

## Como os componentes se comunicam

O cliente trabalha com a `Abstraction`, que mantém uma referência para um `Implementor`.

Quando a abstração precisa executar uma operação, ela delega a parte variável para o implementador. Assim, cada lado da hierarquia pode evoluir independentemente.

Com isso, a aplicação evita multiplicar subclasses combinatórias, como `SalesPdfReport`, `SalesHtmlReport`, `SalesExcelReport` e assim por diante.

## Diagrama PlantUML

O diagrama deste padrão está em [bridge.puml](./bridge.puml).

## Ideia arquitetural

O Bridge é útil quando existem duas dimensões de variação independentes no mesmo problema e ambas precisam evoluir sem acoplamento direto.

O ponto central é este: o problema não tem apenas uma variação. Ele tem duas hierarquias diferentes que mudam por motivos diferentes. No exemplo de relatórios, um lado varia por tipo de relatório e o outro por formato de saída. No exemplo de armazenamento, um lado varia por tipo de dado e o outro por tecnologia de persistência.

Quando não usamos Bridge, o desenho tende a seguir por herança direta. Isso normalmente leva a classes combinatórias, como `SalesPdfReport`, `SalesExcelReport`, `FinancePdfReport`, `FinanceHtmlReport` e assim por diante. O mesmo acontece com armazenamento: `UserMemoryStorage`, `UserRedisStorage`, `ProductMemoryStorage`, `ProductPostgresStorage`. À medida que novas combinações surgem, a quantidade de classes cresce em efeito multiplicador.

Esse crescimento traz alguns problemas arquiteturais:

- aumento de acoplamento entre regra de negócio e detalhe técnico
- duplicação de comportamento em várias subclasses parecidas
- dificuldade para evoluir apenas um dos lados da variação
- maior risco de inconsistência entre combinações implementadas

O Bridge resolve isso separando claramente os dois eixos. A abstração representa o conceito principal do domínio. A implementação representa o detalhe técnico ou operacional que pode variar de forma independente. Em vez de herdar tudo junto, a abstração passa a compor um implementador.