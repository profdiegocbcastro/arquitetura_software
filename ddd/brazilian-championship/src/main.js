import { BuildBrazilianChampionshipUseCase } from "./application/use-cases/championship/buildBrazilianChampionshipUseCase.js";
import { RegisterMatchResultUseCase } from "./application/use-cases/result/registerMatchResultUseCase.js";
import { ChampionshipRepositoryInMemory } from "./infrastructure/repositories/championshipRepositoryInMemory.js";

/**
 * =========================================================
 * DDD - Brazilian Championship
 * =========================================================
 *
 * Example flow:
 *
 * main -> Use Case -> Domain -> In-memory repository
 */

/**
 * ===============================
 * 1) Building dependencies
 * ===============================
 */
const championshipRepository = new ChampionshipRepositoryInMemory();
const buildChampionship = new BuildBrazilianChampionshipUseCase(championshipRepository);
const registerResult = new RegisterMatchResultUseCase(championshipRepository);

/**
 * ===============================
 * 2) Creating championship and schedule
 * ===============================
 */
const championship = buildChampionship.execute();

/**
 * ===============================
 * 3) Simulating results
 * ===============================
 */
for (const match of championship.listMatches()) {
  const { homeGoals, awayGoals } = generateDeterministicScore(match);

  registerResult.execute({
    championshipId: championship.id,
    matchId: match.id,
    homeGoals,
    awayGoals,
  });
}

/**
 * ===============================
 * 4) Printing domain output
 * ===============================
 */
printSummary(championship);

function generateDeterministicScore(match) {
  const homeBase = sumCharacters(match.homeTeamId) + match.roundNumber;
  const awayBase = sumCharacters(match.awayTeamId) + match.roundNumber * 2;

  return {
    homeGoals: homeBase % 5,
    awayGoals: awayBase % 4,
  };
}

function sumCharacters(value) {
  return value.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function printSummary(championship) {
  const standings = championship.standings();
  const relegated = championship.relegationZone();
  const seriesB = championship.nextSeasonSerieB();

  console.log("\n=== Brazilian Championship - DDD ===");
  console.log(`Season: ${championship.season}`);
  console.log(`Series: ${championship.series}`);
  console.log(`Registered teams: ${championship.teams.size}`);
  console.log(`Rounds: ${championship.rounds.size}`);
  console.log(`Registered matches: ${championship.listMatches().length}`);

  console.log("\n=== Top 6 ===");
  printTable(standings.slice(0, 6));

  console.log("\n=== Relegation zone ===");
  printTable(relegated);

  console.log("\n=== Next season Series B ===");
  for (const item of seriesB) {
    console.log(`${item.name} -> ${item.nextSeries} (${item.origin})`);
  }
}

function printTable(rows) {
  for (const standingRow of rows) {
    const row = standingRow.toTableRow();

    console.log(
      `${row.position.toString().padStart(2, "0")} | ${row.team.padEnd(22)} | ` +
        `${row.points.toString().padStart(2, " ")} pts | ` +
        `${row.wins}V ${row.draws}E ${row.losses}D | ` +
        `SG ${row.goalDifference}`
    );
  }
}
