import { ProductCatalog } from "./aggregates/product-catalog";
import { CatalogScreenService } from "./services/catalog-screen-service";
import { Product } from "./types/product";

const products: Product[] = [
  { id: "P-10", name: "Mouse Gamer" },
  { id: "P-20", name: "Monitor 27" },
  { id: "P-30", name: "Notebook Pro" },
  { id: "P-40", name: "Headset USB" },
  { id: "P-50", name: "Teclado Mecanico" },
];

const catalog = new ProductCatalog(products, 2);
const screenService = new CatalogScreenService();

screenService.render(catalog);
