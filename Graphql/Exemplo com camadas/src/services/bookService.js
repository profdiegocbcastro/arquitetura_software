/**
 * Serviço de Livro.
 */
export class BookService {
  constructor(bookRepository, authorRepository) {
    this.bookRepo = bookRepository;
    this.authorRepo = authorRepository;
  }

  async listBooks() {
    return this.bookRepo.findAll();
  }

  async listBooksByAuthor(authorId) {
    const id = Number(authorId);
    if (!id) throw new Error("ID de autor inválido");

    return this.bookRepo.findByAuthorId(id);
  }

  async addBook(input) {
    const title = (input?.title ?? "").trim();
    if (!title) throw new Error("Título é obrigatório");

    const authorId = Number(input?.authorId);
    if (!authorId) throw new Error("Autor (authorId) é obrigatório");

    const author = await this.authorRepo.findById(authorId);
    if (!author) throw new Error("Autor não encontrado");

    const available = input?.available ?? true;

    return this.bookRepo.create({ title, authorId, available });
  }
}