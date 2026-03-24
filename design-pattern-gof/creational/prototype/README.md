# Prototype

Esta pasta contém dois exemplos práticos do padrão Prototype.

## Exemplos

- `report-templates`: clona um template-base de relatório para gerar relatórios diferentes mantendo a mesma estrutura.
- `forwarded-messages`: clona um esquema-base de mensagem encaminhada para personalizar o envio para vários destinatários.

## Componentes do padrão

- `Prototype`: contrato que define a operação de clonagem.
- `ConcretePrototype`: objeto concreto que sabe como clonar seu próprio estado.
- `Cliente`: classe que solicita clones e aplica ajustes específicos após a clonagem.
- `Protótipo base`: instância previamente configurada que serve como modelo para novos objetos.

## Como os componentes se comunicam

O cliente mantém ou recebe um protótipo previamente configurado. Quando precisa de um novo objeto parecido, solicita sua clonagem em vez de recriar tudo do zero.

O `ConcretePrototype` duplica seu estado interno e devolve uma nova instância. Depois disso, o cliente personaliza apenas os campos que diferem do modelo original.

Com isso, a aplicação reaproveita estruturas prontas, reduz repetição de configuração e mantém consistência entre objetos semelhantes.

## Diagrama PlantUML

O diagrama deste padrão está em [prototype.puml](/home/gabriel-ramos/IdeaProjects/faculdade/arquitetura_software/design-pattern-gof/creational/prototype/prototype.puml).

## Ideia arquitetural

O Prototype é útil quando criar um objeto do zero é custoso, repetitivo ou depende de uma configuração base que já existe e deve ser reaproveitada.

Ele reduz duplicação de montagem e acelera a criação de variações, mas exige cuidado com cópia rasa e cópia profunda para evitar compartilhamento acidental de estado interno.
