import { ProductStock } from "../subjects/product-stock";

export interface Observer {
  update(subject: ProductStock): void;
}
