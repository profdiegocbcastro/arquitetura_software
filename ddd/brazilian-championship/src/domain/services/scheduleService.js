import { Match } from "../entities/match.js";
import { Round } from "../entities/round.js";

/**
 * =========================================================
 * Domain Service: Schedule
 * =========================================================
 *
 * Creates a single round-robin schedule.
 */
export class ScheduleService {
  createSingleRoundRobin(teams) {
    const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));
    const totalRounds = sortedTeams.length - 1;
    const half = sortedTeams.length / 2;
    const ids = sortedTeams.map((team) => team.id);
    const rounds = [];

    for (let roundNumber = 1; roundNumber <= totalRounds; roundNumber += 1) {
      const round = new Round(roundNumber);

      for (let index = 0; index < half; index += 1) {
        const homeTeamId = ids[index];
        const awayTeamId = ids[ids.length - 1 - index];
        const invertHomeAway = roundNumber % 2 === 0;

        round.addMatch(
          new Match({
            id: `round-${roundNumber}-match-${index + 1}`,
            roundNumber: roundNumber,
            homeTeamId: invertHomeAway ? awayTeamId : homeTeamId,
            awayTeamId: invertHomeAway ? homeTeamId : awayTeamId,
          })
        );
      }

      rounds.push(round);
      ids.splice(1, 0, ids.pop());
    }

    return rounds;
  }
}
