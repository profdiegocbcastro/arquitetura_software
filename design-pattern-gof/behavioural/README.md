# Padrões Comportamentais

Esta pasta reúne os padrões comportamentais do GoF, cujo foco principal é organizar a colaboração entre objetos, a distribuição de responsabilidades e o fluxo de execução das regras de negócio.

## Padrões desta categoria

- [Chain of Responsibility](./chain-of-responsibility/README.md): encadeia handlers para processar ou encaminhar uma solicitação sem acoplar o cliente a um tratamento específico.
- [Command](./command/README.md): encapsula uma ação como objeto para desacoplar quem pede a execução de quem realmente a realiza.
- [Iterator](./iterator/README.md): fornece uma forma padronizada de percorrer uma coleção sem expor sua estrutura interna.
- [Mediator](./mediator/README.md): centraliza a comunicação entre objetos para reduzir dependências diretas entre eles.
- [Memento](./memento/README.md): captura e restaura o estado de um objeto sem violar seu encapsulamento.
- [Observer](./observer/README.md): notifica automaticamente dependentes quando o estado de um objeto observado muda.
- [State](./state/README.md): altera o comportamento de um objeto conforme seu estado interno atual.
- [Strategy](./strategy/README.md): encapsula algoritmos intercambiáveis atrás de um contrato comum.
- [Template Method](./template-method/README.md): define o esqueleto de um algoritmo e delega etapas variáveis para subclasses.
- [Visitor](./visitor/README.md): separa operações de uma estrutura de objetos sem modificar as classes dos elementos.

## Quando é interessante usar cada padrão

### Chain of Responsibility

Use quando uma mesma solicitação pode passar por várias etapas independentes, como validações, filtros, middlewares, aprovações ou políticas de processamento.

Ele é interessante quando você quer evitar condicionais grandes e concentradas em um único serviço, distribuindo cada responsabilidade em um handler específico. Em cenários muito simples, o encadeamento pode adicionar mais estrutura do que benefício.

### Command

Use quando a aplicação precisa tratar operações como objetos, seja para montar filas, histórico, undo, agendamento, botões configuráveis ou execução desacoplada.

Ele é interessante quando você quer separar quem dispara a ação de quem conhece a lógica concreta da execução. Em fluxos muito diretos, a camada de comandos pode ser desnecessária.

### Iterator

Use quando a aplicação precisa percorrer coleções de forma consistente sem acoplar o cliente à estrutura interna de arrays, listas, árvores, páginas ou agregados customizados.

Ele é interessante quando a forma de navegação pode variar ou quando você quer esconder detalhes da coleção. Em estruturas muito simples, um laço direto pode bastar.

### Mediator

Use quando vários objetos colaboram entre si e a comunicação direta entre todos começa a gerar acoplamento excessivo, principalmente em interfaces, formulários, chats e fluxos coordenados.

Ele é interessante quando você quer concentrar a orquestração em um ponto central. Em interações pequenas, pode ser abstração demais.

### Memento

Use quando é necessário salvar snapshots de estado para permitir undo, rollback, checkpoints ou restauração futura sem expor detalhes internos do objeto.

Ele é interessante quando o estado precisa ser preservado com segurança e encapsulamento. Em objetos muito simples, copiar o estado diretamente pode ser suficiente.

### Observer

Use quando uma alteração em um objeto deve disparar reações automáticas em outros, como notificações, dashboards, listeners, assinaturas e eventos de domínio.

Ele é interessante para desacoplar o emissor dos consumidores da mudança. Em cenários pequenos, chamadas diretas podem ser mais simples.

### State

Use quando o comportamento de um objeto muda conforme sua fase atual, como pedido, documento, player, conexão ou workflow.

Ele é interessante quando você quer remover condicionais espalhadas baseadas em status e transferir a lógica para estados explícitos. Em fluxos triviais, pode ser excesso de classes.

### Strategy

Use quando existem várias formas de executar a mesma tarefa, como cálculo de frete, ordenação, autenticação, compressão ou política de preço.

Ele é interessante quando você quer trocar algoritmos sem alterar o cliente principal. Se só existir uma implementação estável, a abstração pode não compensar.

### Template Method

Use quando diferentes fluxos seguem a mesma sequência geral, mas algumas etapas específicas variam conforme o caso.

Ele é interessante para reaproveitar a estrutura do algoritmo e manter consistência entre implementações. Perde valor quando as variações são pequenas e a herança não se justifica.

### Visitor

Use quando a aplicação precisa aplicar várias operações diferentes sobre uma mesma estrutura de objetos, sem modificar constantemente as classes desses elementos.

Ele é interessante quando a estrutura é relativamente estável, mas as operações crescem com frequência. Se os elementos mudam o tempo todo, o custo de manutenção do visitor aumenta.

## Leitura arquitetural

Os padrões comportamentais passam a fazer sentido quando o problema principal deixa de ser "como criar" ou "como compor" objetos e passa a ser "como eles interagem" sem gerar regras rígidas, fluxos monolíticos ou responsabilidades misturadas.

Neste conjunto:

- `Chain of Responsibility` organiza o fluxo em etapas encadeadas, onde cada handler pode processar a solicitação ou delegá-la para o próximo.
- `Command` transforma operações em objetos reutilizáveis, executáveis e, quando necessário, reversíveis.
- `Iterator` padroniza a navegação sobre coleções.
- `Mediator` centraliza a colaboração entre participantes.
- `Memento` preserva e restaura snapshots de estado.
- `Observer` propaga mudanças para assinantes interessados.
- `State` muda comportamento por estado interno explícito.
- `Strategy` troca algoritmos mantendo o mesmo contrato.
- `Template Method` reaproveita o esqueleto de um processo.
- `Visitor` adiciona novas operações sobre uma estrutura existente.

Escolher o padrão correto depende do tipo de interação dominante: encadeamento, execução encapsulada, navegação, coordenação, restauração de estado, notificação, variação de comportamento, variação de algoritmo, reaproveitamento de fluxo ou operações sobre estruturas.
