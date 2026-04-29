import { DomainError } from "../errors/domainError.js";

/**
 * =========================================================
 * Entity: Team
 * =========================================================
 */
export class Team {
  constructor({ id, name, city, series }) {
    this.id = readRequiredText(id, "id");
    this.name = readRequiredText(name, "name");
    this.city = readRequiredText(city, "city");
    this.series = readRequiredText(series, "series").toUpperCase();
    this.players = [];
  }

  update({ name, city, series }) {
    if (name !== undefined) {
      this.name = readRequiredText(name, "name");
    }

    if (city !== undefined) {
      this.city = readRequiredText(city, "city");
    }

    if (series !== undefined) {
      this.series = readRequiredText(series, "series").toUpperCase();
    }
  }

  addPlayer(player) {
    const playerExists = this.players.some((item) => item.id === player.id);

    if (playerExists) {
      throw new DomainError(`The player ${player.id} already exists in team ${this.name}.`);
    }

    this.validateAvailableShirtNumber(player.number);

    this.players.push(player);
  }

  findPlayer(playerId) {
    const player = this.players.find((item) => item.id === playerId);

    if (!player) {
      throw new DomainError(`Player ${playerId} not found in team ${this.name}.`);
    }

    return player;
  }

  updatePlayer(playerId, { name, position, number }) {
    const player = this.findPlayer(playerId);

    if (number !== undefined && Number(number) !== player.number) {
      this.validateAvailableShirtNumber(Number(number), playerId);
      player.number = readPositiveInteger(number, "number");
    }

    if (name !== undefined) {
      player.name = readRequiredText(name, "name");
    }

    if (position !== undefined) {
      player.position = readRequiredText(position, "position");
    }

    return player;
  }

  removePlayer(playerId) {
    const index = this.players.findIndex((item) => item.id === playerId);

    if (index === -1) {
      throw new DomainError(`Player ${playerId} not found in team ${this.name}.`);
    }

    return this.players.splice(index, 1)[0];
  }

  validateAvailableShirtNumber(number, ignoredPlayerId = null) {
    const shirtNumber = readPositiveInteger(number, "number");
    const shirtNumberExists = this.players.some(
      (item) => item.number === shirtNumber && item.id !== ignoredPlayerId
    );

    if (shirtNumberExists) {
      throw new DomainError(
        `The team ${this.name} already has a player with shirt number ${shirtNumber}.`
      );
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
