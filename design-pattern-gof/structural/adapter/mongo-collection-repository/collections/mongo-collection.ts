export class MongoCollection<TDocument extends { _id: string }> {
  private readonly documents = new Map<string, TDocument>();

  insertOne(document: TDocument): void {
    this.documents.set(document._id, document);
    console.log("[Mongo Collection] insertOne:", document);
  }

  findOne(id: string): TDocument | null {
    const document = this.documents.get(id) ?? null;
    console.log("[Mongo Collection] findOne:", id, document);
    return document;
  }
}
