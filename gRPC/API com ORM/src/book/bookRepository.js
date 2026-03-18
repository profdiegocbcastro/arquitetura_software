/**
 * =========================================================
 * Repositório de Livro com Prisma
 * =========================================================
 */
export class BookRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Lista todos os livros com seus autores.
   */
  async findAll() {
    const records = await this.prisma.book.findMany({
      include: { author: true },
      orderBy: { id: "asc" },
    });

    return records.map((record) => this.mapBook(record));
  }

  /**
   * Busca um livro pelo ID.
   */
  async findById(bookId) {
    const record = await this.prisma.book.findUnique({
      where: { id: bookId },
      include: { author: true },
    });

    return record ? this.mapBook(record) : null;
  }

  /**
   * Lista livros de um autor específico.
   */
  async findByAuthorId(authorId) {
    const records = await this.prisma.book.findMany({
      where: { authorId },
      include: { author: true },
      orderBy: { id: "asc" },
    });

    return records.map((record) => this.mapBook(record));
  }

  /**
   * Cria um novo livro e devolve o autor junto na resposta.
   */
  async create({ title, available, authorId }) {
    const record = await this.prisma.book.create({
      data: { title, available, authorId },
      include: { author: true },
    });

    return this.mapBook(record);
  }

  /**
   * Converte o retorno do Prisma para o contrato gRPC.
   */
  mapBook(record) {
    return {
      bookId: record.id,
      title: record.title,
      available: record.available,
      author: {
        authorId: record.author.id,
        name: record.author.name,
      },
    };
  }
}
