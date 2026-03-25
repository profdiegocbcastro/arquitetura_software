# Command

Esta pasta contém dois exemplos práticos do padrão Command.

## Exemplos

- `smart-home-control`: encapsula comandos de ligar e desligar uma lâmpada por meio de um controle remoto.
- `text-editor-undo`: encapsula operações de edição de texto com suporte a histórico e undo.

## Componentes do padrão

- `Command`: contrato comum para operações executaveis.
- `ConcreteCommand`: objeto que encapsula uma ação específica e conhece o receiver.
- `Receiver`: objeto que possui a lógica real da operação.
- `Invoker`: componente que dispara o comando sem conhecer os detalhes da execução.
- `Client`: classe que monta a combinação entre invoker, command e receiver.

## Como os componentes se comunicam

O cliente instancia os receivers e cria comandos concretos apontando para eles.

O `Invoker` recebe esses comandos e apenas dispara `execute()`. A lógica concreta fica dentro do `ConcreteCommand`, que delega o trabalho real ao `Receiver`.

Com isso, a aplicação consegue trocar a ação executada, manter histórico, desfazer operações ou enfileirar tarefas sem alterar quem dispara o fluxo.

## Diagrama PlantUML

O diagrama deste padrão está em [command.puml](./command.puml).

## Ideia arquitetural

O Command é útil quando a aplicação precisa tratar a ação em si como uma unidade independente, em vez de chamar diretamente um método concreto.

Ele melhora extensibilidade e desacoplamento entre interface e execução, e fica especialmente valioso quando existe histórico, fila, macrocomandos, auditoria ou desfazer/refazer.
