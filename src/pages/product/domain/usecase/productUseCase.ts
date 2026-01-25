import { ProductRepository } from '../repositories/ProductRepository';

export const getProducts =
  (repo: ProductRepository) =>
  async () => {
    return await repo.getProducts();
  };
