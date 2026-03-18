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
   * O repository já devolve os livros com seus autores,
   * então a camada de serviço apenas organiza a resposta.
   */
  async listBooks() {
    return {
      books: await this.bookRepository.findAll(),
    };
  }

  /**
   * Busca um livro específico.
   *
   * Se o livro não for encontrado, devolvemos
   * um erro de domínio apropriado.
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
   * Antes de consultar os livros, o service confirma
   * que o autor existe.
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
   * Cria um novo livro.
   *
   * A regra central desta operação é:
   * só criar o livro se o autor informado existir.
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
