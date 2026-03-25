import { DocumentVisitor } from "../visitors/document-visitor";

export interface DocumentElement {
  accept(visitor: DocumentVisitor): void;
}
