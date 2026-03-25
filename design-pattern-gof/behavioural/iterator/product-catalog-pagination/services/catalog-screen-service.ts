import { ProductCatalog } from "../aggregates/product-catalog";

export class CatalogScreenService {
  render(catalog: ProductCatalog): void {
    const iterator = catalog.createIterator();
    let pageNumber = 1;

    while (iterator.hasNext()) {
      const page = iterator.next();
      console.log(`[CatalogScreenService] Pagina ${pageNumber}`);

      page.forEach((product) => {
        console.log(`- ${product.id}: ${product.name}`);
      });

      pageNumber += 1;
    }
  }
}
