/**
 * Repositório de produto.
 */
export class ProductRepository {
  constructor(catalogDatabase) {
    this.catalogDatabase = catalogDatabase;
  }

  /**
   * Busca um produto pelo ID.
   */
  findById(productId) {
    return this.catalogDatabase.findProductById(productId);
  }

  /**
   * Atualiza o estoque do produto a partir da quantidade comprada.
   */
  decrementStock(productId, quantity) {
    const product = this.findById(productId);

    if (!product) {
      return null;
    }

    return this.catalogDatabase.updateProductStock(productId, product.stock - quantity);
  }
}
