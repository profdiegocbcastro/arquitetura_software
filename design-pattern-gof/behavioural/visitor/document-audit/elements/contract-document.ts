import { DocumentVisitor } from "../visitors/document-visitor";
import { DocumentElement } from "./document-element";

export class ContractDocument implements DocumentElement {
  constructor(
    private readonly id: string,
    private readonly signed: boolean,
  ) {}

  accept(visitor: DocumentVisitor): void {
    visitor.visitContract(this);
  }

  getId(): string {
    return this.id;
  }

  isSigned(): boolean {
    return this.signed;
  }
}
