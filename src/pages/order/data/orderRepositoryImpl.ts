import { OrderRepository } from '../domain/repositories/OrderRepository';
import mock from './mock/order.mock.json';
import { simulateOrderUpdate } from '../../../notifications/pushSimulator';

export const orderRepositoryImpl: OrderRepository = {
  async getOrders() {
    return mock.orders;
  },

  async markOrderShipped(orderId: string) {
    const order = mock.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'shipped';
    }

    // simulate push
    simulateOrderUpdate(orderId);
  },
};
