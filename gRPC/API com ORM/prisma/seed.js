/**
 * =========================================================
 * Seed do banco
 * =========================================================
 *
 * Este script insere os mesmos dados iniciais usados
 * nos exemplos GraphQL de authors e books.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const robert = await prisma.author.create({ data: { name: "Robert C. Martin" } });
  const eric = await prisma.author.create({ data: { name: "Eric Evans" } });
  const fowler = await prisma.author.create({ data: { name: "Martin Fowler" } });

  await prisma.book.createMany({
    data: [
      { title: "Clean Architecture", available: true, authorId: robert.id },
      { title: "Domain-Driven Design", available: true, authorId: eric.id },
      { title: "Refactoring", available: false, authorId: fowler.id },
    ],
  });

  console.log("Seed concluido.");
}

main()
  .catch((error) => {
    console.error("Falha ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
