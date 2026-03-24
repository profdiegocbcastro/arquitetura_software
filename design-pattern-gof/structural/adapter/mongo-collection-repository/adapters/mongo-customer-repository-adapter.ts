import { MongoCollection } from "../collections/mongo-collection";
import { CustomerRepository } from "../targets/customer-repository";
import { Customer } from "../types/customer";
import { MongoCustomerDocument } from "../types/mongo-customer-document";

export class MongoCustomerRepositoryAdapter implements CustomerRepository {
  constructor(
    private readonly collection: MongoCollection<MongoCustomerDocument>,
  ) {}

  save(customer: Customer): void {
    this.collection.insertOne({
      _id: customer.id,
      full_name: customer.name,
      email_address: customer.email,
    });
  }

  findById(id: string): Customer | null {
    const document = this.collection.findOne(id);

    if (!document) {
      return null;
    }

    return {
      id: document._id,
      name: document.full_name,
      email: document.email_address,
    };
  }
}
