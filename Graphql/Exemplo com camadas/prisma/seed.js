/**
 * Seed do banco (dados iniciais)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpa (opcional, mas deixa o seed idempotente em ambientes de teste)
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const robert = await prisma.author.create({ data: { name: "Robert C. Martin" } });
  const eric = await prisma.author.create({ data: { name: "Eric Evans" } });
  const fowler = await prisma.author.create({ data: { name: "Martin Fowler" } });

  await prisma.book.createMany({
    data: [
      { title: "Clean Architecture", authorId: robert.id, available: true },
      { title: "Domain-Driven Design", authorId: eric.id, available: true },
      { title: "Refactoring", authorId: fowler.id, available: false }
    ]
  });

  console.log("✅ Seed concluído.");
}

main()
  .catch((e) => {
    console.error("❌ Seed falhou:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });