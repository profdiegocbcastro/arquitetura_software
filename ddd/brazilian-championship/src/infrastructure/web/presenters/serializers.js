export function serializeChampionship(championship, { full = false } = {}) {
  const data = {
    id: championship.id,
    name: championship.name,
    season: championship.season,
    series: championship.series,
    relegatedCount: championship.relegatedCount,
    totalTeams: championship.teams.size,
    totalRounds: championship.rounds.size,
    totalMatches: championship.listMatches().length,
  };

  if (!full) {
    return data;
  }

  return {
    ...data,
    teams: championship.listTeams().map(serializeTeam),
    rounds: championship.listRounds().map(serializeRound),
    standings: championship.standings().map(serializeStandingRow),
    relegationZone: championship.relegationZone().map(serializeStandingRow),
    nextSeasonSerieB: championship.nextSeasonSerieB(),
  };
}

export function serializeTeam(team) {
  return {
    id: team.id,
    name: team.name,
    city: team.city,
    series: team.series,
    players: team.players.map(serializePlayer),
  };
}

export function serializePlayer(player) {
  return {
    id: player.id,
    name: player.name,
    position: player.position,
    number: player.number,
  };
}

export function serializeRound(round) {
  return {
    number: round.number,
    matches: round.matches.map(serializeMatch),
  };
}

export function serializeMatch(match) {
  return {
    id: match.id,
    roundNumber: match.roundNumber,
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
    score: serializeScore(match.score),
    events: match.events.map(serializeEvent),
    isClosed: match.isClosed(),
  };
}

export function serializeScore(score) {
  if (!score) {
    return null;
  }

  return {
    homeGoals: score.homeGoals,
    awayGoals: score.awayGoals,
    description: score.toString(),
  };
}

export function serializeEvent(event) {
  return {
    id: event.id,
    minute: event.minute,
    type: event.type,
    teamId: event.teamId,
    description: event.description,
  };
}

export function serializeStandingRow(row) {
  return row.toTableRow();
}
