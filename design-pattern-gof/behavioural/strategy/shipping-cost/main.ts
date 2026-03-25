import { Checkout } from "./contexts/checkout";
import { ExpressShippingStrategy } from "./strategies/express-shipping-strategy";
import { PickupShippingStrategy } from "./strategies/pickup-shipping-strategy";
import { StandardShippingStrategy } from "./strategies/standard-shipping-strategy";

const checkout = new Checkout(new StandardShippingStrategy());

checkout.printShippingCost(300);
checkout.setStrategy(new ExpressShippingStrategy());
checkout.printShippingCost(300);
checkout.setStrategy(new PickupShippingStrategy());
checkout.printShippingCost(300);
