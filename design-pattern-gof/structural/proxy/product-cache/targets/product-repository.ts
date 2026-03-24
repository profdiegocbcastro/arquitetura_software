import { Product } from "../types/product";

export interface ProductRepository {
  findById(id: string): Product | null;
}
