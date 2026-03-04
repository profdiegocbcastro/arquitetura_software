/**
 * Prisma Client (ORM)
 *
 * Esse arquivo centraliza a criação do PrismaClient,
 * funcionando como a "conexão" com o banco,
 * só que agora via ORM (não via SQL manual).
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();