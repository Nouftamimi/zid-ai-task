import { OrderRepository } from '../repositories/OrderRepository';

export const getOrders =
  (repo: OrderRepository) =>
  async () => {
    return await repo.getOrders();
  };
