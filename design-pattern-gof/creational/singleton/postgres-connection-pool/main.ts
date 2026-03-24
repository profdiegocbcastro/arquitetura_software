import { PostgresPool } from "./db/postgres-pool";
import { BookRepository } from "./repositories/book-repository";
import { LoanRepository } from "./repositories/loan-repository";

const bookRepository = new BookRepository();
const loanRepository = new LoanRepository();

bookRepository.findAll();
loanRepository.findOpenLoans();

const firstPool = PostgresPool.getInstance().getPool();
const secondPool = PostgresPool.getInstance().getPool();

console.log("Mesma instância de pool:", firstPool === secondPool);
