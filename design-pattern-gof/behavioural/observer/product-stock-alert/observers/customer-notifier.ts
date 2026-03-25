import { ProductStock } from "../subjects/product-stock";
import { Observer } from "./observer";

export class CustomerNotifier implements Observer {
  update(subject: ProductStock): void {
    console.log(
      `[CustomerNotifier] Avisando clientes: ${subject.getName()} agora tem ${subject.getQuantity()} unidades.`,
    );
  }
}
