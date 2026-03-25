import { DocumentVisitor } from "../visitors/document-visitor";
import { DocumentElement } from "./document-element";

export class InvoiceDocument implements DocumentElement {
  constructor(
    private readonly number: string,
    private readonly amount: number,
  ) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitInvoice(this);
  }

  getNumber(): string {
    return this.number;
  }

  getAmount(): number {
    return this.amount;
  }
}
