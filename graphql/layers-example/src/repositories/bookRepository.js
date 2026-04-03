/**
 * Repositório responsável pelo acesso aos dados de Livro no banco via Prisma.
 * A instância do Prisma é recebida por injeção de dependência para evitar acoplamento.
 *
 * Observação:
 * No banco, book tem authorId como FK.
 * No Prisma, isso vira relação navegável:
 * - book.author
 * - author.books
 */
export class BookRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.book.findMany({
      orderBy: { id: "asc" }
    });
  }

  async findByAuthorId(authorId) {
    return this.prisma.book.findMany({
      where: { authorId },
      orderBy: { id: "asc" }
    });
  }

  async create({ title, authorId, available }) {
    return this.prisma.book.create({
      data: { title, authorId, available }
    });
  }
}