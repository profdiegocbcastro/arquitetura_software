# Brazilian Championship - DDD

Este exemplo simula um campeonato brasileiro usando **DDD**.

- **Championship** controla teams, rounds, schedule, standings e relegation
- **Match** controla score e events
- **Round** impede que um team jogue duas vezes na mesma rodada
- **Standings** calcula points, wins, goal difference e critérios de desempate
- **Relegation** define quais teams iriam para a Series B

---

# Arquitetura

```text
Interface de demonstração / Web API
        |
        v
Casos de uso da aplicação
        |
        v
Domain
|-- Aggregate Championship
|   |-- Rounds
|   |-- Teams
|   `-- Standings
|
`-- Aggregate Match
    |-- Score
    `-- Events

Infrastructure
`-- In-memory repository
```

---

# Estrutura do projeto

```text
brazilian-championship
|
|-- package.json
|-- README.md
|-- container.puml
`-- src
    |-- main.js
    |-- application
    |   `-- use-cases
    |       |-- championship
    |       |   |-- buildBrazilianChampionshipUseCase.js
    |       |   |-- createChampionshipUseCase.js
    |       |   |-- deleteChampionshipUseCase.js
    |       |   |-- findChampionshipUseCase.js
    |       |   |-- listChampionshipsUseCase.js
    |       |   `-- updateChampionshipUseCase.js
    |       |-- team
    |       |-- player
    |       |-- round
    |       |-- match
    |       |-- result
    |       |-- event
    |       |-- standings
    |       `-- shared
    |           `-- championshipLookup.js
    |-- domain
    |   |-- entities
    |   |   |-- championship.js
    |   |   |-- player.js
    |   |   |-- match.js
    |   |   |-- round.js
    |   |   `-- team.js
    |   |-- errors
    |   |   `-- domainError.js
    |   |-- services
    |   |   |-- standingsService.js
    |   |   `-- scheduleService.js
    |   `-- value-objects
    |       |-- standingRow.js
    |       `-- score.js
    `-- infrastructure
        |-- repositories
        |   `-- championshipRepositoryInMemory.js
        `-- web
            |-- server.js
            |-- controllers
            |   |-- championshipController.js
            |   |-- teamController.js
            |   |-- playerController.js
            |   |-- roundController.js
            |   |-- matchController.js
            |   |-- resultController.js
            |   |-- eventController.js
            |   |-- standingsController.js
            |   |-- demoController.js
            |   `-- healthController.js
            `-- presenters
                `-- serializers.js
```

---

# Componentes

## `domain/entities/championship.js`

Aggregate principal do exemplo.

Regras:

- apenas teams da mesma series entram no championship
- um round não pode ser cadastrado duas vezes
- standings são calculadas a partir de matches encerradas
- a relegation zone usa a standings oficial do championship

Fluxo interno:

```text
Championship -> Rounds -> Matches -> Score
          `-> Standings
          `-> Relegation
```

## `domain/entities/match.js`

Aggregate responsável por uma match.

Controla:

- home team e away team
- score
- match events
- fechamento da match

Uma match não pode:

- ter o mesmo team dos dois lados
- receber score negativo
- ser encerrada duas vezes

## `domain/entities/round.js`

Entity que agrupa matches de uma rodada.

Regra importante:

- um team não pode jogar duas vezes no mesmo round

Essa regra fica no domain porque faz parte da linguagem do campeonato, não de banco, API ou tela.

## `domain/value-objects/score.js`

Value Object que representa o score.

Exemplo:

```text
2x1
```

Ele não tem identidade própria. O valor importa mais do que um `id`.

## `domain/value-objects/standingRow.js`

Value Object que representa uma linha de standings de um team.

Contém:

- position
- points
- games
- wins
- draws
- losses
- goals for
- goals against
- goal difference

## `infrastructure/web`

Camada Web feita com **Express**.

Expõe endpoints REST para manipular:

- championships
- teams
- players
- rounds
- matches
- events
- results
- standings
- relegation e Series B

A API é separada em controllers por recurso. Controllers traduzem requisições HTTP para chamadas de use cases e serializam as respostas.

O `server.js` apenas compõe Express, controllers, use cases e dependências de infrastructure. As regras continuam protegidas dentro de entities, aggregates e services do domain.

## `application/use-cases`

Casos de uso usados pela camada Web e pela simulação.

As responsabilidades são separadas por pasta de entidade, e cada ação do sistema é representada por sua própria classe de use case.

Exemplos:

- `championship/createChampionshipUseCase.js`
- `championship/listChampionshipsUseCase.js`
- `team/createTeamUseCase.js`
- `player/deletePlayerUseCase.js`
- `match/updateMatchUseCase.js`
- `result/registerResultUseCase.js`
- `event/createEventUseCase.js`
- `standings/findRelegationUseCase.js`

Cada use case coordena repository e domain para uma ação específica. A camada Web apenas chama esses use cases.

---

# Regras de negócio implementadas

- win vale `3` points
- draw vale `1` point
- loss vale `0` points
- critérios de desempate:
  - points
  - wins
  - goal difference
  - goals for
  - menor número de losses
  - team name
- um team não pode jogar contra ele mesmo
- um team não pode jogar duas vezes no mesmo round
- uma match não pode ser encerrada duas vezes
- score não aceita goals negativos
- championship da Series A gera uma relegation zone para a Series B

---

# Diagrama C4 PlantUML

O arquivo `container.puml` segue o mesmo formato dos outros exemplos de arquitetura e mostra a divisão interna da aplicação:

```text
Interface / Web -> Application -> Domain -> Infrastructure
```

O container `Domain` possui aggregates, entities, value objects e services responsáveis pelas regras de negócio.

---

# Como executar

1. Entre na pasta do exemplo:

```bash
cd "ddd/brazilian-championship"
```

2. Execute a simulação:

```bash
npm start
```

3. Suba a Web API:

```bash
npm run start:web
```

A API sobe por padrão em:

```text
http://localhost:3000
```

---

# Endpoints principais

## Utilitário

- `GET /health`
- `POST /demo/brazilian-championship`

## Championships

- `GET /championships`
- `POST /championships`
- `GET /championships/:championshipId`
- `PUT /championships/:championshipId`
- `DELETE /championships/:championshipId`

## Teams

- `GET /championships/:championshipId/teams`
- `POST /championships/:championshipId/teams`
- `GET /championships/:championshipId/teams/:teamId`
- `PUT /championships/:championshipId/teams/:teamId`
- `DELETE /championships/:championshipId/teams/:teamId`

## Players

- `GET /championships/:championshipId/teams/:teamId/players`
- `POST /championships/:championshipId/teams/:teamId/players`
- `GET /championships/:championshipId/teams/:teamId/players/:playerId`
- `PUT /championships/:championshipId/teams/:teamId/players/:playerId`
- `DELETE /championships/:championshipId/teams/:teamId/players/:playerId`

## Rounds

- `GET /championships/:championshipId/rounds`
- `POST /championships/:championshipId/rounds`
- `GET /championships/:championshipId/rounds/:number`
- `PUT /championships/:championshipId/rounds/:number`
- `DELETE /championships/:championshipId/rounds/:number`

## Matches

- `GET /championships/:championshipId/matches`
- `POST /championships/:championshipId/rounds/:number/matches`
- `GET /championships/:championshipId/matches/:matchId`
- `PUT /championships/:championshipId/matches/:matchId`
- `DELETE /championships/:championshipId/matches/:matchId`

## Results

- `GET /championships/:championshipId/matches/:matchId/result`
- `POST /championships/:championshipId/matches/:matchId/result`
- `PUT /championships/:championshipId/matches/:matchId/result`
- `DELETE /championships/:championshipId/matches/:matchId/result`

## Events

- `GET /championships/:championshipId/matches/:matchId/events`
- `POST /championships/:championshipId/matches/:matchId/events`
- `GET /championships/:championshipId/matches/:matchId/events/:eventId`
- `PUT /championships/:championshipId/matches/:matchId/events/:eventId`
- `DELETE /championships/:championshipId/matches/:matchId/events/:eventId`

## Consultas do domain

- `GET /championships/:championshipId/standings`
- `GET /championships/:championshipId/relegation`

---

# Saída esperada

A simulação monta um championship com 20 teams, cria um schedule de turno único, registra results e imprime:

- resumo do championship
- top 6 da standings
- relegation zone
- teams que jogariam a Series B na próxima temporada

---

# Leitura arquitetural

Este exemplo demonstra:

- o domain não depende de Express, banco, Docker ou framework
- a camada Web apenas expõe operações HTTP e chama use cases
- use cases coordenam repository e domain
- entities protegem regras de negócio
- aggregates concentram consistência
- value objects representam conceitos sem identidade
- infrastructure apenas guarda e recupera dados
- standings e relegation são regras do domain, não consultas soltas espalhadas pelo sistema
