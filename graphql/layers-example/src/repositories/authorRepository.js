/**
 * Repositório responsável pelo acesso aos dados de Autor no banco via Prisma.
 * A instância do Prisma é recebida por injeção de dependência para evitar acoplamento.
 */
export class AuthorRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.author.findMany({
      orderBy: { id: "asc" }
    });
  }

  async findById(id) {
    return this.prisma.author.findUnique({
      where: { id }
    });
  }

  async create({ name }) {
    return this.prisma.author.create({
      data: { name }
    });
  }
}