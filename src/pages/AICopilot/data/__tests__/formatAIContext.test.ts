import { formatAIContext } from '../formatAIContext';

describe('formatAIContext', () => {
  it('formats store snapshot correctly', () => {
    const orders = [
      { id: 'ORD-1', customer: 'Ahmed', total: 100, statusId: 1 },
    ];
    const products = [
      { name: 'iPhone', stock: 5, sold: 50 },
    ];

    const context = formatAIContext(orders, products);

    expect(context).toContain('ORD-1');
    expect(context).toContain('Ahmed');
    expect(context).toContain('iPhone');
  });
});
