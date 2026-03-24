import { QueryResult } from "../types/query-result";

export interface DatabaseClient {
  query(statement: string): QueryResult;
}
