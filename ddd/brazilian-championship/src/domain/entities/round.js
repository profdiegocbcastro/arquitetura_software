import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entity: Round
 * =========================================================
 *
 * Ensures a team does not play twice in the same round.
 */
export class Round {
  constructor(number) {
    if (!Number.isInteger(number) || number <= 0) {
      throw new DomainError("Round number must be a positive integer.");
    }

    this.number = number;
    this.matches = [];
  }

  addMatch(match) {
    this.validateAvailableTeams(match);

    this.matches.push(match);
  }

  findMatch(matchId) {
    const match = this.matches.find((item) => item.id === matchId);

    if (!match) {
      throw new DomainError(`Match ${matchId} not found in round ${this.number}.`);
    }

    return match;
  }

  removeMatch(matchId) {
    const index = this.matches.findIndex((item) => item.id === matchId);

    if (index === -1) {
      throw new DomainError(`Match ${matchId} not found in round ${this.number}.`);
    }

    return this.matches.splice(index, 1)[0];
  }

  validateAvailableTeams(match, ignoredMatchId = null) {
    const teamAlreadyPlaysInRound = this.matches.some(
      (existingMatch) =>
        existingMatch.id !== ignoredMatchId &&
        (existingMatch.involvesTeam(match.homeTeamId) ||
          existingMatch.involvesTeam(match.awayTeamId))
    );

    if (teamAlreadyPlaysInRound) {
      throw new DomainError(
        `Round ${this.number} already has a match with one of the informed teams.`
      );
    }
  }
}
