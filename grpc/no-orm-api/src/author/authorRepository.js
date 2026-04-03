/**
 * =========================================================
 * Repositório de Autor
 * =========================================================
 */
export class AuthorRepository {
  constructor(db) {
    this.db = db;
  }

  /**
   * Lista todos os autores ordenados pelo ID.
   */
  async findAll() {
    const result = await this.db.query(
      `
        SELECT id, name
        FROM authors
        ORDER BY id ASC
      `
    );

    return result.rows.map((row) => this.mapAuthor(row));
  }

  /**
 * Busca um autor específico pelo ID.
   */
  async findById(authorId) {
    const result = await this.db.query(
      `
        SELECT id, name
        FROM authors
        WHERE id = $1
      `,
      [authorId]
    );

    return result.rows[0] ? this.mapAuthor(result.rows[0]) : null;
  }

  /**
   * Insere um novo autor e devolve o registro criado.
   */
  async create({ name }) {
    const result = await this.db.query(
      `
        INSERT INTO authors (name)
        VALUES ($1)
        RETURNING id, name
      `,
      [name]
    );

    return this.mapAuthor(result.rows[0]);
  }

  /**
   * Converte o formato do banco para o formato do contrato gRPC.
   */
  mapAuthor(row) {
    return {
      authorId: row.id,
      name: row.name,
    };
  }
}
