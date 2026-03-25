import { CatalogPageIterator } from "../iterators/catalog-page-iterator";
import { PageIterator } from "../iterators/page-iterator";
import { Product } from "../types/product";

export class ProductCatalog {
  constructor(
    private readonly products: Product[],
    private readonly pageSize: number,
  ) {}

  createIterator(): PageIterator<Product[]> {
    return new CatalogPageIterator(this.products, this.pageSize);
  }
}
