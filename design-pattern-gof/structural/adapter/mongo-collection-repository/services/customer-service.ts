import { CustomerRepository } from "../targets/customer-repository";
import { Customer } from "../types/customer";

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  register(customer: Customer): void {
    this.customerRepository.save(customer);
  }

  showCustomer(id: string): void {
    const customer = this.customerRepository.findById(id);
    console.log("Cliente encontrado:", customer);
  }
}
