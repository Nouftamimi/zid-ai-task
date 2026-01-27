import { ProductRepository } from '../domain/repositories/ProductRepository';
import mock from './mock/product.mock.json';
import { simulateLowStock } from '../../../notifications/pushSimulator';

export const productRepositoryImpl: ProductRepository = {
  async getProducts() {
    return mock.products;
  },
    async markProductStock(productId: string) {
    const product = mock.products.find(p => p.id === productId);
    if (product) {
      product.stock = 0;
    }

    // simulate push
    simulateLowStock(productId);
  },
};
