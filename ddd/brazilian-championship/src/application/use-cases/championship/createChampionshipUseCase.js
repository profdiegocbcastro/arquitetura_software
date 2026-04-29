import { Championship } from "../../../domain/entities/championship.js";
import { DomainError } from "../../../domain/errors/domainError.js";

export class CreateChampionshipUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute(input) {
    const championship = new Championship(input);

    if (this.championshipRepository.findById(championship.id)) {
      throw new DomainError(`Championship ${championship.id} already exists.`);
    }

    return this.championshipRepository.save(championship);
  }
}
