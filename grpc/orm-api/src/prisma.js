/**
 * =========================================================
 * Prisma Client
 * =========================================================
 *
 * Este arquivo centraliza a criacao do PrismaClient.
 *
 * Ele funciona como a porta de entrada para o ORM.
 */

import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@localhost:5434/grpc_library_prisma?schema=public";

export const prisma = new PrismaClient();
