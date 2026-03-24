import { ProductData } from "./abstractions/product-data";
import { UserData } from "./abstractions/user-data";
import { MemoryStorageProvider } from "./implementors/memory-storage-provider";
import { PostgresStorageProvider } from "./implementors/postgres-storage-provider";
import { RedisStorageProvider } from "./implementors/redis-storage-provider";
import { StorageService } from "./services/storage-service";

const storageService = new StorageService();

storageService.persist(
  new UserData(new MemoryStorageProvider(), {
    id: "USR-10",
    name: "Luciana Alves",
  }),
);

storageService.persist(
  new ProductData(new RedisStorageProvider(), {
    sku: "SKU-900",
    name: "Mouse Sem Fio",
  }),
);

storageService.persist(
  new UserData(new PostgresStorageProvider(), {
    id: "USR-11",
    name: "Marcelo Nunes",
  }),
);
