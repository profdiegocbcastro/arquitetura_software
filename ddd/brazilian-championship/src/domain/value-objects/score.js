import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Value Object: Score
 * =========================================================
 *
 * Represents a domain value such as 2x1.
 */
export class Score {
  constructor(homeGoals, awayGoals) {
    this.homeGoals = readGoals(homeGoals, "homeGoals");
    this.awayGoals = readGoals(awayGoals, "awayGoals");
  }

  isDraw() {
    return this.homeGoals === this.awayGoals;
  }

  winnerId(homeTeamId, awayTeamId) {
    if (this.isDraw()) {
      return null;
    }

    return this.homeGoals > this.awayGoals ? homeTeamId : awayTeamId;
  }

  goalsByTeam(teamId, homeTeamId, awayTeamId) {
    if (teamId === homeTeamId) {
      return this.homeGoals;
    }

    if (teamId === awayTeamId) {
      return this.awayGoals;
    }

    throw new DomainError(`Team ${teamId} is not part of this match.`);
  }

  goalsAgainstTeam(teamId, homeTeamId, awayTeamId) {
    if (teamId === homeTeamId) {
      return this.awayGoals;
    }

    if (teamId === awayTeamId) {
      return this.homeGoals;
    }

    throw new DomainError(`Team ${teamId} is not part of this match.`);
  }

  toString() {
    return `${this.homeGoals}x${this.awayGoals}`;
  }
}

function readGoals(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new DomainError(`${fieldName} must be an integer greater than or equal to zero.`);
  }

  return numericValue;
}
