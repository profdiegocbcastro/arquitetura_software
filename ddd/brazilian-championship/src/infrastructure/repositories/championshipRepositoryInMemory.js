/**
 * =========================================================
 * In-memory repository
 * =========================================================
 *
 * Simple infrastructure to keep the example focused on the domain.
 */
export class ChampionshipRepositoryInMemory {
  constructor() {
    this.items = new Map();
  }

  save(championship) {
    this.items.set(championship.id, championship);
    return championship;
  }

  findAll() {
    return Array.from(this.items.values());
  }

  findById(id) {
    return this.items.get(id) ?? null;
  }

  delete(id) {
    return this.items.delete(id);
  }
}
