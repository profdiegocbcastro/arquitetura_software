import { Order } from "./contexts/order";

const order = new Order();

order.pay();
order.ship();
order.cancel();
