# Adapter

Esta pasta contém três exemplos práticos do padrão Adapter.

## Exemplos

- `payment-client-adapter`: adapta o cliente externo do Mercado Pago para a interface de gateway esperada pelo checkout.
- `mongo-collection-repository`: adapta uma collection MongoDB para a interface de repositório usada pela aplicação.
- `dto-mapper-adapter`: adapta um payload legado para o DTO moderno esperado pela API.

## Componentes do padrão

- `Target`: interface esperada pelo sistema cliente.
- `Client`: parte da aplicação que trabalha com o contrato `Target`.
- `Adaptee`: classe existente com interface incompatível.
- `Adapter`: classe intermediária que implementa o `Target` e traduz chamadas para o `Adaptee`.

## Como os componentes se comunicam

O cliente conhece apenas a interface `Target` e executa seu fluxo principal com base nesse contrato.

O `Adapter` recebe a chamada do cliente, converte parâmetros, nomes de campos ou estruturas e delega a execução ao `Adaptee`, que possui uma interface diferente.

Com isso, o sistema integra componentes legados, externos ou incompatíveis sem alterar a regra principal da aplicação.

## Diagrama PlantUML

O diagrama deste padrão está em [adapter.puml](./adapter.puml).

## Ideia arquitetural

O Adapter é útil quando a aplicação precisa integrar uma classe, SDK, biblioteca ou estrutura de dados que não segue a interface esperada internamente.

Ele preserva a estabilidade do sistema cliente e concentra a tradução de contratos em uma camada específica, mas pode mascarar incompatibilidades mais profundas quando usado sem critério.
