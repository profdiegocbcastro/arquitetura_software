/**
 * =========================================================
 * Configuracao de conexao com o PostgreSQL
 * =========================================================
 *
 * Este arquivo cria o Pool do driver "pg".
 *
 * Em vez de abrir uma conexao nova a cada consulta,
 * reutilizamos conexoes do pool.
 *
 * Os repositories usam esse pool para executar SQL manual.
 */

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5433),
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_NAME ?? "grpc_library",
});
