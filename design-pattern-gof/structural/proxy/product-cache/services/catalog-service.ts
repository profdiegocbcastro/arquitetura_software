import { ProductRepository } from "../targets/product-repository";

export class CatalogService {
  constructor(private readonly productRepository: ProductRepository) {}

  showProduct(id: string): void {
    const product = this.productRepository.findById(id);
    console.log("Produto retornado:", product);
  }
}
