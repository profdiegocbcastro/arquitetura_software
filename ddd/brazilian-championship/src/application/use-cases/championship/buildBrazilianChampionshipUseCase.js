import { Championship } from "../../../domain/entities/championship.js";
import { Player } from "../../../domain/entities/player.js";
import { Team } from "../../../domain/entities/team.js";
import { ScheduleService } from "../../../domain/services/scheduleService.js";

export class BuildBrazilianChampionshipUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
    this.scheduleService = new ScheduleService();
  }

  execute() {
    const championship = new Championship({
      id: "brazilian-championship-2026-series-a",
      name: "Brazilian Championship",
      season: 2026,
      series: "A",
      relegatedCount: 4,
    });

    const teams = createSerieATeams();

    for (const team of teams) {
      championship.registerTeam(team);
    }

    const rounds = this.scheduleService.createSingleRoundRobin(teams);

    for (const round of rounds) {
      championship.addRound(round);
    }

    this.championshipRepository.save(championship);
    return championship;
  }
}

function createSerieATeams() {
  const data = [
    ["fla", "Flamengo", "Rio de Janeiro"],
    ["pal", "Palmeiras", "São Paulo"],
    ["bot", "Botafogo", "Rio de Janeiro"],
    ["flu", "Fluminense", "Rio de Janeiro"],
    ["vas", "Vasco", "Rio de Janeiro"],
    ["cor", "Corinthians", "São Paulo"],
    ["sao", "São Paulo", "São Paulo"],
    ["san", "Santos", "Santos"],
    ["gre", "Grêmio", "Porto Alegre"],
    ["int", "Internacional", "Porto Alegre"],
    ["cru", "Cruzeiro", "Belo Horizonte"],
    ["cam", "Atlético Mineiro", "Belo Horizonte"],
    ["bah", "Bahia", "Salvador"],
    ["vit", "Vitória", "Salvador"],
    ["for", "Fortaleza", "Fortaleza"],
    ["cea", "Ceará", "Fortaleza"],
    ["cap", "Athletico Paranaense", "Curitiba"],
    ["cfc", "Coritiba", "Curitiba"],
    ["spo", "Sport", "Recife"],
    ["goi", "Goiás", "Goiânia"],
  ];

  return data.map(([id, name, city], index) => {
    const team = new Team({ id, name, city, series: "A" });

    team.addPlayer(
      new Player({
        id: `${id}-goalkeeper`,
        name: `${name} Goalkeeper`,
        position: "Goalkeeper",
        number: 1,
      })
    );

    team.addPlayer(
      new Player({
        id: `${id}-striker`,
        name: `${name} Striker`,
        position: "Striker",
        number: 9 + (index % 2),
      })
    );

    return team;
  });
}
