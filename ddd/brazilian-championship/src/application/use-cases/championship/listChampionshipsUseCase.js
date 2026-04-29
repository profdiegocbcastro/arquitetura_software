export class ListChampionshipsUseCase {
  constructor(championshipRepository) {
    this.championshipRepository = championshipRepository;
  }

  execute() {
    return this.championshipRepository.findAll();
  }
}
