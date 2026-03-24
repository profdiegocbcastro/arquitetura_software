import { BaseProductPrice } from "./components/base-product-price";
import { DiscountPriceDecorator } from "./decorators/discount-price-decorator";
import { FeePriceDecorator } from "./decorators/fee-price-decorator";
import { ShippingPriceDecorator } from "./decorators/shipping-price-decorator";
import { PricingService } from "./services/pricing-service";
import { Product } from "./types/product";

const product: Product = {
  name: "Notebook Pro 14",
  basePrice: 6200,
};

const calculator = new ShippingPriceDecorator(
  new FeePriceDecorator(
    new DiscountPriceDecorator(new BaseProductPrice(product), 0.1),
    120,
  ),
  45,
);

const pricingService = new PricingService(calculator);

console.log(`Preço base de ${product.name}: R$ ${product.basePrice.toFixed(2)}`);
pricingService.printFinalPrice(product);
