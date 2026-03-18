import { NotFoundError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Serviço de Livro
 * =========================================================
 */
export class BookService {
  constructor(bookRepository, authorRepository) {
    this.bookRepository = bookRepository;
    this.authorRepository = authorRepository;
  }

  /**
   * Lista todos os livros cadastrados.
   *
   * O repository já devolve o livro com os dados do autor,
   * então o service apenas organiza a resposta da aplicação.
   */
  async listBooks() {
    return {
      books: await this.bookRepository.findAll(),
    };
  }

  /**
   * Busca um livro específico.
   *
   * Se o livro não existir, devolvemos um erro de domínio
   * para que a camada acima decida como traduzir isso
   * para o protocolo utilizado.
   */
  async getBook(bookId) {
    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new NotFoundError("Livro não encontrado.");
    }

    return book;
  }

  /**
   * Lista os livros de um autor específico.
   *
   * Antes de consultar os livros, confirmamos que o autor existe.
   * Isso evita devolver uma lista vazia em um caso que, do ponto
   * de vista de negócio, representa um autor inexistente.
   */
  async listBooksByAuthor(authorId) {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new NotFoundError("Autor não encontrado.");
    }

    return {
      books: await this.bookRepository.findByAuthorId(authorId),
    };
  }

  /**
   * Cria um livro novo garantindo a existência do autor.
   *
   * O service não conhece detalhes do protocolo externo.
   * Ele apenas garante a regra de negócio:
   * não é possível criar um livro para um autor inexistente.
   */
  async addBook({ title, authorId, available }) {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new NotFoundError("Não é possível criar livro para um autor inexistente.");
    }

    return this.bookRepository.create({
      title,
      authorId,
      available,
    });
  }
}
