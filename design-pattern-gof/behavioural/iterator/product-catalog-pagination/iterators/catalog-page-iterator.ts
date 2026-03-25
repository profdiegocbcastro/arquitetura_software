import { Product } from "../types/product";
import { PageIterator } from "./page-iterator";

export class CatalogPageIterator implements PageIterator<Product[]> {
  private currentIndex = 0;

  constructor(
    private readonly products: Product[],
    private readonly pageSize: number,
  ) {}

  hasNext(): boolean {
    return this.currentIndex < this.products.length;
  }

  next(): Product[] {
    const nextPage = this.products.slice(
      this.currentIndex,
      this.currentIndex + this.pageSize,
    );

    this.currentIndex += this.pageSize;

    return nextPage;
  }
}
