import { DomainError } from "../../../domain/errors/domainError.js";

export function getChampionshipOrThrow(championshipRepository, championshipId) {
  const championship = championshipRepository.findById(championshipId);

  if (!championship) {
    throw new DomainError(`Championship ${championshipId} not found.`);
  }

  return championship;
}
