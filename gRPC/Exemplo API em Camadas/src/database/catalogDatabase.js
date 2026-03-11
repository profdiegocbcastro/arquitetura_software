const products = [
  { id: "notebook-01", name: "Notebook Pro 14", price: 5200, stock: 4 },
  { id: "mouse-01", name: "Mouse Sem Fio", price: 120, stock: 15 },
  { id: "headset-01", name: "Headset Studio", price: 340, stock: 6 },
  { id: "monitor-01", name: "Monitor 27 4K", price: 2100, stock: 3 },
];

/**
 * Esta classe simula uma base de produtos em memória.
 */
export class CatalogDatabase {
  /**
   * Busca um produto específico pelo ID.
   */
  findProductById(productId) {
    return products.find((product) => product.id === productId);
  }

  /**
   * Atualiza o estoque do produto na base.
   */
  updateProductStock(productId, newStock) {
    const product = this.findProductById(productId);

    if (!product) {
      return null;
    }

    product.stock = newStock;
    return product;
  }
}
