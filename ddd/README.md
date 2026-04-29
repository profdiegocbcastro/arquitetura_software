# DDD

Exemplos de **Domain-Driven Design** aplicados em sistemas com regras de negócio explícitas.

O objetivo desta pasta é mostrar como organizar uma aplicação com domínio, casos de uso e infraestrutura em camadas explícitas.

---

## O que é DDD?

**DDD**, ou **Domain-Driven Design**, é uma abordagem de desenvolvimento de software que coloca o **domínio do negócio** no centro do projeto.

Em vez de começar pensando em banco de dados, rotas HTTP, telas ou frameworks, o DDD começa pelas perguntas:

- quais são as regras importantes do negócio?
- quais conceitos fazem parte da linguagem usada pelos especialistas?
- quais operações não podem acontecer de forma inválida?
- quais partes do sistema mudam por causa de decisões de negócio?

No DDD, o código deve representar o negócio de forma clara. Se o sistema é sobre campeonato de futebol, termos como `Campeonato`, `Time`, `Rodada`, `Partida`, `Placar`, `Classificação` e `Rebaixamento` devem aparecer no domínio da aplicação, porque fazem parte da linguagem real do problema.

---

## Ideia principal

A ideia principal do DDD é aproximar o código da linguagem do negócio.

Exemplo:

```text
Regra de negócio:
"Um time não pode jogar duas vezes na mesma rodada."

No código:
Rodada.adicionarPartida(partida)
```

Essa regra não deveria ficar escondida em uma tela, em um controller ou em uma query SQL. Ela pertence ao domínio, porque define como o campeonato funciona.

Quando as regras ficam no domínio, o sistema tende a ficar mais fácil de entender, testar e modificar.

---

## Conceitos importantes

### Domínio

É a área de conhecimento do sistema. Representa o problema que a aplicação resolve.

Em um sistema financeiro, o domínio pode envolver contas, saldo, lançamentos e transações. Em um sistema de campeonato, o domínio envolve times, jogadores, partidas, rodadas, classificação e rebaixamento.

### Linguagem ubíqua

É a linguagem compartilhada entre desenvolvedores e pessoas que entendem do negócio.

Se o negócio chama algo de `Rodada`, o código também deve usar `Rodada`. Isso evita traduções confusas, como usar nomes técnicos que não existem para quem entende o problema.

### Entidade

É um objeto que possui identidade própria.

Exemplo: um `Time` pode continuar sendo o mesmo time mesmo que mude alguns dados, como nome do técnico ou lista de jogadores.

### Value Object

É um objeto definido pelo seu valor, não por uma identidade.

Exemplo: um `Placar` de `2x1` não precisa de um `id`. O que importa é o valor dos gols do mandante e do visitante.

### Agregado

É um conjunto de objetos do domínio que precisa manter regras de consistência em conjunto.

Exemplo: `Campeonato` pode ser um agregado que controla times, rodadas e classificação. `Partida` pode ser outro agregado responsável por placar, eventos e encerramento.

### Serviço de domínio

É usado quando uma regra de negócio não pertence naturalmente a uma única entidade ou value object.

Exemplo: calcular uma tabela de classificação pode envolver várias partidas e vários times. Por isso pode fazer sentido existir um `ClassificacaoService` dentro do domínio.

### Repositório

É uma abstração para salvar e recuperar agregados.

O domínio não precisa saber se os dados estão em memória, PostgreSQL, MongoDB ou uma API externa. Essa decisão fica na infraestrutura.

---

## Camadas em uma aplicação com DDD

A separação de responsabilidades acontece dentro do próprio projeto, deixando regras de negócio longe de detalhes técnicos.

```text
Interface
    |
    v
Aplicação
    |
    v
Domínio
    |
    v
Infraestrutura
```

### Interface

É a entrada do sistema.

Pode ser uma API HTTP, uma CLI, uma tela, um consumidor de fila ou um arquivo `main.js` de demonstração.

### Aplicação

Coordena os casos de uso.

Ela recebe uma intenção do usuário ou do sistema, busca os dados necessários, chama o domínio e salva o resultado.

Exemplo:

```text
RegistrarResultadoPartidaUseCase
```

Esse caso de uso pode carregar o campeonato, registrar o placar de uma partida e salvar o campeonato atualizado.

### Domínio

É o coração do sistema.

Contém entidades, value objects, agregados, serviços de domínio e erros de negócio. Essa camada deve concentrar as regras mais importantes e deve depender o mínimo possível de detalhes técnicos.

### Infraestrutura

Contém detalhes técnicos.

Exemplos:

- banco de dados
- repositórios concretos
- chamadas HTTP externas
- bibliotecas de mensageria
- armazenamento em memória

No exemplo deste repositório, a infraestrutura usa um repositório em memória para simplificar a execução.

---

## DDD não é sobre criar muitas pastas

Separar o projeto em `domain`, `application` e `infrastructure` ajuda, mas isso sozinho não significa que o sistema usa DDD.

O ponto mais importante é onde as regras ficam.

Se as regras de negócio estão espalhadas em controllers, rotas, componentes de tela ou scripts de banco, o projeto pode até ter uma pasta chamada `domain`, mas o domínio não está realmente no centro.

Um bom sinal de DDD é conseguir ler o domínio e entender as regras principais do negócio sem precisar abrir detalhes de banco, HTTP ou interface.

---

## Quando DDD faz sentido?

DDD costuma fazer mais sentido quando:

- o sistema tem muitas regras de negócio
- as regras mudam com frequência
- existe vocabulário específico do domínio
- o custo de uma regra errada é alto
- o projeto precisa continuar evoluindo por bastante tempo

DDD pode ser exagerado quando o sistema é basicamente CRUD simples, com poucas regras além de cadastrar, listar, editar e excluir dados.

---

## Exemplos

- `campeonato-brasileiro`: simulação de campeonato com times, jogadores, rodadas, partidas, classificação, rebaixamento e Série B.
