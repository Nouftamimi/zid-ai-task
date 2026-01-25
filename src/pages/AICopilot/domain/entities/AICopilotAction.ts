export type AICopilotAction =
  | {
      action: 'MARK_ORDER_SHIPPED';
      orderId: string;
    };
