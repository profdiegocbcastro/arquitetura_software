# Visitor

Esta pasta contém dois exemplos práticos do padrão Visitor.

## Exemplos

- `shopping-cart-pricing`: aplica uma operação de cálculo de preço sobre itens diferentes do carrinho.
- `document-audit`: aplica uma operação de auditoria sobre tipos diferentes de documento.

## Componentes do padrão

- `Visitor`: contrato que declara uma operação para cada tipo de elemento.
- `ConcreteVisitor`: implementação concreta de uma operação sobre a estrutura.
- `Element`: contrato dos objetos visitaveis.
- `ConcreteElement`: elemento concreto que aceita visitors.
- `Client`: classe que percorre a estrutura e aplica o visitor.

## Como os componentes se comunicam

O cliente percorre os elementos e chama `accept(visitor)` em cada um.

Cada elemento delega a operação para o método adequado do visitor, fazendo o despacho conforme seu tipo concreto.

Com isso, novas operações podem ser adicionadas sem modificar a estrutura dos elementos.

## Diagrama PlantUML

O diagrama deste padrão está em [visitor.puml](./visitor.puml).

## Ideia arquitetural

O Visitor é útil quando a estrutura dos elementos e relativamente estavel, mas novas operações precisam ser adicionadas com frequência.

Ele separa bem dados e operações, embora aumente o custo quando novos tipos de elemento surgem com frequência.
