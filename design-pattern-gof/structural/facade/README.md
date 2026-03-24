# Facade

Esta pasta contém dois exemplos práticos do padrão Facade.

## Exemplos

- `user-registration-service-layer`: encapsula o fluxo de cadastro de usuário por meio de uma camada de serviço que coordena vários subsistemas.
- `report-generation-pipeline`: encapsula a geração de relatórios envolvendo coleta, análise, renderização, exportação e entrega.

## Componentes do padrão

- `Facade`: ponto de entrada simplificado para um conjunto de subsistemas.
- `Subsystem`: classes especializadas que executam partes específicas do processo.
- `Client`: classe que consome a facade sem precisar conhecer a orquestração interna.

## Como os componentes se comunicam

O cliente chama a `Facade` para executar uma operação de alto nível.

A facade coordena os subsistemas na ordem necessária, troca dados entre eles e devolve um resultado consolidado ao cliente.

Com isso, a aplicação esconde a complexidade operacional atrás de uma interface mais simples e estável para consumo.

## Diagrama PlantUML

O diagrama deste padrão está em [facade.puml](./facade.puml).

## Ideia arquitetural

O Facade é útil quando o sistema já possui vários serviços, utilitários ou integrações que precisam ser executados em conjunto, mas o cliente não deveria conhecer toda essa orquestração.

Sem esse padrão, a camada cliente costuma chamar vários subsistemas diretamente, acumulando responsabilidade de coordenação, ordem de execução, tratamento de falhas e transformação de dados. Isso aumenta acoplamento e espalha lógica de fluxo por lugares que não deveriam conhecê-la.

O Facade não elimina os subsistemas nem substitui sua especialização. Ele apenas cria uma entrada mais simples para um caso de uso recorrente. Por isso, é um padrão muito natural em service layers de back-end, aplicações integradoras e pipelines de processamento.
