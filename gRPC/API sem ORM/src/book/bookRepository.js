/**
 * =========================================================
 * Repositório de Livro
 * =========================================================
 */

export class BookRepository {
  constructor(db) {
    this.db = db;
  }

  /**
   * Lista todos os livros com os dados do autor.
   */
  async findAll() {
    const result = await this.db.query(this.buildSelectQuery());
    return result.rows.map((row) => this.mapBook(row));
  }

  /**
   * Busca um livro específico pelo ID.
   */
  async findById(bookId) {
    const result = await this.db.query(
      `${this.buildSelectQuery()} WHERE b.id = $1`,
      [bookId]
    );

    return result.rows[0] ? this.mapBook(result.rows[0]) : null;
  }

  /**
   * Lista os livros de um autor específico.
   */
  async findByAuthorId(authorId) {
    const result = await this.db.query(
      `${this.buildSelectQuery()} WHERE a.id = $1 ORDER BY b.id ASC`,
      [authorId]
    );

    return result.rows.map((row) => this.mapBook(row));
  }

  /**
   * Insere um novo livro.
   *
   * Depois do INSERT, fazemos um SELECT com JOIN para
   * devolver a resposta completa no formato esperado.
   */
  async create({ title, available, authorId }) {
    const result = await this.db.query(
      `
        WITH inserted_book AS (
          INSERT INTO books (title, available, author_id)
          VALUES ($1, $2, $3)
          RETURNING id, title, available, author_id
        )
        SELECT
          b.id,
          b.title,
          b.available,
          a.id AS author_id,
          a.name AS author_name
        FROM inserted_book b
        INNER JOIN authors a ON a.id = b.author_id
      `,
      [title, available, authorId]
    );

    return this.mapBook(result.rows[0]);
  }

  /**
   * Monta a consulta base usada pelos metodos de leitura.
   */
  buildSelectQuery() {
    return `
      SELECT
        b.id,
        b.title,
        b.available,
        a.id AS author_id,
        a.name AS author_name
      FROM books b
      INNER JOIN authors a ON a.id = b.author_id
    `;
  }

  /**
   * Converte o resultado SQL para o formato do contrato gRPC.
   */
  mapBook(row) {
    return {
      bookId: row.id,
      title: row.title,
      available: row.available,
      author: {
        authorId: row.author_id,
        name: row.author_name,
      },
    };
  }
}
