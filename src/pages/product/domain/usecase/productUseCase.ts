import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export const productUseCase =
  (repo: ProductRepository): {
    getProducts: () => Promise<Product[]>;
    markProductsShipped: (orderId: string) => Promise<void>;
  } => {
    return {
      getProducts: async () => await repo.getProducts(),
      markProductsShipped: async (orderId: string) =>
        await repo.markProductStock(orderId),
    };
  };
