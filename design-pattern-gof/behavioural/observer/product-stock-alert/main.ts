import { CustomerNotifier } from "./observers/customer-notifier";
import { WarehouseDashboard } from "./observers/warehouse-dashboard";
import { ProductStock } from "./subjects/product-stock";

const productStock = new ProductStock("Console X", 0);

productStock.subscribe(new CustomerNotifier());
productStock.subscribe(new WarehouseDashboard());

productStock.setQuantity(20);
