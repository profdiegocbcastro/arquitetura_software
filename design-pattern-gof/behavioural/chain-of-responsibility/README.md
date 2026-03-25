# Chain of Responsibility

Esta pasta contém dois exemplos práticos do padrão Chain of Responsibility.

## Exemplos

- `form-validation`: encadeia validações de formulário, como campos obrigatórios, e-mail, senha e aceite de termos.
- `authentication-middleware`: encadeia middlewares de autenticação para validar header, token, status do usuário e permissão de rota.

## Componentes do padrão

- `Handler`: contrato comum para processar uma solicitação e opcionalmente encaminhá-la.
- `BaseHandler`: implementação base que mantém a referência para o próximo handler.
- `ConcreteHandler`: etapa concreta que decide se trata a solicitação ou se delega.
- `Client`: classe que inicia a chamada sem precisar conhecer qual handler concluirá o fluxo.

## Como os componentes se comunicam

O cliente envia a solicitação para o primeiro `Handler` da cadeia.

Cada handler analisa apenas a responsabilidade que lhe pertence. Se a condição local for atendida, ele delega a requisição ao próximo handler. Se encontrar um bloqueio ou concluir o tratamento, encerra o fluxo e devolve a resposta.

Com isso, o processamento deixa de ficar concentrado em um único ponto e passa a ser composto por etapas pequenas, independentes e reordenáveis.

## Diagrama PlantUML

O diagrama deste padrão está em [chain-of-responsibility.puml](./chain-of-responsibility.puml).

## Ideia arquitetural

O Chain of Responsibility é útil quando o sistema precisa aplicar várias regras sequênciais sobre a mesma solicitação, mas não quer concentrar tudo em uma classe com muitos `if` e `switch`.

Ele favorece extensão por composição de handlers e facilita reuso de etapas em diferentes fluxos. Em contrapartida, exige cuidado para manter a ordem da cadeia explícita e compreensível.
