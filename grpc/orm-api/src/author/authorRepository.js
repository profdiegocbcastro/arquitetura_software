/**
 * =========================================================
 * Repositório de Autor com Prisma
 * =========================================================
 */
export class AuthorRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Lista todos os autores.
   */
  async findAll() {
    const records = await this.prisma.author.findMany({
      orderBy: { id: "asc" },
    });

    return records.map((record) => this.mapAuthor(record));
  }

  /**
   * Busca um autor pelo ID.
   */
  async findById(authorId) {
    const record = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    return record ? this.mapAuthor(record) : null;
  }

  /**
   * Cria um novo autor.
   */
  async create({ name }) {
    const record = await this.prisma.author.create({
      data: { name },
    });

    return this.mapAuthor(record);
  }

  /**
   * Converte o retorno do Prisma para o contrato gRPC.
   */
  mapAuthor(record) {
    return {
      authorId: record.id,
      name: record.name,
    };
  }
}
