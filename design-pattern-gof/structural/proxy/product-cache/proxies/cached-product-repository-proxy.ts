import { ProductRepository } from "../targets/product-repository";
import { Product } from "../types/product";

export class CachedProductRepositoryProxy implements ProductRepository {
  private readonly cache = new Map<string, Product | null>();

  constructor(private readonly repository: ProductRepository) {}

  findById(id: string): Product | null {
    if (this.cache.has(id)) {
      console.log(`[Proxy] Cache hit para o produto ${id}.`);
      return this.cache.get(id) ?? null;
    }

    console.log(`[Proxy] Cache miss para o produto ${id}.`);
    const product = this.repository.findById(id);
    this.cache.set(id, product);

    return product;
  }
}
