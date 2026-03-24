import { StorableData } from "./storable-data";
import { ProductRecord } from "../types/product-record";

export class ProductData extends StorableData {
  constructor(
    storageProvider: StorableData["storageProvider"],
    private readonly product: ProductRecord,
  ) {
    super(storageProvider);
  }

  store(): void {
    this.storageProvider.save("products", this.product.sku, this.product);
  }
}
