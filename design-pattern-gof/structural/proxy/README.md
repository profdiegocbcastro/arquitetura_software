# Proxy

Esta pasta contém dois exemplos práticos do padrão Proxy.

## Exemplos

- `database-lazy-loading`: usa proxy para adiar a criação da conexão real com o banco até a primeira consulta.
- `product-cache`: usa proxy para cachear leituras repetidas de produtos vindas do banco de dados.

## Componentes do padrão

- `Subject`: contrato comum compartilhado pelo objeto real e pelo proxy.
- `RealSubject`: objeto real que executa a operação principal.
- `Proxy`: objeto intermediário que controla acesso ao objeto real.
- `Client`: classe que usa o contrato comum sem precisar saber se está falando com o proxy ou com o objeto real.

## Como os componentes se comunicam

O cliente trabalha com a interface `Subject` e chama operações normalmente.

O `Proxy` recebe essas chamadas e decide o que fazer antes de delegar ao `RealSubject`. Dependendo do caso, ele pode adiar criação, validar acesso, registrar uso, controlar concorrência ou armazenar cache.

Com isso, comportamentos de controle ficam fora do objeto principal, sem mudar o contrato consumido pela aplicação.

## Diagrama PlantUML

O diagrama deste padrão está em [proxy.puml](./proxy.puml).

## Ideia arquitetural

O Proxy é útil quando o sistema precisa controlar o acesso a um objeto que já possui uma responsabilidade principal bem definida.

O ganho não está em substituir o objeto real, mas em colocar uma camada intermediária com o mesmo contrato para lidar com preocupações como lazy loading, cache, autorização, logging, proteção remota ou limitação de acesso.

Sem esse padrão, esse tipo de controle costuma cair dentro do próprio objeto real ou se espalhar pelo cliente. O resultado é mistura de responsabilidades: o objeto de domínio ou infraestrutura passa a cuidar de política de acesso, e a camada cliente passa a decidir quando instanciar, quando armazenar em cache ou quando proteger chamadas.

O Proxy mantém essas regras de controle fora do núcleo do objeto real e preserva uma interface estável para consumo.
