import { ContractDocument } from "./elements/contract-document";
import { DocumentElement } from "./elements/document-element";
import { InvoiceDocument } from "./elements/invoice-document";
import { ComplianceAuditVisitor } from "./visitors/compliance-audit-visitor";

const documents: DocumentElement[] = [
  new InvoiceDocument("INV-100", 3200),
  new ContractDocument("CTR-900", true),
];

const auditVisitor = new ComplianceAuditVisitor();

documents.forEach((document) => document.accept(auditVisitor));
