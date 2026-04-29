/**
 * =========================================================
 * Value Object: Standing Row
 * =========================================================
 */
export class StandingRow {
  constructor({ position, team, games, wins, draws, losses, goalsFor, goalsAgainst }) {
    this.position = position;
    this.team = team;
    this.games = games;
    this.wins = wins;
    this.draws = draws;
    this.losses = losses;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
    this.points = wins * 3 + draws;
    this.goalDifference = goalsFor - goalsAgainst;
  }

  withPosition(position) {
    return new StandingRow({
      position,
      team: this.team,
      games: this.games,
      wins: this.wins,
      draws: this.draws,
      losses: this.losses,
      goalsFor: this.goalsFor,
      goalsAgainst: this.goalsAgainst,
    });
  }

  toTableRow() {
    return {
      position: this.position,
      team: this.team.name,
      points: this.points,
      games: this.games,
      wins: this.wins,
      draws: this.draws,
      losses: this.losses,
      goalDifference: this.goalDifference,
      goalsFor: this.goalsFor,
      goalsAgainst: this.goalsAgainst,
    };
  }
}
