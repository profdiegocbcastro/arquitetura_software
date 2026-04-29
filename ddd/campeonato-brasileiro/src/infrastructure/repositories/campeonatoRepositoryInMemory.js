/**
 * =========================================================
 * Repositório em memória
 * =========================================================
 *
 * Infraestrutura simples para manter o exemplo focado no domínio.
 */
export class CampeonatoRepositoryInMemory {
  constructor() {
    this.items = new Map();
  }

  save(campeonato) {
    this.items.set(campeonato.id, campeonato);
    return campeonato;
  }

  findById(id) {
    return this.items.get(id) ?? null;
  }
}
