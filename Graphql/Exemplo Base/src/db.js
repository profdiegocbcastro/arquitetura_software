/**
 * =========================================================
 * Configuração de conexão com o banco PostgreSQL
 * =========================================================
 *
 * Este arquivo é responsável por criar a conexão com o banco
 * de dados que será utilizada pela aplicação.
 *
 * Utilizamos a biblioteca "pg", que é o driver oficial do
 * PostgreSQL para Node.js.
 *
 * Em vez de abrir uma conexão nova a cada consulta, utilizamos
 * um "connection pool".
 *
 * Um pool mantém várias conexões abertas e reutilizáveis,
 * o que melhora muito a performance da aplicação.
 */

import pkg from "pg"

const { Pool } = pkg


/**
 * =========================================================
 * Criação do Pool de Conexões
 * =========================================================
 *
 * As informações de conexão são obtidas através de variáveis
 * de ambiente. No caso do exemplo atual, elas são aplicadas pelo Docker.
 */

const pool = new Pool({

  // Endereço do servidor de banco de dados
  host: process.env.DB_HOST ?? "localhost",

  // Porta padrão do PostgreSQL
  port: Number(process.env.DB_PORT ?? 5432),

  // Usuário do banco
  user: process.env.DB_USER ?? "postgres",

  // Senha do banco
  password: process.env.DB_PASSWORD ?? "postgres",

  // Nome do banco de dados
  database: process.env.DB_NAME ?? "biblioteca"
})


/**
 * =========================================================
 * Exportação do pool
 * =========================================================
 *
 * O pool será utilizado em outras partes da aplicação
 * para executar consultas SQL.
 *
 * Exemplo de uso:
 *
 * const result = await db.query("SELECT * FROM books")
 *
 * result.rows -> contém os dados retornados pelo banco.
 */

export default pool