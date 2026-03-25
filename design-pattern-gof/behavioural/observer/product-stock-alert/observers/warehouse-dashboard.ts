import { ProductStock } from "../subjects/product-stock";
import { Observer } from "./observer";

export class WarehouseDashboard implements Observer {
  update(subject: ProductStock): void {
    console.log(
      `[WarehouseDashboard] Dashboard atualizado para ${subject.getName()}: ${subject.getQuantity()} unidades.`,
    );
  }
}
