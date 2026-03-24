import { CachedProductRepositoryProxy } from "./proxies/cached-product-repository-proxy";
import { CatalogService } from "./services/catalog-service";
import { DatabaseProductRepository } from "./subjects/database-product-repository";

const catalogService = new CatalogService(
  new CachedProductRepositoryProxy(new DatabaseProductRepository()),
);

catalogService.showProduct("P-10");
catalogService.showProduct("P-10");
catalogService.showProduct("P-20");
