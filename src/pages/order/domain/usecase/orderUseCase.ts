import { OrderRepository } from '../repositories/OrderRepository';
import { Order } from '../entities/Order';

export const orderUseCase =
  (repo: OrderRepository): {
    getOrders: () => Promise<Order[]>;
    markOrderShipped: (orderId: string) => Promise<void>;
  } => {
    return {
      getOrders: async () => await repo.getOrders(),
      markOrderShipped: async (orderId: string) =>
        await repo.markOrderShipped(orderId),
    };
  };
