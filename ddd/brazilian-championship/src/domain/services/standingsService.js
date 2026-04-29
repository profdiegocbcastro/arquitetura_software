import { StandingRow } from "../value-objects/standingRow.js";

/**
 * =========================================================
 * Domain Service: Standings
 * =========================================================
 */
export class StandingsService {
  calculate(teams, matches) {
    const rowsByTeam = new Map();

    for (const team of teams) {
      rowsByTeam.set(team.id, {
        team,
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      });
    }

    for (const match of matches.filter((item) => item.isClosed())) {
      const home = rowsByTeam.get(match.homeTeamId);
      const away = rowsByTeam.get(match.awayTeamId);
      const winnerId = match.score.winnerId(match.homeTeamId, match.awayTeamId);

      applyScore(home, match.score.homeGoals, match.score.awayGoals);
      applyScore(away, match.score.awayGoals, match.score.homeGoals);

      if (winnerId === null) {
        home.draws += 1;
        away.draws += 1;
      } else if (winnerId === match.homeTeamId) {
        home.wins += 1;
        away.losses += 1;
      } else {
        away.wins += 1;
        home.losses += 1;
      }
    }

    return Array.from(rowsByTeam.values())
      .map((row) => new StandingRow({ position: 0, ...row }))
      .sort(compareStandings)
      .map((row, index) => row.withPosition(index + 1));
  }
}

function applyScore(row, goalsFor, goalsAgainst) {
  row.games += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
}

function compareStandings(a, b) {
  return (
    b.points - a.points ||
    b.wins - a.wins ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.losses - b.losses ||
    a.team.name.localeCompare(b.team.name)
  );
}
