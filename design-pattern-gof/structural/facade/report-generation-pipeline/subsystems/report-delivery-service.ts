export class ReportDeliveryService {
  deliver(fileName: string, recipientEmail: string): void {
    console.log(`[Delivery] Arquivo ${fileName} enviado para ${recipientEmail}.`);
  }
}
