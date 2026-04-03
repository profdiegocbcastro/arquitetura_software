/**
 * Serviço de Autor.
 */
export class AuthorService {
  constructor(authorRepository) {
    this.repo = authorRepository;
  }

  async listAuthors() {
    return this.repo.findAll();
  }

  async getAuthorById(id) {
    const authorId = Number(id);
    if (!authorId) throw new Error("ID de autor inválido");

    return this.repo.findById(authorId);
  }

  async addAuthor(input) {
    const name = (input?.name ?? "").trim();
    if (!name) throw new Error("Nome do autor é obrigatório");

    return this.repo.create({ name });
  }
}