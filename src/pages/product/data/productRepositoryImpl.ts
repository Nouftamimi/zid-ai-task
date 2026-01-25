import { ProductRepository } from '../domain/repositories/ProductRepository';
import mock from './mock/product.mock.json';

export const productRepositoryImpl: ProductRepository = {
  async getProducts() {
    return mock.products;
  },
};
