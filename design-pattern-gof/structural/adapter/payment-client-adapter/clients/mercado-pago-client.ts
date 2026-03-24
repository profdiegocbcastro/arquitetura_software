import { MercadoPagoPreference } from "../types/mercado-pago-preference";

export class MercadoPagoClient {
  createPreference(preference: MercadoPagoPreference): {
    id: string;
    payment_status: string;
  } {
    console.log("[Mercado Pago Client] Enviando preferência:", preference);

    return {
      id: `mp-${preference.external_reference}`,
      payment_status: "approved",
    };
  }
}
