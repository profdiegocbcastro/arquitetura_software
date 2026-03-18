import { NotFoundError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Serviço de Autor
 * =========================================================
 */
export class AuthorService {
  constructor(authorRepository) {
    this.authorRepository = authorRepository;
  }

  /**
   * Lista todos os autores cadastrados.
   *
   * O acesso aos dados fica encapsulado no repository,
   * e o service devolve a estrutura esperada pela aplicação.
   */
  async listAuthors() {
    return {
      authors: await this.authorRepository.findAll(),
    };
  }

  /**
   * Busca um autor específico.
   *
   * Se o autor não existir, a camada de serviço
   * devolve um erro de domínio.
   */
  async getAuthor(authorId) {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new NotFoundError("Autor não encontrado.");
    }

    return author;
  }

  /**
   * Cria um novo autor.
   *
   * A entrada já foi validada pela controller,
   * então aqui a responsabilidade é apenas coordenar
   * a criação com o repository.
   */
  async addAuthor({ name }) {
    return this.authorRepository.create({ name });
  }
}
