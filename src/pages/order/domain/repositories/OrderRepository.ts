import { Order } from '../entities/Order';

export interface OrderRepository {
  getOrders(): Promise<Order[]>;
  markOrderShipped(orderId: string): Promise<void>;
}
export const markOrderShipped =
  (repo: OrderRepository) =>
  async (orderId: string) => {
    await repo.markOrderShipped(orderId);
  };