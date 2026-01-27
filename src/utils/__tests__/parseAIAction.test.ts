import { parseAIAction } from '../parseAIAction';

describe('parseAIAction', () => {
  it('returns action object when valid JSON', () => {
    const content = JSON.stringify({
      action: 'MARK_ORDER_SHIPPED',
      orderId: 'ORD-1002',
    });

    const result = parseAIAction(content);

    expect(result).toEqual({
      action: 'MARK_ORDER_SHIPPED',
      orderId: 'ORD-1002',
    });
  });

  it('returns null for non-JSON text', () => {
    const content = 'Order has been shipped successfully';

    const result = parseAIAction(content);

    expect(result).toBeNull();
  });

  it('returns null for malformed JSON', () => {
    const content = '{ action: MARK_ORDER_SHIPPED }';

    const result = parseAIAction(content);

    expect(result).toBeNull();
  });
});
