import { ProductRepository } from "../targets/product-repository";
import { Product } from "../types/product";

export class DatabaseProductRepository implements ProductRepository {
  private readonly products = new Map<string, Product>([
    ["P-10", { id: "P-10", name: "Teclado Mecânico", price: 399.9 }],
    ["P-20", { id: "P-20", name: "Monitor 27 Polegadas", price: 1499.9 }],
  ]);

  findById(id: string): Product | null {
    console.log(`[RealSubject] Consultando produto ${id} no banco de dados.`);
    return this.products.get(id) ?? null;
  }
}
