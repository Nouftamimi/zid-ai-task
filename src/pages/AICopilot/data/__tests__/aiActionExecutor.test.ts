import { executeAIAction } from '../aiActionExecutor';
import ordersData from '@/src/pages/order/data/mock/order.mock.json';

describe('executeAIAction', () => {
  it('marks order as shipped', async () => {
    const result = await executeAIAction({
      action: 'MARK_ORDER_SHIPPED',
      orderId: 'ORD-1002',
    });

    const order = ordersData.orders.find(o => o.id === 'ORD-1002');

    expect(order?.status).toBe('Delivered');
    expect(order?.statusId).toBe(1);
    expect(result).toContain('ORD-1002');
    expect(result).toContain('shipped');
  });

  it('returns error if order not found', async () => {
    const result = await executeAIAction({
      action: 'MARK_ORDER_SHIPPED',
      orderId: 'ORD-9999',
    });

    expect(result).toContain('not found');
  });
});
