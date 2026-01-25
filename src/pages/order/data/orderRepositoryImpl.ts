import { OrderRepository } from '../domain/repositories/OrderRepository';
import mock from './mock/order.mock.json';

export const orderRepositoryImpl: OrderRepository = {
  async getOrders() {
    return mock.orders;
  },
};
