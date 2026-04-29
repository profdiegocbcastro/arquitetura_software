# Campeonato Brasileiro - DDD

Este exemplo simula um sistema de campeonato brasileiro usando **DDD**.

- **Campeonato** controla times, rodadas, tabela e classificação
- **Partida** controla placar e eventos
- **Rodada** impede que um time jogue duas vezes na mesma rodada
- **Classificação** calcula pontos, vitórias, saldo e critérios de desempate
- **Rebaixamento** define quem cai para a Série B

---

# Arquitetura

```text
Interface de demonstração
        |
        v
Casos de uso da aplicação
        |
        v
Domínio
|-- Agregado Campeonato
|   |-- Rodadas
|   |-- Times
|   `-- Classificação
|
`-- Agregado Partida
    |-- Placar
    `-- Eventos

Infraestrutura
`-- Repositório em memória
```

---

# Estrutura do projeto

```text
campeonato-brasileiro
|
|-- package.json
|-- README.md
|-- container.puml
`-- src
    |-- main.js
    |-- application
    |   `-- use-cases
    |       |-- montarCampeonatoBrasileiroUseCase.js
    |       `-- registrarResultadoPartidaUseCase.js
    |-- domain
    |   |-- entities
    |   |   |-- campeonato.js
    |   |   |-- jogador.js
    |   |   |-- partida.js
    |   |   |-- rodada.js
    |   |   `-- time.js
    |   |-- errors
    |   |   `-- domainError.js
    |   |-- services
    |   |   |-- classificacaoService.js
    |   |   `-- tabelaService.js
    |   `-- value-objects
    |       |-- classificacaoLinha.js
    |       `-- placar.js
    `-- infrastructure
        `-- repositories
            `-- campeonatoRepositoryInMemory.js
```

---

# Descrição dos componentes

## `domain/entities/campeonato.js`

Agregado principal do exemplo.

Define as regras centrais:

- apenas times da mesma série entram no campeonato
- uma rodada não pode ser cadastrada duas vezes
- a classificação é calculada a partir das partidas encerradas
- a zona de rebaixamento usa a classificação oficial do campeonato

Fluxo interno:

```text
Campeonato -> Rodadas -> Partidas -> Placar
          `-> Classificação
          `-> Rebaixamento
```

---

## `domain/entities/partida.js`

Agregado responsavel por uma partida.

Controla:

- mandante e visitante
- placar
- eventos da partida
- encerramento da partida

Uma partida não pode:

- ter o mesmo time dos dois lados
- receber placar negativo
- ser encerrada duas vezes

---

## `domain/entities/rodada.js`

Entidade que agrupa partidas de uma rodada.

Regra importante:

- um time não pode jogar duas vezes na mesma rodada

Essa regra fica no domínio porque faz parte da linguagem do campeonato, não de banco, API ou tela.

---

## `domain/value-objects/placar.js`

Value Object que representa o placar.

Exemplo:

```text
2x1
```

Ele não tem identidade própria. O valor importa mais do que um `id`.

---

## `domain/value-objects/classificacaoLinha.js`

Value Object que representa a linha de classificação de um time.

Contem:

- posicao
- pontos
- jogos
- vitórias
- empates
- derrotas
- gols pro
- gols contra
- saldo de gols

---

# Regras de negócio implementadas

- vitória vale `3` pontos
- empate vale `1` ponto
- derrota vale `0` ponto
- critérios de desempate:
  - pontos
  - vitórias
  - saldo de gols
  - gols pro
  - menor número de derrotas
  - nome do time
- um time não pode jogar contra ele mesmo
- um time não pode jogar duas vezes na mesma rodada
- uma partida não pode ser encerrada duas vezes
- placar não aceita gols negativos
- Campeonato Série A gera zona de rebaixamento para a Série B

---

# Diagrama C4 PlantUML

O arquivo `container.puml` segue o mesmo formato dos outros exemplos de arquitetura e mostra a divisão interna da aplicação:

```text
Interface -> Aplicação -> Domínio -> Infraestrutura
```

No container `Domínio` ficam os agregados, entidades, value objects e serviços responsáveis pelas regras de negócio.

---

# Como executar

1. Entre na pasta do exemplo:

```bash
cd "ddd/campeonato-brasileiro"
```

2. Execute a simulação:

```bash
npm start
```

---

# Saida esperada

A simulação monta um campeonato com 20 times, cria a tabela em turno único, registra os resultados e imprime:

- resumo do campeonato
- top 6 da classificação
- zona de rebaixamento
- clubes que jogariam a Série B na próxima temporada

---

# Leitura arquitetural

Esse exemplo demonstra de forma direta:

- o domínio não depende de Express, banco, Docker ou framework
- entidades protegem regras do negócio
- agregados concentram consistência
- value objects representam conceitos sem identidade
- casos de uso orquestram o domínio
- infraestrutura apenas guarda e recupera dados
- classificação e rebaixamento são regras do domínio, não consultas soltas espalhadas pelo sistema
