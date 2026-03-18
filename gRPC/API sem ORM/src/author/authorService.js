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
   * Neste caso a regra de negócio é simples:
   * apenas delegamos a consulta ao repository
   * e devolvemos o formato esperado pela aplicação.
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
   * devolve um erro de domínio apropriado.
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
   * A validação do nome já foi feita antes,
   * então aqui a responsabilidade do service
   * é apenas coordenar a criação com o repository.
   */
  async addAuthor({ name }) {
    return this.authorRepository.create({ name });
  }
}
