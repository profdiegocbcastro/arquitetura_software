import { ContractDocument } from "../elements/contract-document";
import { InvoiceDocument } from "../elements/invoice-document";
import { DocumentVisitor } from "./document-visitor";

export class ComplianceAuditVisitor implements DocumentVisitor {
  visitInvoice(invoice: InvoiceDocument): void {
    console.log(
      `[ComplianceAuditVisitor] Nota ${invoice.getNumber()} auditada com valor de R$ ${invoice.getAmount().toFixed(2)}.`,
    );
  }

  visitContract(contract: ContractDocument): void {
    console.log(
      `[ComplianceAuditVisitor] Contrato ${contract.getId()} ${
        contract.isSigned() ? "assinado" : "pendente de assinatura"
      }.`,
    );
  }
}
