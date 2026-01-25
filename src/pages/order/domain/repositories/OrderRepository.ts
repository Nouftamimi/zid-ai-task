import { Order } from '../entities/Order';

export interface OrderRepository {
  getOrders(): Promise<Order[]>;
}
