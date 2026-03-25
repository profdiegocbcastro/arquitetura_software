export class TextDocument {
  private content = "";

  append(text: string): void {
    this.content += text;
    console.log(`[TextDocument] Conteudo atual: "${this.content}"`);
  }

  removeLast(quantity: number): void {
    const safeQuantity = Math.max(0, quantity);
    this.content = this.content.slice(0, this.content.length - safeQuantity);
    console.log(`[TextDocument] Conteudo atual: "${this.content}"`);
  }

  readLast(quantity: number): string {
    const safeQuantity = Math.max(0, quantity);
    return this.content.slice(-safeQuantity);
  }
}
