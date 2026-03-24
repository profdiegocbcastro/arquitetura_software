import { Customer } from "../types/customer";

export interface CustomerRepository {
  save(customer: Customer): void;
  findById(id: string): Customer | null;
}
