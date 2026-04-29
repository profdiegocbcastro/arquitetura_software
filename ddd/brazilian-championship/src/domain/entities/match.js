import { DomainError } from "../errors/domainError.js";
import { Score } from "../value-objects/score.js";

/**
 * =========================================================
 * Aggregate: Match
 * =========================================================
 *
 * The match controls score and events.
 */
export class Match {
  constructor({ id, roundNumber, homeTeamId, awayTeamId }) {
    this.id = readRequiredText(id, "id");
    this.roundNumber = roundNumber;
    this.homeTeamId = readRequiredText(homeTeamId, "homeTeamId");
    this.awayTeamId = readRequiredText(awayTeamId, "awayTeamId");
    this.score = null;
    this.events = [];

    if (this.homeTeamId === this.awayTeamId) {
      throw new DomainError("A team cannot play against itself.");
    }
  }

  updateTeams({ homeTeamId, awayTeamId }) {
    if (this.isClosed()) {
      throw new DomainError("Cannot change teams in a closed match.");
    }

    const newHomeTeamId = readRequiredText(homeTeamId ?? this.homeTeamId, "homeTeamId");
    const newAwayTeamId = readRequiredText(awayTeamId ?? this.awayTeamId, "awayTeamId");

    if (newHomeTeamId === newAwayTeamId) {
      throw new DomainError("A team cannot play against itself.");
    }

    this.homeTeamId = newHomeTeamId;
    this.awayTeamId = newAwayTeamId;
  }

  registerEvent({ id, minute, type, teamId, description }) {
    if (this.isClosed()) {
      throw new DomainError("Cannot register an event in a closed match.");
    }

    const eventId = readRequiredText(id, "id");

    if (this.events.some((event) => event.id === eventId)) {
      throw new DomainError(`Event ${eventId} already exists in match ${this.id}.`);
    }

    if (teamId !== this.homeTeamId && teamId !== this.awayTeamId) {
      throw new DomainError(`Team ${teamId} is not part of this match.`);
    }

    this.events.push({
      id: eventId,
      minute: readNonNegativeInteger(minute, "minute"),
      type: readRequiredText(type, "type"),
      teamId,
      description: readRequiredText(description, "description"),
    });
  }

  findEvent(eventId) {
    const event = this.events.find((item) => item.id === eventId);

    if (!event) {
      throw new DomainError(`Event ${eventId} not found in match ${this.id}.`);
    }

    return event;
  }

  updateEvent(eventId, { minute, type, teamId, description }) {
    if (this.isClosed()) {
      throw new DomainError("Cannot change an event in a closed match.");
    }

    const event = this.findEvent(eventId);

    if (teamId !== undefined && teamId !== this.homeTeamId && teamId !== this.awayTeamId) {
      throw new DomainError(`Team ${teamId} is not part of this match.`);
    }

    if (minute !== undefined) {
      event.minute = readNonNegativeInteger(minute, "minute");
    }

    if (type !== undefined) {
      event.type = readRequiredText(type, "type");
    }

    if (teamId !== undefined) {
      event.teamId = teamId;
    }

    if (description !== undefined) {
      event.description = readRequiredText(description, "description");
    }

    return event;
  }

  removeEvent(eventId) {
    if (this.isClosed()) {
      throw new DomainError("Cannot remove an event from a closed match.");
    }

    const index = this.events.findIndex((item) => item.id === eventId);

    if (index === -1) {
      throw new DomainError(`Event ${eventId} not found in match ${this.id}.`);
    }

    return this.events.splice(index, 1)[0];
  }

  close(homeGoals, awayGoals) {
    if (this.isClosed()) {
      throw new DomainError(`The match ${this.id} is already closed.`);
    }

    this.score = new Score(homeGoals, awayGoals);
  }

  updateResult(homeGoals, awayGoals) {
    this.score = new Score(homeGoals, awayGoals);
  }

  removeResult() {
    if (!this.isClosed()) {
      throw new DomainError(`The match ${this.id} does not have a result.`);
    }

    this.score = null;
  }

  isClosed() {
    return this.score !== null;
  }

  involvesTeam(teamId) {
    return this.homeTeamId === teamId || this.awayTeamId === teamId;
  }
}

function readRequiredText(value, fieldName) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new DomainError(`${fieldName} is required.`);
  }

  return normalizedValue;
}

function readNonNegativeInteger(value, fieldName) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new DomainError(`${fieldName} must be an integer greater than or equal to zero.`);
  }

  return numericValue;
}
