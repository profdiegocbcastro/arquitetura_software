import { MongoCustomerRepositoryAdapter } from "./adapters/mongo-customer-repository-adapter";
import { MongoCollection } from "./collections/mongo-collection";
import { CustomerService } from "./services/customer-service";
import { MongoCustomerDocument } from "./types/mongo-customer-document";

const customerService = new CustomerService(
  new MongoCustomerRepositoryAdapter(
    new MongoCollection<MongoCustomerDocument>(),
  ),
);

customerService.register({
  id: "CUS-1",
  name: "Felipe Costa",
  email: "felipe@empresa.com",
});

customerService.showCustomer("CUS-1");
