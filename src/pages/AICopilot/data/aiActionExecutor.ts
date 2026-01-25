import ordersData from '@/src/pages/order/data/mock/order.mock.json';
import { AICopilotAction } from '../domain/entities/AICopilotAction';

export const executeAIAction = async (action: AICopilotAction) => {
  switch (action.action) {
    case 'MARK_ORDER_SHIPPED': {
      const order = ordersData.orders.find(
        o => o.id === action.orderId
      );

      if (!order) {
        return `❌ Order ${action.orderId} not found.`;
      }

      order.status = 'Delivered';
      order.statusId = 1;

      return `✅ Order ${order.id} has been marked as shipped.`;
    }

    default:
      return '❌ Unsupported action.';
  }
};
