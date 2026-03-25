import { ContractDocument } from "../elements/contract-document";
import { InvoiceDocument } from "../elements/invoice-document";

export interface DocumentVisitor {
  visitInvoice(invoice: InvoiceDocument): void;
  visitContract(contract: ContractDocument): void;
}
