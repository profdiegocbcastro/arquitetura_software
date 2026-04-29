import { DomainError } from "../errors/domainError.js";
import { StandingsService } from "../services/standingsService.js";

/**
 * =========================================================
 * Aggregate: Championship
 * =========================================================
 *
 * Controls teams, rounds, schedule, standings, and relegation.
 */
export class Championship {
  constructor({ id, name, season, series, relegatedCount = 4 }) {
    this.id = readRequiredText(id, "id");
    this.name = readRequiredText(name, "name");
    this.season = season;
    this.series = readRequiredText(series, "series").toUpperCase();
    this.relegatedCount = relegatedCount;
    this.teams = new Map();
    this.rounds = new Map();
    this.standingsService = new StandingsService();
  }

  update({ name, season, relegatedCount }) {
    if (name !== undefined) {
      this.name = readRequiredText(name, "name");
    }

    if (season !== undefined) {
      this.season = readPositiveInteger(season, "season");
    }

    if (relegatedCount !== undefined) {
      this.relegatedCount = readNonNegativeInteger(
        relegatedCount,
        "relegatedCount"
      );
    }
  }

  registerTeam(team) {
    if (team.series !== this.series) {
      throw new DomainError(
        `${team.name} belongs to Series ${team.series}, but the championship is Series ${this.series}.`
      );
    }

    if (this.teams.has(team.id)) {
      throw new DomainError(`The team ${team.name} is already registered in the championship.`);
    }

    this.teams.set(team.id, team);
  }

  listTeams() {
    return Array.from(this.teams.values());
  }

  findTeam(teamId) {
    const team = this.teams.get(teamId);

    if (!team) {
      throw new DomainError(`Team ${teamId} not found in the championship.`);
    }

    return team;
  }

  updateTeam(teamId, data) {
    const team = this.findTeam(teamId);
    const currentSeries = team.series;

    team.update(data);

    if (team.series !== this.series) {
      const givenSeries = team.series;
      team.update({ series: currentSeries });
      throw new DomainError(
        `${team.name} belongs to Series ${givenSeries}, but the championship is Series ${this.series}.`
      );
    }

    return team;
  }

  removeTeam(teamId) {
    this.findTeam(teamId);

    const teamHasMatch = this.listMatches().some((match) => match.involvesTeam(teamId));

    if (teamHasMatch) {
      throw new DomainError(`Cannot remove team ${teamId} because it has matches.`);
    }

    return this.teams.delete(teamId);
  }

  addRound(round) {
    if (this.rounds.has(round.number)) {
      throw new DomainError(`The round ${round.number} already exists in the championship.`);
    }

    for (const match of round.matches) {
      this.validateRegisteredTeam(match.homeTeamId);
      this.validateRegisteredTeam(match.awayTeamId);
    }

    this.rounds.set(round.number, round);
  }

  listRounds() {
    return Array.from(this.rounds.values()).sort((a, b) => a.number - b.number);
  }

  findRound(number) {
    const roundNumber = readPositiveInteger(number, "number");
    const round = this.rounds.get(roundNumber);

    if (!round) {
      throw new DomainError(`Round ${roundNumber} not found.`);
    }

    return round;
  }

  removeRound(number) {
    const round = this.findRound(number);

    if (round.matches.some((match) => match.isClosed())) {
      throw new DomainError(
        `Cannot remove round ${round.number} because it has closed matches.`
      );
    }

    return this.rounds.delete(round.number);
  }

  updateRound(currentNumber, { number }) {
    const round = this.findRound(currentNumber);
    const newNumber = readPositiveInteger(number, "number");

    if (newNumber !== round.number && this.rounds.has(newNumber)) {
      throw new DomainError(`The round ${newNumber} already exists in the championship.`);
    }

    this.rounds.delete(round.number);
    round.number = newNumber;

    for (const match of round.matches) {
      match.roundNumber = newNumber;
    }

    this.rounds.set(newNumber, round);
    return round;
  }

  addMatch(roundNumber, match) {
    const round = this.findRound(roundNumber);

    this.validateRegisteredTeam(match.homeTeamId);
    this.validateRegisteredTeam(match.awayTeamId);
    round.addMatch(match);
  }

  updateMatch(matchId, { homeTeamId, awayTeamId }) {
    const { round, match } = this.findMatchWithRound(matchId);
    const homeOriginal = match.homeTeamId;
    const awayOriginal = match.awayTeamId;

    try {
      match.updateTeams({ homeTeamId, awayTeamId });
      this.validateRegisteredTeam(match.homeTeamId);
      this.validateRegisteredTeam(match.awayTeamId);
      round.validateAvailableTeams(match, match.id);
    } catch (error) {
      match.updateTeams({
        homeTeamId: homeOriginal,
        awayTeamId: awayOriginal,
      });
      throw error;
    }

    return match;
  }

  removeMatch(matchId) {
    const { round, match } = this.findMatchWithRound(matchId);

    if (match.isClosed()) {
      throw new DomainError(`Cannot remove closed match ${matchId}.`);
    }

    return round.removeMatch(matchId);
  }

  registerResult({ matchId, homeGoals, awayGoals }) {
    const match = this.findMatch(matchId);
    match.close(homeGoals, awayGoals);
  }

  updateResult({ matchId, homeGoals, awayGoals }) {
    const match = this.findMatch(matchId);
    match.updateResult(homeGoals, awayGoals);
  }

  removeResult(matchId) {
    const match = this.findMatch(matchId);
    match.removeResult();
  }

  findMatch(matchId) {
    return this.findMatchWithRound(matchId).match;
  }

  findMatchWithRound(matchId) {
    for (const round of this.rounds.values()) {
      const match = round.matches.find((item) => item.id === matchId);

      if (match) {
        return { round, match };
      }
    }

    throw new DomainError(`Match ${matchId} not found.`);
  }

  listMatches() {
    return Array.from(this.rounds.values()).flatMap((round) => round.matches);
  }

  standings() {
    return this.standingsService.calculate(
      Array.from(this.teams.values()),
      this.listMatches()
    );
  }

  relegationZone() {
    if (this.series !== "A") {
      return [];
    }

    return this.standings().slice(-this.relegatedCount);
  }

  nextSeasonSerieB() {
    return this.relegationZone().map((row) => ({
      teamId: row.team.id,
      name: row.team.name,
      origin: `Relegated from Series ${this.series} ${this.season}`,
      nextSeries: "B",
    }));
  }

  validateRegisteredTeam(teamId) {
    if (!this.teams.has(teamId)) {
      throw new DomainError(`Team ${teamId} is not registered in the championship.`);
    }
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} is required.`);
  }

  return normalizedValue;
}

function readPositiveInteger(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new DomainError(`${fieldName} must be a positive integer.`);
  }

  return numericValue;
}

function readNonNegativeInteger(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new DomainError(`${fieldName} must be an integer greater than or equal to zero.`);
  }

  return numericValue;
}
