# Template Method

Esta pasta contém dois exemplos práticos do padrão Template Method.

## Exemplos

- `report-export`: reaproveita o fluxo de exportação de relatórios variando o formato final.
- `payment-processing`: reaproveita o fluxo de processamento de pagamento variando etapas específicas por método.

## Componentes do padrão

- `AbstractClass`: define o esqueleto do algoritmo.
- `TemplateMethod`: operação principal que organiza a sequência fixa.
- `PrimitiveOperation`: etapas abstratas ou sobrescritas pelas subclasses.
- `ConcreteClass`: implementação concreta das variações.
- `Client`: classe que escolhe qual implementação executar.

## Como os componentes se comunicam

O cliente executa o método template da classe abstrata ou de uma subclasse concreta.

Esse método controla a ordem fixa do processo e delega apenas as etapas variáveis para as subclasses.

Com isso, o sistema reaproveita a estrutura do algoritmo sem repetir a sequência completa em várias classes.

## Diagrama PlantUML

O diagrama deste padrão está em [template-method.puml](./template-method.puml).

## Ideia arquitetural

O Template Method é útil quando vários fluxos compartilham o mesmo esqueleto, mas diferem em algumas etapas.

Ele melhora reaproveitamento e padronização, especialmente quando a ordem do processo precisa permanecer consistente.
